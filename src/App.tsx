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
import Nav from './components/Nav/Nav';
import './app.scss';
import Home from './pages/Home/Home';
import { AuthContext, AuthContextInterface } from './lib/AuthContext';

interface AppProps extends RouteComponentProps<any> {
  auth: AuthContextInterface;
}

class App extends React.Component<AppProps> {
  public async componentDidMount() {
    const { auth } = this.props;
    if (this.props.location.pathname === '/callback') {
      this.setState({ checkingSession: false });
      return;
    }

    // check to see if user is already authed
    auth
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
      <div>
        <Nav />
        <Switch>
          <Route exact={true} path="/login" component={Login} />
          <Route exact={true} path="/logout" component={Logout} />
          <Route exact={true} path="/callback" component={Callback} />
          <SecuredRoute exact={true} path="/admin" component={Admin} />
          <Route exact={true} path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

const AppWithRouter = withRouter(App);

const AppWithContextAndRouter = () => {
  return (
    <AuthContext.Consumer>
      {authContext => <AppWithRouter auth={authContext} />}
    </AuthContext.Consumer>
  );
};

export default AppWithContextAndRouter;
