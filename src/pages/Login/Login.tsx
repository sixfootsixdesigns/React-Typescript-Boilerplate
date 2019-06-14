import React from 'react';
import Spinner from '../../components/Spinner/Spinner';
import { AuthContext } from '../../lib/AuthContext';

class Login extends React.Component {
  public static contextType = AuthContext;
  public context!: React.ContextType<typeof AuthContext>;

  public componentDidMount() {
    this.context.login();
  }

  public render() {
    return <Spinner className="loginPage" text="Logging in" />;
  }
}

export default Login;
