import { State } from '../types/store';

export const getFilms = (state: State) => state.films;

export const getPromoFilm = (state: State) => state.promoFilm;

export const getAreFilmsLoading = (state: State) => state.areOffersLoading;

export const getActiveGenre = (state: State) => state.activeGenre;

export const getGenres = (state: State) => state.genres;

export const getAuthorizationStatus = (state: State) =>
  state.authorizationStatus;

export const getUser = (state: State) => state.user;

export const getFavoriteFilmsCount = (state: State) => state.favoriteFilmsCount;
