import React from 'react';
import { Admin } from '../Admin';
import { render, cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('Admin', () => {
  it('Renders Admin page', () => {
    const { container } = render(<Admin />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
