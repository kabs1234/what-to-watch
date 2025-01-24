import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { Film, Films } from '../types/store';
import { fetchFilmsAction, fetchPromoFilm } from './thunk';

export type InitialState = {
  films: Films | null;
  promoFilm: Film | null;
  genre: string;
  genres: string[] | null;
  areOffersLoading: boolean;
};

const initialState: InitialState = {
  films: null,
  promoFilm: null,
  genre: 'All',
  genres: null,
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
        const films = action.payload;

        const filmGenres = films.map((film: Film) => film.genre);
        filmGenres.unshift('All');

        state.genres = Array.from(new Set(filmGenres));

        state.areOffersLoading = false;
        state.films = films;
      }
    )
    .addCase(fetchPromoFilm.fulfilled, (state, action: PayloadAction<Film>) => {
      state.promoFilm = action.payload;
    });
});
