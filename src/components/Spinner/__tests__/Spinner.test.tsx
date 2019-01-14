import React from 'react';
import Spinner from '../Spinner';
import { render, cleanup } from 'react-testing-library';

afterEach(cleanup);

describe('Spinner', () => {
  it('Renders Spinner', () => {
    const { container } = render(<Spinner />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Renders Spinner without overlay', () => {
    const { container } = render(<Spinner noOverlay={true} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Renders Spinner with text', () => {
    const { container } = render(<Spinner text="Foo" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
