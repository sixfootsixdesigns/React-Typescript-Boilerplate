import React from 'react';

export interface AuthContextInterface {
  checkingSession: boolean;
  token: string | null;
  idToken: string | null;
  expiresAt: number | null;
  isAuthenticated: boolean;
  handleAuthentication: () => void;
  handleLogin: () => void;
  handleLogout: () => void;
}

export const authContextDefaults: AuthContextInterface = {
  checkingSession: false,
  expiresAt: null,
  token: null,
  idToken: null,
  isAuthenticated: false,
  handleAuthentication: () => null,
  handleLogin: () => null,
  handleLogout: () => null
};

export const AuthContext = React.createContext<AuthContextInterface>(
  authContextDefaults
);
