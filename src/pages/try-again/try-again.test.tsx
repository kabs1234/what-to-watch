import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { HistoryRouter } from '../../components/history-route/history-route';
import userEvent from '@testing-library/user-event';
import TryAgain from './try-again';

const history = createMemoryHistory();

describe('Page: TryAgain', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <TryAgain errorMessage='Error' />
      </HistoryRouter>
    );

    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Try again')).toBeInTheDocument();
    expect(screen.getByText('Go back to previous page')).toBeInTheDocument();
  });

  it('should reload page on button click', async () => {
    history.push('/fake');

    render(
      <HistoryRouter history={history}>
        <TryAgain errorMessage='Error' />
      </HistoryRouter>
    );

    const reloadButton = screen.getByText('Try again');

    await userEvent.click(reloadButton);

    expect(history.location.pathname).toBe('/fake');
  });

  it('should redirect to previous path on link click', async () => {
    history.push('/real');
    history.push('/fake');

    render(
      <HistoryRouter history={history}>
        <TryAgain errorMessage='Error' />
      </HistoryRouter>
    );

    const link = screen.getByText('Go back to previous page');

    await userEvent.click(link);

    expect(history.location.pathname).toBe('/real');
  });
});
