import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { FilmType, Films, User } from '../types/general';
import {
  fetchFilmsAction,
  fetchPromoFilm,
  signInAction,
  signInCheckAction,
  signOutAction,
} from './thunks';
import {
  replaceFilmInfoAction,
  setActiveGenreAction,
  unfavoriteAllFilmsAction,
} from './actions';
import { AuthorizationStatus, MAX_GENRES_COUNT } from '../const';

export type InitialState = {
  films: Films | null;
  promoFilm: FilmType | null;
  activeGenre: string;
  genres: string[] | null;
  areOffersLoading: boolean;
  isFilmsFetchFailed: boolean;
  authorizationStatus: AuthorizationStatus;
  user: User | null;
};

const initialState: InitialState = {
  films: null,
  promoFilm: null,
  activeGenre: 'All',
  genres: null,
  areOffersLoading: false,
  isFilmsFetchFailed: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(unfavoriteAllFilmsAction, (state, action) => {
      const promoFilm = state.promoFilm;

      if (promoFilm) {
        state.promoFilm = {
          ...promoFilm,
          isFavorite: false,
        };
      }

      state.films = state.films?.map((film) => ({
        ...film,
        isFavorite: false,
      })) as Films;
    })
    .addCase(replaceFilmInfoAction, (state, action) => {
      const updatedFilm = action.payload;
      const films = state.films;
      const promoFilm = state.promoFilm;

      if (promoFilm && updatedFilm.id === state.promoFilm?.id) {
        state.promoFilm = { ...updatedFilm };
      }

      if (films) {
        const updatedFilmIndex = films.findIndex(
          (film) => film.id === updatedFilm.id
        );
        const updatedFilms = [
          ...films.slice(0, updatedFilmIndex),
          updatedFilm,
          ...films.slice(updatedFilmIndex + 1),
        ] as Films;

        state.films = updatedFilms;
      }
    })
    .addCase(setActiveGenreAction, (state, action) => {
      state.activeGenre = action.payload;
    })
    .addCase(signOutAction.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.NotAuthorized;
      state.user = null;
    })
    .addCase(signInAction.fulfilled, (state, action: PayloadAction<User>) => {
      state.authorizationStatus = AuthorizationStatus.Authorized;
      state.user = action.payload;
    })
    .addCase(signInCheckAction.rejected, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.NotAuthorized;
      state.user = null;
    })
    .addCase(
      signInCheckAction.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.authorizationStatus = AuthorizationStatus.Authorized;
        state.user = action.payload;
      }
    )
    .addCase(fetchFilmsAction.pending, (state, action) => {
      state.areOffersLoading = true;
    })
    .addCase(
      fetchFilmsAction.fulfilled,
      (state, action: PayloadAction<Films>) => {
        const films = action.payload;

        const filmGenres = films.map((film: FilmType) => film.genre);
        filmGenres.unshift('All');

        state.genres = Array.from(new Set(filmGenres)).slice(
          0,
          MAX_GENRES_COUNT
        );

        state.areOffersLoading = false;
        state.films = films;
      }
    )
    .addCase(fetchFilmsAction.rejected, (state, action) => {
      state.areOffersLoading = false;
      state.isFilmsFetchFailed = true;
    })
    .addCase(
      fetchPromoFilm.fulfilled,
      (state, action: PayloadAction<FilmType>) => {
        state.promoFilm = action.payload;
      }
    );
});
