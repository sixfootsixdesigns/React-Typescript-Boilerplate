import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { AuthContext } from '../../lib/AuthContext';
import { Spinner } from '../../components/Spinner/Spinner';

interface LogoutProps extends RouteComponentProps<any> {}

class Logout extends React.Component<LogoutProps> {
  public static contextType = AuthContext;
  public componentDidMount() {
    const { history } = this.props;
    this.context.logout();
    history.replace('/');
  }

  public render() {
    return <Spinner className="logoutPage" text="Logging out" />;
  }
}

const LogoutWithRouter = withRouter(Logout);
delete LogoutWithRouter.contextType;

export default LogoutWithRouter;
