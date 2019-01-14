import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { AuthContext, AuthContextInterface } from '../../lib/AuthContext';
import Spinner from '../../components/Spinner/Spinner';

interface CallbackState {
  error: string | null;
}

interface CallbackProps extends RouteComponentProps<any> {
  auth: AuthContextInterface;
}

class Callback extends React.Component<CallbackProps, CallbackState> {
  public static contextType = AuthContext;

  public state = {
    error: null
  };

  public componentDidMount() {
    const { auth } = this.props;
    try {
      auth.handleAuthentication().then(() => {
        this.props.history.replace('/');
      });
    } catch (ex) {
      this.setState({
        error: ex.errorDescription || ex.message
      });
    }
  }

  public render() {
    return (
      <div className="callbackPage">
        {this.state.error ? (
          <div className="error">{this.state.error}</div>
        ) : (
          <Spinner text="Loading Your Profile" />
        )}
      </div>
    );
  }
}

const CallbackWithRouter = withRouter(Callback);

const CallbackWithContextAndRouter = () => {
  return (
    <AuthContext.Consumer>
      {authContext => <CallbackWithRouter auth={authContext} />}
    </AuthContext.Consumer>
  );
};

export default CallbackWithContextAndRouter;
