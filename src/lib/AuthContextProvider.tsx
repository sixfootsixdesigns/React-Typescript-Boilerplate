import React from 'react';
import { AuthContext, AuthContextInterface } from './AuthContext';
import { Auth } from './auth';
import { withRouter, RouteComponentProps } from 'react-router';

const AuthClient = new Auth();

class AuthContextProvider extends React.Component<RouteComponentProps<any>> {
  public state: AuthContextInterface = {
    checkingSession: true,
    profile: null,
    token: null,
    idToken: null,
    isAuthenticated: false,
    handleAuthentication: this.handleAuthentication.bind(this),
    silentAuth: this.handleSilentAuth.bind(this),
    login: this.handleLogin.bind(this),
    logout: this.handleLogout.bind(this)
  };

  public componentDidMount() {
    if (this.props.location.pathname === '/callback') {
      this.setState({
        checkingSession: false
      });
    }
    this.handleSilentAuth();
  }

  public async handleAuthentication() {
    try {
      await AuthClient.handleAuthentication();
      this.setLoggedInState();
    } catch (err) {
      console.log('handle auth error', err);
    }
  }

  public async handleSilentAuth() {
    AuthClient.silentAuth()
      .then(() => {
        this.setState({
          checkingSession: false
        });
        this.setLoggedInState();
      })
      .catch(err => {
        this.setState({
          checkingSession: false
        });
        if (err.error !== 'login_required') {
          console.log('silent auth error', err.error);
        }
      });
  }

  public handleLogin() {
    AuthClient.login();
  }

  public handleLogout() {
    this.setLoggedOutState();
    AuthClient.logout();
  }

  public render() {
    return (
      <AuthContext.Provider value={this.state}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }

  private setLoggedInState() {
    this.setState({
      token: AuthClient.getAccessToken(),
      profile: AuthClient.getProfile(),
      idToken: AuthClient.getIdToken(),
      isAuthenticated: AuthClient.isAuthenticated()
    });
  }

  private setLoggedOutState() {
    this.setState({
      token: null,
      profile: null,
      idToken: null,
      isAuthenticated: false
    });
  }
}

export const AppContextProviderWithRoutes = withRouter(AuthContextProvider);
