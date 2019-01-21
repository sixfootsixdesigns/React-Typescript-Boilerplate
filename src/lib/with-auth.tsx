import React from 'react';
import { AuthContext, AuthContextInterface } from './AuthContext';

export interface AuthProps {
  auth: AuthContextInterface;
}

export function withAuth<P extends AuthProps>(Component: React.ComponentType<P>) {
  return function AuthedComponent(props: Pick<P, Exclude<keyof P, keyof AuthProps>>) {
    return (
      <AuthContext.Consumer>
        {auth => <Component {...props as P} auth={auth} />}
      </AuthContext.Consumer>
    );
  };
}
