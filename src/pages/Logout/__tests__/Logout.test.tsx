import React from 'react';
import { Logout } from '../Logout';
import { render, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext, authContextDefaults } from '../../../context/AuthContext';

afterEach(cleanup);

const auth = authContextDefaults;
const TestComponent = (props: any) => {
  return (
    <AuthContext.Provider value={props.auth}>
      <MemoryRouter initialEntries={['/foo']} initialIndex={0}>
        <Logout />
      </MemoryRouter>
    </AuthContext.Provider>
  );
};

describe('Logout Page', () => {
  it('Renders spinner and calls logout', () => {
    let called = false;
    auth.handleLogout = () => {
      called = true;
      return null;
    };
    const { container } = render(<TestComponent auth={auth} />);
    expect(called).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });
});
