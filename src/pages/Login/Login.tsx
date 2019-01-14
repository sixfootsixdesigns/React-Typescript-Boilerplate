import React from 'react';
import { AuthContext } from '../../lib/AuthContext';
import Spinner from '../../components/Spinner/Spinner';

class Login extends React.Component {
  public static contextType = AuthContext;

  public componentDidMount() {
    this.context.login();
  }

  public render() {
    return <Spinner className="loginPage" text="Logging in" />;
  }
}

export default Login;
