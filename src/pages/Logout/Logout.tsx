import React from 'react';
import { Spinner } from '../../components/Spinner/Spinner';
import { AuthContext } from '../../context/AuthContext';

export class Logout extends React.Component {
  public static contextType = AuthContext;
  public context!: React.ContextType<typeof AuthContext>;

  public componentDidMount() {
    this.context.logout();
  }

  public render() {
    return <Spinner className="logoutPage" text="Logging out" />;
  }
}
