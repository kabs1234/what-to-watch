import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { rootReducer } from './root-reducer';
import { redirectMiddleware } from '../middleware/redirect';
import { fetchPromoFilmAction, fetchFilmsAction } from './film/film-thunks';
import { signInCheckAction } from './user/user-thunks';

const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument: api } }).concat(
      redirectMiddleware
    ),
});

store.dispatch(fetchPromoFilmAction());
store.dispatch(fetchFilmsAction());
store.dispatch(signInCheckAction());
