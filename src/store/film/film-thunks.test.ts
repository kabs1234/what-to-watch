import { createAPI } from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types/store';
import { Action } from '@reduxjs/toolkit';
import { ApiRoute } from '../../const';
import {
  commentMock,
  commentsMock,
  filmMock,
  filmsMock,
} from '../../mocks/stub';
import { replaceFilmInfoAction } from '../film/film.slice';
import {
  chageFilmStatusAction,
  fetchCommentsAction,
  fetchFavoriteFilmsAction,
  fetchFilmAction,
  fetchFilmsAction,
  fetchPromoFilmAction,
  fetchSimilarFilmsAction,
  postCommentAction,
} from './film-thunks';

describe('Async thunks', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore();
  });

  it('should dispatch fetchFilmsAction on get /films', async () => {
    const mockFilms = filmsMock;

    mockAPI.onGet(ApiRoute.Films).reply(200, mockFilms);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchFilmsAction());

    const actions = store
      .getActions()
      .map(({ type }: { type: Action }) => type);

    expect(actions).toEqual([
      fetchFilmsAction.pending.type,
      fetchFilmsAction.fulfilled.type,
    ]);
  });
  it('should dispatch fetchPromoFilmAction on get /promo', async () => {
    const promoFilmMock = filmMock;

    mockAPI.onGet(ApiRoute.PromoFilm).reply(200, promoFilmMock);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchPromoFilmAction());

    const actions = store
      .getActions()
      .map(({ type }: { type: Action }) => type);

    expect(actions).toEqual([
      fetchPromoFilmAction.pending.type,
      fetchPromoFilmAction.fulfilled.type,
    ]);
  });
  it('should dispatch fetchFilmAction on get /films/{filmId}', async () => {
    const mockFilm = filmMock;

    mockAPI.onGet(`${ApiRoute.Films}/${mockFilm.id}`).reply(200, mockFilm);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchFilmAction(mockFilm.id));

    const actions = store
      .getActions()
      .map(({ type }: { type: Action }) => type);

    expect(actions).toEqual([
      fetchFilmAction.pending.type,
      fetchFilmAction.fulfilled.type,
    ]);
  });
  it('should dispatch fetchSimilarFilmsAction on get /films/{filmId}/similar', async () => {
    const mockFilm = filmMock;

    mockAPI
      .onGet(`${ApiRoute.Films}/${mockFilm.id}/similar`)
      .reply(200, mockFilm);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchSimilarFilmsAction(mockFilm.id));

    const actions = store
      .getActions()
      .map(({ type }: { type: Action }) => type);

    expect(actions).toEqual([
      fetchSimilarFilmsAction.pending.type,
      fetchSimilarFilmsAction.fulfilled.type,
    ]);
  });
  it('should dispatch fetchCommentsAction on get /comments/{filmId}', async () => {
    const mockId = 1;
    const mockComments = commentsMock;

    mockAPI.onGet(`${ApiRoute.Comments}/${mockId}`).reply(200, mockComments);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchCommentsAction(mockId));

    const actions = store
      .getActions()
      .map(({ type }: { type: Action }) => type);

    expect(actions).toEqual([
      fetchCommentsAction.pending.type,
      fetchCommentsAction.fulfilled.type,
    ]);
  });

  it('should dispatch fetchFavoriteFilmsAction on get /favorite', async () => {
    const mockFavorites = filmsMock;

    mockAPI.onGet(ApiRoute.FavoriteFilms).reply(200, mockFavorites);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchFavoriteFilmsAction());

    const actions = store
      .getActions()
      .map(({ type }: { type: Action }) => type);

    expect(actions).toEqual([
      fetchFavoriteFilmsAction.pending.type,
      fetchFavoriteFilmsAction.fulfilled.type,
    ]);
  });
  it('should dispatch chageFilmStatusAction on post /favorite/{filmId}/{status}', async () => {
    const mockFilm = filmMock;
    const mockId = filmMock.id;
    const mockStatus = 1;

    mockAPI
      .onPost(`${ApiRoute.FavoriteFilms}/${mockId}/${mockStatus}`)
      .reply(200, mockFilm);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(
      chageFilmStatusAction({ filmid: mockId, status: mockStatus })
    );

    const actions = store
      .getActions()
      .map(({ type }: { type: Action }) => type);

    expect(actions).toEqual([
      chageFilmStatusAction.pending.type,
      replaceFilmInfoAction.type,
      chageFilmStatusAction.fulfilled.type,
    ]);
  });
  it('should dispatch postCommentAction on post /comments/{filmId}', async () => {
    const mockComments = commentsMock;
    const { comment, rating } = commentMock;
    const mockFilmId = 1;

    mockAPI
      .onPost(`${ApiRoute.Comments}/${mockFilmId}`)
      .reply(200, mockComments);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(
      postCommentAction({ comment, rating, filmId: mockFilmId })
    );

    const actions = store
      .getActions()
      .map(({ type }: { type: Action }) => type);

    expect(actions).toEqual([
      postCommentAction.pending.type,
      postCommentAction.fulfilled.type,
    ]);
  });
});
