import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { AuthContext, AuthContextInterface } from '../../lib/AuthContext';
import Spinner from '../../components/Spinner/Spinner';

interface LogoutProps extends RouteComponentProps<any> {
  auth: AuthContextInterface;
}

class Logout extends React.Component<LogoutProps> {
  public componentDidMount() {
    const { history, auth } = this.props;
    auth.logout();
    history.replace('/');
  }

  public render() {
    return <Spinner className="logoutPage" text="Logging out" />;
  }
}

const LogoutWithRouter = withRouter(Logout);

const LogoutWithContextAndRouter = () => {
  return (
    <AuthContext.Consumer>
      {authContext => <LogoutWithRouter auth={authContext} />}
    </AuthContext.Consumer>
  );
};

export default LogoutWithContextAndRouter;
