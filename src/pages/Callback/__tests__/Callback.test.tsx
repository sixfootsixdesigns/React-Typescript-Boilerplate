import React from 'react';
import Callback from '../Callback';
import { render, cleanup } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import { authContextDefaults, AuthContext } from '../../../lib/AuthContext';

afterEach(cleanup);

const auth = authContextDefaults;
const TestComponent = (props: any) => {
  return (
    <AuthContext.Provider value={props.auth}>
      <MemoryRouter>
        <Callback />
      </MemoryRouter>
    </AuthContext.Provider>
  );
};

describe('Callback Page', () => {
  it('Renders spinner and calls handleAuthentication', () => {
    let called = false;
    auth.handleAuthentication = () => {
      called = true;
      return Promise.resolve();
    };
    const { container } = render(<TestComponent auth={auth} />);
    expect(called).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Renders error', () => {
    let called = false;
    auth.handleAuthentication = () => {
      called = true;
      throw new Error('error');
    };
    const { container } = render(<TestComponent auth={auth} />);
    expect(called).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });
});
