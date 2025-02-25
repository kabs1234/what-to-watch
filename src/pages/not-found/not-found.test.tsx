import { render, screen } from '@testing-library/react';
import NotFound from './not-found';
import { createMemoryHistory } from 'history';
import { HistoryRouter } from '../../components/history-route/history-route';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();

describe('Page: NotFound', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <NotFound />
      </HistoryRouter>
    );

    expect(screen.getByText('404 Page Not Found')).toBeInTheDocument();
    expect(screen.getByText('Go to main page')).toBeInTheDocument();
  });

  it('should redirect to / path on link click', async () => {
    history.push('/fake');

    render(
      <HistoryRouter history={history}>
        <NotFound />
      </HistoryRouter>
    );

    const link = screen.getByText('Go to main page');

    await userEvent.click(link);

    expect(history.location.pathname).toBe('/');
  });
});
