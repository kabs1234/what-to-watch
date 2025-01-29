import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import { Action, AppRoute } from '../const';
import browserHistory from '../services/browser-history';
import { reducer } from '../store/reducers';

type Reducer = ReturnType<typeof reducer>;

export const redirectMiddleware: Middleware<unknown, Reducer> =
  (_store) => (next) => (action: PayloadAction<AppRoute>) => {
    if (action.type === Action.RedirectToRoute) {
      browserHistory.push(action.payload);
    }

    return next(action);
  };
