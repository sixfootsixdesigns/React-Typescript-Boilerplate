import React from 'react';
import { SecuredRoute } from '../SecuredRoute';
import { render, cleanup } from '@testing-library/react';
import { AuthContext, authContextDefaults } from '../../../context/AuthContext';
import { MemoryRouter } from 'react-router-dom';

afterEach(cleanup);

const Page = () => {
  return <div>My Page</div>;
};

const auth = authContextDefaults;

const TestComponent = (props: any) => {
  return (
    <AuthContext.Provider value={props.auth}>
      <MemoryRouter initialEntries={['/foo']} initialIndex={0}>
        <SecuredRoute path="/foo" component={Page} />
      </MemoryRouter>
    </AuthContext.Provider>
  );
};

describe('SecuredRoute', () => {
  it('Renders Spinner if checking session', () => {
    auth.checkingSession = true;
    const { container } = render(<TestComponent auth={auth} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Renders page if authed', () => {
    auth.checkingSession = false;
    auth.isAuthenticated = true;
    const { container } = render(<TestComponent auth={auth} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Calls login if not authed and not checking', () => {
    let called = false;
    auth.checkingSession = false;
    auth.isAuthenticated = false;
    auth.login = () => {
      called = true;
      return null;
    };
    render(<TestComponent auth={auth} />);
    expect(called).toEqual(true);
  });
});
