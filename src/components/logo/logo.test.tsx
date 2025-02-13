import { render, screen } from '@testing-library/react';
import { HistoryRouter } from '../history-route/history-route';
import Logo from './logo';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();

describe('Component: Logo', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Logo />
      </HistoryRouter>
    );

    const logoLink = screen.getByRole('link', { name: /W T W/i });

    expect(logoLink).toBeInTheDocument();
  });

  it('should navigate to the home page when the logo link is clicked', async () => {
    render(
      <HistoryRouter history={history}>
        <Logo />
      </HistoryRouter>
    );

    const logoLink = screen.getByRole('link', { name: /W T W/i });

    await userEvent.click(logoLink);

    expect(history.location.pathname).toBe('/');
  });
});
