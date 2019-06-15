import React from 'react';
import { Login } from '../Login';
import { render, cleanup } from '@testing-library/react';
import { AuthContext, authContextDefaults } from '../../../context/AuthContext';

afterEach(cleanup);

const auth = authContextDefaults;

describe('Login Page', () => {
  it('Renders Spinner and calls login', () => {
    let called = false;
    auth.handleLogin = () => {
      called = true;
      return null;
    };
    const { container } = render(
      <AuthContext.Provider value={auth}>
        <Login />
      </AuthContext.Provider>
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(called).toBeTruthy();
  });
});
