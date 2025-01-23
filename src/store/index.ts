import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../service/api';
import { reducer } from './reducers';
import { fetchFilmsAction } from './thunk';

const api = createAPI();

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument: api } }),
});

store.dispatch(fetchFilmsAction());
