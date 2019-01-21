import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import Spinner from '../../components/Spinner/Spinner';
import { withAuth, AuthProps } from '../../lib/with-auth';

interface CallbackState {
  error: string | null;
}

interface CallbackProps extends AuthProps, RouteComponentProps<any> {}

class Callback extends React.Component<CallbackProps, CallbackState> {
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

export default withAuth(withRouter(Callback));
