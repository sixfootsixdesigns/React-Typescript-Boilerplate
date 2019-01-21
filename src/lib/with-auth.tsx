import React from 'react';
import { AuthContext, AuthContextInterface } from './AuthContext';

export interface AuthProps {
  auth: AuthContextInterface;
}

export function withAuth(Component: any) {
  return function WrapperComponent(props: any) {
    return (
      <AuthContext.Consumer>
        {state => <Component {...props} auth={state} />}
      </AuthContext.Consumer>
    );
  };
}
