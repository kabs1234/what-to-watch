import { screen } from '@testing-library/react';
import MainEmpty from './main-empty';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { renderWithProviders } from '../../utils/test-utils';
import { HistoryRouter } from '../../components/history-route/history-route';

const history = createMemoryHistory();

describe('Component: MainEmpty', () => {
  it('should render correctly', () => {
    renderWithProviders(
      <HistoryRouter history={history}>
        <MainEmpty />
      </HistoryRouter>
    );

    expect(
      screen.getByText('Sorry, we have error loading films')
    ).toBeInTheDocument();
    expect(screen.getByText('Reload page')).toBeInTheDocument();
  });

  it('should reload page on link click', () => {
    renderWithProviders(
      <HistoryRouter history={history}>
        <MainEmpty />
      </HistoryRouter>
    );

    const reloadLink = screen.getByText('Reload page');

    userEvent.click(reloadLink);

    expect(history.location.pathname).toBe('/');
  });
});
