import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { Film, Films } from '../types/store';
import { fetchFilmsAction, fetchPromoFilm } from './thunk';
import { Genre } from '../const';

export type InitialState = {
  films: Films | null;
  promoFilm: Film | null;
  genre: Genre;
  areOffersLoading: boolean;
};

const initialState: InitialState = {
  films: null,
  promoFilm: null,
  genre: Genre.All,
  areOffersLoading: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchFilmsAction.pending, (state, action) => {
      state.areOffersLoading = true;
    })
    .addCase(
      fetchFilmsAction.fulfilled,
      (state, action: PayloadAction<Films>) => {
        state.areOffersLoading = false;
        state.films = action.payload;
      }
    )
    .addCase(fetchPromoFilm.fulfilled, (state, action: PayloadAction<Film>) => {
      state.promoFilm = action.payload;
    });
});
