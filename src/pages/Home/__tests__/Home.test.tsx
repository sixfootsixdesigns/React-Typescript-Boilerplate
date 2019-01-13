import React from 'react';
import Home from '../Home';
import { render, cleanup } from 'react-testing-library';

afterEach(cleanup);

jest.mock('auth0-js');

describe('Home', () => {
  it('Renders Home page', () => {
    const { container } = render(<Home />);
    const page = container.querySelector('.home');
    expect(page).not.toEqual(null);
  });
});
