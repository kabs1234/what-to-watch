import { render, screen } from '@testing-library/react';
import SpinnerDotted from './spinner-dotted';

describe('Component: SpinnerDotted', () => {
  it('should render correctly', () => {
    render(<SpinnerDotted />);

    const spinnerElement = screen.getByRole('status');

    expect(spinnerElement).toBeInTheDocument();
  });
});
