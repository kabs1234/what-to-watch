import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import { Action } from '../const';
import browserHistory from '../services/browser-history';
import { rootReducer } from '../store/root-reducer';

export type ReducerType = ReturnType<typeof rootReducer>;

export const redirectMiddleware: Middleware<unknown, ReducerType> =
  (_store) => (next) => (action: PayloadAction<string>) => {
    if (action.type === Action.RedirectToRoute) {
      browserHistory.push(action.payload);
    }

    return next(action);
  };
