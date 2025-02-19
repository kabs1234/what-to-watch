import { createMemoryHistory, MemoryHistory } from 'history';
import { AppRoute, AuthorizationStatus } from '../../const';
import { renderWithProviders } from '../../utils/test-utils';
import PrivateRoute from './private-route';
import { HistoryRouter } from '../history-route/history-route';
import { screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';

let history: MemoryHistory;
describe('Component: PrivateRoute', () => {
  beforeEach(() => {
    history = createMemoryHistory();
  });

  it('should render children if authorized', () => {
    const fakeAuthorizationStatus = AuthorizationStatus.Authorized;
    history.push('/private');

    renderWithProviders(
      <HistoryRouter history={history}>
        <Routes>
          <Route path={AppRoute.SignIn} element={<div>Public Route</div>} />
          <Route
            path={'/private'}
            element={
              <PrivateRoute authorizationStatus={fakeAuthorizationStatus}>
                <div>Private Route</div>
              </PrivateRoute>
            }
          />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.getByText('Private Route')).toBeInTheDocument();
  });

  it('should redirect to path if user is not authorized', () => {
    const fakeAuthorizationStatus = AuthorizationStatus.NotAuthorized;
    history.push('/private');

    renderWithProviders(
      <HistoryRouter history={history}>
        <Routes>
          <Route path={AppRoute.SignIn} element={<div>Public Route</div>} />
          <Route
            path={'/private'}
            element={
              <PrivateRoute authorizationStatus={fakeAuthorizationStatus}>
                <div>Private Route</div>
              </PrivateRoute>
            }
          />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.getByText('Public Route')).toBeInTheDocument();
  });
});
