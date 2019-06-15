import React from 'react';
import { Spinner } from '../../components/Spinner/Spinner';
import { AuthContext } from '../../context/AuthContext';

export class Login extends React.Component {
  public static contextType = AuthContext;
  public context!: React.ContextType<typeof AuthContext>;

  public componentDidMount() {
    this.context.handleLogin();
  }

  public render() {
    return <Spinner className="loginPage" text="Logging in" />;
  }
}
