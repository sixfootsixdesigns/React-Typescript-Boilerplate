import React from 'react';
import Home from '../Home';
import { render, cleanup } from 'react-testing-library';

afterEach(cleanup);

describe('Home', () => {
  it('Renders Home page', () => {
    const { container } = render(<Home />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
