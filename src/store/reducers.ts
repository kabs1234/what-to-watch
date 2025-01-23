import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { Films, State } from '../types/store';
import { fetchFilmsAction } from './thunk';

const initialState: State = {
  films: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(
    fetchFilmsAction.fulfilled,
    (state, action: PayloadAction<Films>) => {
      state.films = action.payload;
    }
  );
});
