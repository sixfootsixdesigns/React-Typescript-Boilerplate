import React from 'react';

export interface AuthProfile {
  at_hash?: string;
  aud?: string;
  exp?: number;
  iat?: number;
  iss?: string;
  nonce?: string;
  sub?: string;
  locale?: string;
  name?: string;
  picture?: string;
  email?: string;
}

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
