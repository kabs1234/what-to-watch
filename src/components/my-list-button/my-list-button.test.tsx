import { render, screen } from '@testing-library/react';
import { ApiRoute, AuthorizationStatus, NameSpace } from '../../const';
import { filmMock, filmSliceMock } from '../../mocks/stub';
import { renderWithProviders } from '../../utils/test-utils';
import MyListButton from './my-list-button';
import { createAPI } from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types/store';
import { Action } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { chageFilmStatusAction } from '../../store/film/film-thunks';
import { replaceFilmInfoAction } from '../../store/film/film.slice';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

describe('Component: MyListButton', () => {
  it('should render correctly', () => {
    const mockFilm = filmMock;

    renderWithProviders(<MyListButton film={mockFilm} />, {
      preloadedState: {
        [NameSpace.Film]: filmSliceMock,
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.Authorized,
          user: null,
        },
      },
    });

    expect(
      screen.getByText('My List (3)', { exact: false })
    ).toBeInTheDocument();
  });

  it('should dispatch chageFilmStatusAction on click', async () => {
    const store = mockStore({
      [NameSpace.Film]: filmSliceMock,
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Authorized,
        user: null,
      },
    });
    const mockFilm = filmMock;

    mockAPI
      .onPost(`${ApiRoute.FavoriteFilms}/${mockFilm.id}/${1}`)
      .reply(200, mockFilm);

    render(
      <Provider store={store}>
        <MyListButton film={mockFilm} />
      </Provider>
    );

    const myListButton = screen.getByText('My List (3)', { exact: false });

    expect(store.getActions()).toEqual([]);

    await userEvent.click(myListButton);

    const actions = store
      .getActions()
      .map(({ type }: { type: Action }) => type);

    expect(actions).toEqual([
      chageFilmStatusAction.pending.type,
      replaceFilmInfoAction.type,
      chageFilmStatusAction.fulfilled.type,
    ]);
  });
});
