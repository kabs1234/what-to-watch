import { configureMockStore } from '@jedmao/redux-mock-store';
import { redirectMiddleware } from './redirect';
import { State } from '../../types/store';
import { AnyAction } from '@reduxjs/toolkit';
import { redirectToRouteAction } from '../actions';
import { AppRoute } from '../../const';

const fakehistory = {
  location: { path: '' },
  push(newPath: string) {
    this.location.path = newPath;
  },
};

jest.mock('../../services/browser-history', () => fakehistory);

const middlewares = [redirectMiddleware];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware: Redirect', () => {
  beforeEach(() => {
    fakehistory.push('');
  });

  it('should redirect to /mylist', () => {
    store.dispatch(redirectToRouteAction(AppRoute.MyList));
    expect(fakehistory.location.path).toBe('/mylist');
    expect(store.getActions()).toEqual([
      redirectToRouteAction(AppRoute.MyList),
    ]);
  });

  it('should not redirect to /login because of bad action', () => {
    store.dispatch({ type: 'UNKNOWN_ACTION', payload: AppRoute.SignIn });
    expect(fakehistory.location.path).not.toBe('/login');
    expect(store.getActions()).not.toEqual(
      redirectToRouteAction(AppRoute.SignIn)
    );
  });
});
