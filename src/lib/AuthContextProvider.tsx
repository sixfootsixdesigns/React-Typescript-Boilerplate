import React from 'react';
import { AuthContext, AuthContextInterface } from './AuthContext';
import { withRouter, RouteComponentProps } from 'react-router';
import auth0 from 'auth0-js';
class AuthContextProvider extends React.Component<RouteComponentProps> {
  private auth0: auth0.WebAuth;

  public state: AuthContextInterface = {
    token: null,
    idToken: null,
    expiresAt: 0,
    checkingSession: true,
    isAuthenticated: false,
    handleAuthentication: this.handleAuthentication.bind(this),
    handleLogin: this.handleLogin.bind(this),
    handleLogout: this.handleLogout.bind(this)
  };

  constructor(props: RouteComponentProps) {
    super(props);
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH_DOMAIN || '',
      clientID: process.env.REACT_APP_AUTH_CLIENT_ID || '',
      redirectUri: process.env.REACT_APP_AUTH_CALLBACK,
      responseType: 'token id_token',
      scope: 'openid'
    });
  }

  public handleLogin() {
    this.auth0.authorize();
  }

  public handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        console.log('handle auth err', err);
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

  public setSession(authResult: auth0.Auth0DecodedHash) {
    console.log(this.props.history);
    localStorage.setItem('isLoggedIn', 'true');
    const expiresAt = authResult.expiresIn
      ? authResult.expiresIn * 1000 + new Date().getTime()
      : 0;
    this.setState({
      token: authResult.accessToken || null,
      idToken: authResult.idToken || null,
      expiresAt,
      isAuthenticated: true,
      checkingSession: false
    });
  }

  public renewSession() {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        console.log(err);
      }
      this.setState({
        checkingSession: false
      });
    });
  }

  public handleLogout() {
    this.setState({
      token: null,
      idToken: null,
      expiresAt: 0,
      isAuthenticated: false
    });

    localStorage.removeItem('isLoggedIn');

    this.auth0.logout({
      returnTo: window.location.origin
    });

    this.props.history.push('/');
  }

  public isAuthenticated() {
    const expiresAt = this.state.expiresAt || 0;
    return new Date().getTime() < expiresAt;
  }

  public componentDidMount() {
    console.log('mount');
    this.renewSession();
  }

  public render() {
    return (
      <AuthContext.Provider value={this.state}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export const AppContextProviderWithRoutes = withRouter(AuthContextProvider);
