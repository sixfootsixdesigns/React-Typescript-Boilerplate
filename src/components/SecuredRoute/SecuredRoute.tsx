import React from 'react';
import { Route } from 'react-router';
import { AuthContext } from '../../lib/AuthContext';
import { Spinner } from '../Spinner/Spinner';

interface SecuredRouteProps {
  path: string;
  component: any;
  exact?: boolean;
}

const SecuredRoute = (props: SecuredRouteProps) => {
  const { exact, component: ComponentNode, path } = props;
  return (
    <AuthContext.Consumer>
      {authContext => (
        <Route
          exact={exact || false}
          path={path}
          render={() => {
            if (authContext.checkingSession) {
              return <Spinner text="Checking Session" />;
            }
            if (!authContext.isAuthenticated()) {
              authContext.login();
              return null;
            }
            return <ComponentNode />;
          }}
        />
      )}
    </AuthContext.Consumer>
  );
};

export default SecuredRoute;
