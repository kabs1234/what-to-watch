import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { rootReducer } from './root-reducer';
import { fetchFilmsAction, fetchPromoFilm, signInCheckAction } from './thunks';
import { redirectMiddleware } from '../middleware/redirect';

const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument: api } }).concat(
      redirectMiddleware
    ),
});

store.dispatch(fetchPromoFilm());
store.dispatch(fetchFilmsAction());
store.dispatch(signInCheckAction());
