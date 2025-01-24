import { State } from '../types/store';

export const getFilms = (state: State) => state.films;

export const getPromoFilm = (state: State) => state.promoFilm;

export const getAreFilmsLoading = (state: State) => state.areOffersLoading;

export const getGenre = (state: State) => state.genre;

export const getGenres = (state: State) => state.genres;
