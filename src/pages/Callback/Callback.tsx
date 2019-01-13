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
    this.context
      .handleAuthentication()
      .then(() => {
        this.props.history.replace('/');
      })
      .catch((ex: any) => {
        this.setState({
          error: ex.errorDescription
        });
      });
  }

  public render() {
    return (
      <div className="callbackPage">
        {this.state.error ? (
          this.state.error
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
