import React from 'react';
import { Route } from 'react-router';
import Spinner from '../Spinner/Spinner';
import { AuthProps, withAuth } from '../../lib/with-auth';

interface SecuredRouteProps extends AuthProps {
  path: string;
  component: any;
  exact?: boolean;
}

const SecuredRoute = (props: SecuredRouteProps) => {
  const { exact, auth, component: ComponentNode, path } = props;
  return (
    <Route
      exact={exact || false}
      path={path}
      render={() => {
        if (auth.checkingSession) {
          return <Spinner text="Checking Session" />;
        }
        if (!auth.isAuthenticated()) {
          auth.login();
          return null;
        }
        return <ComponentNode />;
      }}
    />
  );
};

export default withAuth(SecuredRoute);
