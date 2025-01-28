import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../service/api';
import { reducer } from './reducers';
import { fetchFilmsAction, fetchPromoFilm, signInCheckAction } from './thunks';

const api = createAPI();

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument: api } }),
});

store.dispatch(fetchPromoFilm());
store.dispatch(fetchFilmsAction());
store.dispatch(signInCheckAction());
