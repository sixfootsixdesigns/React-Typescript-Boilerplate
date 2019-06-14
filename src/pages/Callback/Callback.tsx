import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import Spinner from '../../components/Spinner/Spinner';
import { AuthContext } from '../../lib/AuthContext';

interface CallbackState {
  error: string | null;
}

class Callback extends React.Component<RouteComponentProps, CallbackState> {
  public state = {
    error: null
  };
  public static contextType = AuthContext;
  public context!: React.ContextType<typeof AuthContext>;

  public componentDidMount() {
    try {
      this.context.handleAuthentication().then(() => {
        this.props.history.replace('/');
      });
    } catch (ex) {
      this.setState({ error: ex.errorDescription || ex.message });
    }
  }

  public render() {
    const { error } = this.state;
    return (
      <div className="callbackPage">
        {error ? (
          <div className="error">{error}</div>
        ) : (
          <Spinner text="Loading Your Profile" />
        )}
      </div>
    );
  }
}

export default withRouter(Callback);
