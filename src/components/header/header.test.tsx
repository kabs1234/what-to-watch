import { render, screen } from '@testing-library/react';
import Header from './header';

jest.mock('../logo/logo', () => {
  const mockComponent = (): JSX.Element => <div>Mock Logo</div>;

  return mockComponent;
});

jest.mock('../user-block/user-block', () => {
  const mockComponent = (): JSX.Element => <div>Mock UserBlock</div>;

  return mockComponent;
});

describe('Component: Header', () => {
  it('should render correctly', () => {
    render(<Header />);

    expect(screen.getByText('Mock Logo')).toBeInTheDocument();
    expect(screen.getByText('Mock UserBlock')).toBeInTheDocument();
  });
});
