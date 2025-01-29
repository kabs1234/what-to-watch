import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { reducer } from './reducers';
import { fetchFilmsAction, fetchPromoFilm, signInCheckAction } from './thunks';
import { redirectMiddleware } from '../middleware/redirect';

const api = createAPI();

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument: api } }).concat(
      redirectMiddleware
    ),
});

store.dispatch(fetchPromoFilm());
store.dispatch(fetchFilmsAction());
store.dispatch(signInCheckAction());
