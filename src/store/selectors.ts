import { NameSpace } from '../const';
import { State } from '../types/store';
import { createSelector } from '@reduxjs/toolkit';

export const getFilms = (state: State) => state[NameSpace.Film].films;

export const getPromoFilm = (state: State) => state[NameSpace.Film].promoFilm;

export const getAreFilmsLoading = (state: State) =>
  state[NameSpace.Film].areOffersLoading;

export const getActiveGenre = (state: State) =>
  state[NameSpace.Film].activeGenre;

export const getGenres = (state: State) => state[NameSpace.Film].genres;

export const getAuthorizationStatus = (state: State) =>
  state[NameSpace.User].authorizationStatus;

export const getUser = (state: State) => state[NameSpace.User].user;

export const getIsFilmsFetchFailed = (state: State) =>
  state[NameSpace.Film].isFilmsFetchFailed;

export const favoriteFilmsSelector = createSelector(
  [(state: State) => state[NameSpace.Film].films],
  (films) => films?.filter((film) => film.isFavorite)
);
