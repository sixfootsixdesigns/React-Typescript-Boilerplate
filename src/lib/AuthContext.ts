import React from 'react';
import { AuthProfile } from './auth';

export interface AuthContextInterface {
  checkingSession: boolean;
  getAccessToken: () => string | null;
  getIdToken: () => string | null;
  getProfile: () => AuthProfile | null;
  isAuthenticated: () => boolean;
  handleAuthentication: () => Promise<void>;
  silentAuth: () => Promise<void>;
  login: () => void;
  logout: () => void;
}

export const authContextDefaults: AuthContextInterface = {
  checkingSession: false,
  getAccessToken: () => null,
  getIdToken: () => null,
  getProfile: () => null,
  isAuthenticated: () => false,
  handleAuthentication: () => Promise.resolve(),
  silentAuth: () => Promise.resolve(),
  login: () => {},
  logout: () => {}
};

export const AuthContext = React.createContext<AuthContextInterface>(
  authContextDefaults
);
