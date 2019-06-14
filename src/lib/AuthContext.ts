import React from 'react';
import { AuthProfile } from './auth';

export interface AuthContextInterface {
  checkingSession: boolean;
  profile: AuthProfile | null;
  token: string | null;
  idToken: string | null;
  isAuthenticated: boolean;
  handleAuthentication: () => Promise<void>;
  silentAuth: () => Promise<void>;
  login: () => void;
  logout: () => void;
}

export const authContextDefaults: AuthContextInterface = {
  checkingSession: false,
  profile: null,
  token: null,
  idToken: null,
  isAuthenticated: false,
  handleAuthentication: () => Promise.resolve(),
  silentAuth: () => Promise.resolve(),
  login: () => {},
  logout: () => {}
};

export const AuthContext = React.createContext<AuthContextInterface>(
  authContextDefaults
);
