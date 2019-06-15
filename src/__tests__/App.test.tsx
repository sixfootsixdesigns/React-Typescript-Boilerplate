import React from 'react';
import App from '../App';
import { render, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { authContextDefaults, AuthContext } from '../context/AuthContext';

afterEach(cleanup);

describe('App', () => {
  const auth = authContextDefaults;
  const TestComponent = (props: any) => {
    return (
      <AuthContext.Provider value={props.auth}>
        <MemoryRouter
          initialEntries={props.paths}
          initialIndex={props.index || 0}
        >
          <App />
        </MemoryRouter>
      </AuthContext.Provider>
    );
  };

  it('Renders App home', () => {
    const { container } = render(
      <TestComponent auth={auth} paths={['/']} index={0} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Renders Admin', () => {
    auth.isAuthenticated = true;
    const { container } = render(
      <TestComponent auth={auth} paths={['/admin']} index={0} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Renders login', () => {
    const { container } = render(
      <TestComponent auth={auth} paths={['/login']} index={0} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Renders logout', () => {
    const { container } = render(
      <TestComponent auth={auth} paths={['/logout']} index={0} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Renders callback', () => {
    const { container } = render(
      <TestComponent auth={auth} paths={['/callback']} index={0} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
