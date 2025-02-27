import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { HistoryRouter } from '../history-route/history-route';
import HeaderLogged from './header-logged';
import { userMock } from '../../mocks/stub';
import { renderWithProviders } from '../../utils/test-utils';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types/store';
import { Action } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { signOutAction } from '../../store/user/user-thunks';
import { unfavoriteAllFilmsAction } from '../../store/film/film.slice';
import { createAPI } from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';

const history = createMemoryHistory();

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

describe('Component: HeaderLogged', () => {
  it('should render correctly', () => {
    const fakeUser = userMock;

    renderWithProviders(
      <HistoryRouter history={history}>
        <HeaderLogged user={fakeUser} />
      </HistoryRouter>
    );

    const userAvatar = screen.getByAltText('User avatar');

    expect(userAvatar).toBeInTheDocument();
    expect(userAvatar).toHaveAttribute('src', fakeUser.avatarUrl);
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  it('should dispatch signOutAction and unfavoriteAllFilmsAction on button click', async () => {
    const fakeUser = userMock;
    const store = mockStore();

    mockAPI.onDelete('/logout').reply(204);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HeaderLogged user={fakeUser} />
        </HistoryRouter>
      </Provider>
    );

    const signOutButton = screen.getByText('Sign out');
    expect(store.getActions()).toEqual([]);

    await userEvent.click(signOutButton);

    const actions = store
      .getActions()
      .map(({ type }: { type: Action }) => type);

    expect(actions).toEqual([
      signOutAction.pending.type,
      signOutAction.fulfilled.type,
      unfavoriteAllFilmsAction.type,
    ]);
  });

  it('should redirect to /mylist when click on user avatar', async () => {
    const fakeUser = userMock;
    history.push('/fake');

    renderWithProviders(
      <HistoryRouter history={history}>
        <HeaderLogged user={fakeUser} />
      </HistoryRouter>
    );

    const userAvatar = screen.getByAltText('User avatar');

    await userEvent.click(userAvatar);

    expect(history.location.pathname).toBe('/mylist');
  });
});
