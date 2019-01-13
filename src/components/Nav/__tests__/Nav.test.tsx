import React from 'react';
import Nav from '../Nav';
import { render, cleanup } from 'react-testing-library';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext, authContextDefaults } from '../../../lib/AuthContext';

afterEach(cleanup);

describe('Nav', () => {
  it('Renders Nav', () => {
    const { container } = render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    );
    const page = container.querySelector('.Navbar');
    expect(page).not.toEqual(null);
  });

  it('Logged In State', () => {
    const auth = authContextDefaults;
    auth.isAuthenticated = () => true;
    auth.getProfile = () => {
      return {
        name: 'Bob'
      };
    };

    const { container } = render(
      <BrowserRouter>
        <AuthContext.Provider value={auth}>
          <Nav />
        </AuthContext.Provider>
      </BrowserRouter>
    );
    const user = container.querySelector('#loggedInUser');
    const link = container.querySelector('#logout-link');
    expect(link).not.toEqual(null);
    expect(user!.innerHTML).toEqual('Logged in as: Bob');
  });

  it('Logged out State', () => {
    const auth = authContextDefaults;
    auth.isAuthenticated = () => false;

    const { container } = render(
      <BrowserRouter>
        <AuthContext.Provider value={auth}>
          <Nav />
        </AuthContext.Provider>
      </BrowserRouter>
    );
    const user = container.querySelector('#loggedInUser');
    const link = container.querySelector('#login-link');
    expect(link).not.toEqual(null);
    expect(user).toEqual(null);
  });
});
