import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import { AuthContext } from '../../lib/AuthContext';

class Logout extends React.Component<RouteComponentProps<any>> {
  public static contextType = AuthContext;
  public context!: React.ContextType<typeof AuthContext>;

  public componentDidMount() {
    this.context.logout();
    this.props.history.replace('/');
  }

  public render() {
    return <Spinner className="logoutPage" text="Logging out" />;
  }
}

export default withRouter(Logout);
