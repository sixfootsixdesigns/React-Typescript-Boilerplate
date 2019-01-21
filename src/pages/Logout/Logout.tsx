import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import { withAuth, AuthProps } from '../../lib/with-auth';

interface LogoutProps extends AuthProps, RouteComponentProps<any> {}

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

export default withAuth(withRouter(Logout));
