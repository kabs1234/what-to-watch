import { render, screen } from '@testing-library/react';
import NotFound from './not-found';
import { createMemoryHistory } from 'history';
import { HistoryRouter } from '../../components/history-route/history-route';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();

describe('Component: Spinner', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <NotFound />
      </HistoryRouter>
    );

    expect(screen.getByText('404 Page Not Found')).toBeInTheDocument();
    expect(screen.getByText('Go to main page')).toBeInTheDocument();
  });

  it('should navigate to the home page when the logo link is clicked', async () => {
    history.push('/error');

    render(
      <HistoryRouter history={history}>
        <NotFound />
      </HistoryRouter>
    );

    const homePageLink = screen.getByText('Go to main page');

    await userEvent.click(homePageLink);

    expect(history.location.pathname).toBe('/');
  });
});
