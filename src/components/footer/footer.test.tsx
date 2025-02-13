import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { HistoryRouter } from '../history-route/history-route';
import Footer from './footer';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();

describe('Component: footer', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Footer />
      </HistoryRouter>
    );

    expect(screen.getByText('© 2019 What to watch Ltd.')).toBeInTheDocument();
  });

  it('should navigate to the home page when the logo link is clicked', async () => {
    render(
      <HistoryRouter history={history}>
        <Footer />
      </HistoryRouter>
    );

    const logoLink = screen.getByRole('link', { name: /W T W/i });

    await userEvent.click(logoLink);

    expect(history.location.pathname).toBe('/');
  });
});
