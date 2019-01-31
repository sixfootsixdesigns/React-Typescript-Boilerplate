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
import { withAuth, AuthProps } from './lib/with-auth';

interface AppProps extends AuthProps, RouteComponentProps<any> {}

class App extends React.Component<AppProps> {
  public componentDidMount() {
    const { auth } = this.props;

    if (this.props.location.pathname === '/callback') {
      auth.checkingSession = false;
      this.forceUpdate();
      return;
    }

    // check to see if user is already authed
    auth
      .silentAuth()
      .then(() => {
        auth.checkingSession = false;
        this.forceUpdate();
      })
      .catch(err => {
        auth.checkingSession = false;
        this.forceUpdate();
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

export default withAuth(withRouter(App));
