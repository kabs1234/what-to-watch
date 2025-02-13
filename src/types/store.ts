import { configureStore } from '@reduxjs/toolkit';
import { store } from '../store';
import { rootReducer } from '../store/root-reducer';

export type State = ReturnType<typeof store.getState>;

export function setupStore(preloadedState?: Partial<State>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof setupStore>;
