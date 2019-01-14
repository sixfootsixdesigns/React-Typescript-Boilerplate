import React from 'react';
import {
  Route,
  RouteComponentProps,
  withRouter,
  Switch,
  Redirect
} from 'react-router-dom';
import Callback from './pages/Callback/Callback';
import Admin from './pages/Admin/Admin';
import Login from './pages/Login/Login';
import Logout from './pages/Logout/Logout';
import SecuredRoute from './components/SecuredRoute/SecuredRoute';
import AuthClient from './lib/auth';
import Nav from './components/Nav/Nav';
import { AuthContext, AuthContextInterface } from './lib/AuthContext';
import './app.scss';
import Home from './pages/Home/Home';

interface AppProps extends RouteComponentProps<any> {}

class App extends React.Component<AppProps, AuthContextInterface> {
  public state = {
    checkingSession: true,
    getAccessToken: AuthClient.getAccessToken,
    getIdToken: AuthClient.getIdToken,
    getProfile: AuthClient.getProfile,
    isAuthenticated: AuthClient.isAuthenticated,
    handleAuthentication: AuthClient.handleAuthentication,
    silentAuth: AuthClient.silentAuth,
    login: AuthClient.login,
    logout: AuthClient.logout
  };

  public async componentDidMount() {
    if (this.props.location.pathname === '/callback') {
      this.setState({ checkingSession: false });
      return;
    }

    // check to see if user is already authed
    this.state
      .silentAuth()
      .then(() => {
        this.setState({ checkingSession: false });
      })
      .catch(err => {
        this.setState({ checkingSession: false });
        if (err.error !== 'login_required') {
          console.log(err.error);
        }
      });
  }

  public render() {
    return (
      <AuthContext.Provider value={this.state}>
        <Nav />
        <Switch>
          <Route exact={true} path="/login" component={Login} />
          <Route exact={true} path="/logout" component={Logout} />
          <Route exact={true} path="/callback" component={Callback} />
          <SecuredRoute exact={true} path="/admin" component={Admin} />
          <Route exact={true} path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      </AuthContext.Provider>
    );
  }
}

export default withRouter(App);
