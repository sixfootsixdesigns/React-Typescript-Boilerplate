import React from 'react';
import { AuthContext, AuthContextInterface } from './AuthContext';
import { withRouter, RouteComponentProps } from 'react-router';
import auth0 from 'auth0-js';

export interface AuthContextProviderConfig {
  responseType?: string;
  scope?: string;
}

export interface AuthContextProviderProps extends RouteComponentProps {
  config?: AuthContextProviderConfig;
  loginCallback?: () => void;
  logoutCallback?: () => void;
  renewSessionCallback?: () => void;
}

class AuthContextProviderComponent extends React.Component<
  AuthContextProviderProps
> {
  private auth0: auth0.WebAuth;
  private tokenRenewalTimeout: NodeJS.Timeout | null = null;

  constructor(props: AuthContextProviderProps) {
    super(props);

    if (!process.env.REACT_APP_AUTH_DOMAIN) {
      throw new Error('missing REACT_APP_AUTH_DOMAIN config');
    }

    if (!process.env.REACT_APP_AUTH_CLIENT_ID) {
      throw new Error('missing REACT_APP_AUTH_CLIENT_ID config');
    }

    if (!process.env.REACT_APP_AUTH_CALLBACK) {
      throw new Error('missing REACT_APP_AUTH_CALLBACK config');
    }

    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH_DOMAIN,
      clientID: process.env.REACT_APP_AUTH_CLIENT_ID,
      redirectUri: process.env.REACT_APP_AUTH_CALLBACK,
      responseType:
        (props.config && props.config.responseType) || 'token id_token',
      scope: (props.config && props.config.scope) || 'openid'
    });
  }

  public state: AuthContextInterface = {
    token: null,
    idToken: null,
    expiresAt: 0,
    checkingSession: false,
    isAuthenticated: false,
    handleAuthentication: this.handleAuthentication.bind(this),
    login: this.login.bind(this),
    logout: this.logout.bind(this)
  };

  public componentDidMount() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.renewSession();
    }
  }

  public login() {
    this.auth0.authorize();
  }

  public handleAuthentication() {
    const { loginCallback } = this.props;
    this.auth0.parseHash(async (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        await this.setSession(authResult);
        if (loginCallback) {
          loginCallback();
        }
      }
      this.props.history.push('/');
    });
  }

  public getToken() {
    return this.state.token;
  }

  public getIdToken() {
    return this.state.idToken;
  }

  public async setSession(authResult: auth0.Auth0DecodedHash): Promise<void> {
    localStorage.setItem('isLoggedIn', 'true');

    const expiresAt = authResult.expiresIn
      ? authResult.expiresIn * 1000 + new Date().getTime()
      : 0;

    await new Promise(resolve => {
      this.setState(
        {
          token: authResult.accessToken || null,
          idToken: authResult.idToken || null,
          expiresAt,
          isAuthenticated: true,
          checkingSession: false
        },
        () => {
          this.scheduleRenewal();
          resolve();
        }
      );
    });
  }

  public renewSession() {
    const { renewSessionCallback } = this.props;

    this.setState({
      checkingSession: true
    });

    this.auth0.checkSession({}, async (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        await this.setSession(authResult);
        if (renewSessionCallback) {
          renewSessionCallback();
        }
      } else if (err) {
        this.logout();
      }
    });
  }

  public logout() {
    const { logoutCallback } = this.props;

    if (this.tokenRenewalTimeout) {
      clearTimeout(this.tokenRenewalTimeout);
    }

    this.setState(
      {
        token: null,
        idToken: null,
        expiresAt: 0,
        isAuthenticated: false,
        checkingSession: false
      },
      () => {
        if (logoutCallback) {
          logoutCallback();
        }
      }
    );

    localStorage.removeItem('isLoggedIn');

    this.auth0.logout({
      returnTo: window.location.origin
    });
  }

  public isAuthenticated() {
    const expiresAt = this.state.expiresAt || 0;
    return new Date().getTime() < expiresAt;
  }

  public scheduleRenewal() {
    const expiresAt = this.state.expiresAt || 0;
    const timeout = expiresAt - Date.now();

    if (timeout > 0) {
      this.tokenRenewalTimeout = setTimeout(() => {
        this.renewSession();
      }, timeout);
    }
  }

  public render() {
    return (
      <AuthContext.Provider value={this.state}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export const AppContextProvider = withRouter(AuthContextProviderComponent);
