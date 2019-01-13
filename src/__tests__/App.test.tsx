import React from 'react';
import App from '../App';
import { render, cleanup } from 'react-testing-library';
import { BrowserRouter } from 'react-router-dom';

afterEach(cleanup);

jest.mock('auth0-js');

describe('App', () => {
  it('Renders App', () => {
    const { container } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const page = container.querySelector('.home');
    expect(page).not.toEqual(null);
  });
});
