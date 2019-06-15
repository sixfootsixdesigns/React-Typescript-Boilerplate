import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { AuthContext } from '../../context/AuthContext';

interface CallbackProps extends RouteComponentProps {
  loader: any;
}

class CallBackComponent extends React.Component<CallbackProps> {
  public static contextType = AuthContext;
  public context!: React.ContextType<typeof AuthContext>;

  public async componentDidMount() {
    if (/access_token|id_token|error/.test(this.props.location.hash)) {
      this.context.handleAuthentication();
    }
  }

  public render() {
    const { loader } = this.props;
    return <div className="auth-callback-page">{loader}</div>;
  }
}

export const Callback = withRouter(CallBackComponent);
