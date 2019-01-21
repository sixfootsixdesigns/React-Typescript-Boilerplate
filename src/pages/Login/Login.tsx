import React from 'react';
import Spinner from '../../components/Spinner/Spinner';
import { withAuth, AuthProps } from '../../lib/with-auth';

class Login extends React.Component<AuthProps> {
  public componentDidMount() {
    const { auth } = this.props;
    auth.login();
  }

  public render() {
    return <Spinner className="loginPage" text="Logging in" />;
  }
}

export default withAuth(Login);
