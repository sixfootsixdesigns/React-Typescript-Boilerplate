import React from 'react';
import { Nav } from '../Nav';
import { render, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext, authContextDefaults } from '../../../lib/AuthContext';

afterEach(cleanup);

const auth = authContextDefaults;
const TestComponent = (props: any) => {
  return (
    <AuthContext.Provider value={props.auth}>
      <MemoryRouter initialEntries={['/foo']} initialIndex={0}>
        <Nav />
      </MemoryRouter>
    </AuthContext.Provider>
  );
};

describe('Nav', () => {
  it('Renders Nav', () => {
    const { container } = render(<TestComponent auth={auth} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Logged In State', () => {
    auth.isAuthenticated = true;
    auth.profile = {
      name: 'Bob'
    };
    const { container } = render(<TestComponent auth={auth} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Logged out State', () => {
    auth.isAuthenticated = false;
    const { container } = render(<TestComponent auth={auth} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
