import React from 'react';
import { Callback } from '../Callback';
import { render, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { authContextDefaults, AuthContext } from '../../../lib/AuthContext';
import { Spinner } from '../../../components/Spinner/Spinner';

afterEach(cleanup);

const auth = authContextDefaults;
const TestComponent = (props: any) => {
  return (
    <AuthContext.Provider value={props.auth}>
      <MemoryRouter initialEntries={props.path}>
        <Callback loader={<Spinner />} />
      </MemoryRouter>
    </AuthContext.Provider>
  );
};

describe('Callback Page', () => {
  it('Renders calls handleAuthentication', () => {
    let called = false;
    auth.handleAuthentication = () => {
      called = true;
      return Promise.resolve();
    };
    const { container } = render(
      <TestComponent path={['/#access_token']} auth={auth} />
    );
    expect(called).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Renders does not call handleAuthentication', () => {
    let called = false;
    auth.handleAuthentication = () => {
      called = true;
      return Promise.resolve();
    };
    const { container } = render(
      <TestComponent path={['/#food']} auth={auth} />
    );
    expect(called).toBeFalsy();
    expect(container.firstChild).toMatchSnapshot();
  });
});
