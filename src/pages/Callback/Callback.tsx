import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { AuthContext } from '../../lib/AuthContext';
import { Spinner } from '../../components/Spinner/Spinner';

interface CallbackState {
  error: string | null;
}

interface CallbackProps extends RouteComponentProps<any> {}

class Callback extends React.Component<CallbackProps, CallbackState> {
  public static contextType = AuthContext;

  public state = {
    error: null
  };

  public componentDidMount() {
    try {
      this.context.handleAuthentication().then(() => {
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
delete CallbackWithRouter.contextType;

export default CallbackWithRouter;
