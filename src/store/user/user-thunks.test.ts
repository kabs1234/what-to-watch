import { ApiRoute } from '../../const';
import { userMock } from '../../mocks/stub';
import { redirectToRouteAction } from '../actions';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { signInCheckAction, signInAction, signOutAction } from './user-thunks';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../../services/api';
import { State } from '../../types/store';

describe('first', () => {
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

  it('should dispatch signInCheckAction on get /login', async () => {
    const mockUser = userMock;

    mockAPI.onGet(ApiRoute.SignIn).reply(200, mockUser);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(signInCheckAction());

    const actions = store
      .getActions()
      .map(({ type }: { type: Action }) => type);

    expect(actions).toEqual([
      signInCheckAction.pending.type,
      signInCheckAction.fulfilled.type,
    ]);
  });
  it('should dispatch signInAction on post /login', async () => {
    const mockUser = userMock;
    const mockEmail = '123@mail.ru';
    const mockPassword = 's1';

    mockAPI.onPost(ApiRoute.SignIn).reply(200, mockUser);

    expect(store.getActions()).toEqual([]);

    Storage.prototype.setItem = jest.fn();

    await store.dispatch(
      signInAction({ email: mockEmail, password: mockPassword })
    );

    const actions = store
      .getActions()
      .map(({ type }: { type: Action }) => type);

    expect(actions).toEqual([
      signInAction.pending.type,
      redirectToRouteAction.type,
      signInAction.fulfilled.type,
    ]);

    expect(Storage.prototype.setItem).toHaveBeenCalled();
    expect(Storage.prototype.setItem).toHaveBeenCalledWith(
      'x-token',
      mockUser.token
    );
  });
  it('should dispatch signOutAction on delete /logout', async () => {
    mockAPI.onDelete(ApiRoute.SignOut).reply(204);

    expect(store.getActions()).toEqual([]);

    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(signOutAction());

    const actions = store
      .getActions()
      .map(({ type }: { type: typeof signOutAction }) => type);

    expect(actions).toEqual([
      signOutAction.pending.type,
      signOutAction.fulfilled.type,
    ]);

    expect(Storage.prototype.removeItem).toHaveBeenCalled();
    expect(Storage.prototype.removeItem).toHaveBeenCalledWith('x-token');
  });
});
