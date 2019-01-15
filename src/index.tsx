import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from './lib/AuthContext';
import AuthClient from './lib/auth';

const providerValue = {
  checkingSession: true,
  getAccessToken: AuthClient.getAccessToken,
  getIdToken: AuthClient.getIdToken,
  getProfile: AuthClient.getProfile,
  isAuthenticated: AuthClient.isAuthenticated,
  handleAuthentication: AuthClient.handleAuthentication,
  silentAuth: AuthClient.silentAuth,
  login: AuthClient.login,
  logout: AuthClient.logout
};

render(
  <BrowserRouter>
    <AuthContext.Provider value={providerValue}>
      <App />
    </AuthContext.Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
