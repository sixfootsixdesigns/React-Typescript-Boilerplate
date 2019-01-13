import React from 'react';
import Login from '../Login';
import { render, cleanup } from 'react-testing-library';

afterEach(cleanup);

describe('Login Page', () => {
  it('Renders Login page', () => {
    const { container } = render(<Login />);
    const page = container.querySelector('.loginPage');
    expect(page).not.toEqual(null);
  });
});
