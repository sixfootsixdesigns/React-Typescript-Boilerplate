import React from 'react';
import Logout from '../Logout';
import { render, cleanup } from 'react-testing-library';
import { BrowserRouter } from 'react-router-dom';

afterEach(cleanup);

describe('Logout Page', () => {
  it('Renders Logout page', () => {
    const { container } = render(
      <BrowserRouter>
        <Logout />
      </BrowserRouter>
    );
    const page = container.querySelector('.logoutPage');
    expect(page).not.toEqual(null);
  });
});
