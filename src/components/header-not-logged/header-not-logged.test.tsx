import { render, screen } from '@testing-library/react';
import { HistoryRouter } from '../history-route/history-route';
import HeaderNotLogged from './header-not-logged';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();

describe('Component: HeaderNotLogged', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <HeaderNotLogged />
      </HistoryRouter>
    );

    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });
  it('should navigate to sign in page when link is clicked', async () => {
    render(
      <HistoryRouter history={history}>
        <HeaderNotLogged />
      </HistoryRouter>
    );

    await userEvent.click(screen.getByText('Sign In'));

    expect(history.location.pathname).toBe('/login');
  });
});
