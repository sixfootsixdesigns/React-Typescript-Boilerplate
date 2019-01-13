import React from 'react';
import Callback from '../Callback';
import { render, cleanup } from 'react-testing-library';
import { BrowserRouter } from 'react-router-dom';

afterEach(cleanup);

jest.mock('auth0-js');

describe('Callback Page', () => {
  it('Renders Callback page', () => {
    const { container } = render(
      <BrowserRouter>
        <Callback />
      </BrowserRouter>
    );
    const page = container.querySelector('.callbackPage');
    expect(page).not.toEqual(null);
  });
});
