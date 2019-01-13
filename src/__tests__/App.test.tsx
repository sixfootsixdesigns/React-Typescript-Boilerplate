import React from 'react';
import App from '../App';
import { render, cleanup } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';

afterEach(cleanup);

jest.mock('auth0-js');

describe('App', () => {
  it('Renders App', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
        <App />
      </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
