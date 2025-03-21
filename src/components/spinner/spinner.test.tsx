import { render, screen } from '@testing-library/react';
import Spinner from './spinner';

describe('Component: Spinner', () => {
  it('should render correctly', () => {
    render(<Spinner />);

    const loader = screen.getByRole('status');
    expect(loader).toBeInTheDocument();
  });
});
