import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { State } from '../../types/store';

export const getFilms = (state: State) => state[NameSpace.Film].films;

export const getPromoFilm = (state: State) => state[NameSpace.Film].promoFilm;

export const getAreFilmsLoading = (state: State) =>
  state[NameSpace.Film].areOffersLoading;

export const getActiveGenre = (state: State) =>
  state[NameSpace.Film].activeGenre;

export const getGenres = (state: State) => state[NameSpace.Film].genres;

export const getIsFilmsFetchFailed = (state: State) =>
  state[NameSpace.Film].isFilmsFetchFailed;

export const favoriteFilmsSelector = createSelector(
  [(state: State) => state[NameSpace.Film].films],
  (films) => films?.filter((film) => film.isFavorite)
);
