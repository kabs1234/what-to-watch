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
  changeFavoriteFilmsCount,
  changePromoFilmStatus,
  setActiveGenreAction,
} from './actions';
import { AuthorizationStatus, MAX_GENRES_COUNT } from '../const';

export type InitialState = {
  films: Films | null;
  promoFilm: FilmType | null;
  activeGenre: string;
  favoriteFilmsCount: number | null;
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
  favoriteFilmsCount: null,
  genres: null,
  areOffersLoading: false,
  isFilmsFetchFailed: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(
      changeFavoriteFilmsCount,
      (state, action: PayloadAction<1 | 0>) => {
        if (state.favoriteFilmsCount !== null) {
          if (action.payload === 1) {
            state.favoriteFilmsCount += 1;
          } else {
            state.favoriteFilmsCount -= 1;
          }
        }
      }
    )
    .addCase(changePromoFilmStatus, (state, action) => {
      const promoFilm = state.promoFilm;
      if (promoFilm) {
        state.promoFilm = {
          ...promoFilm,
          isFavorite: !promoFilm.isFavorite,
        };
      }
    })
    .addCase(setActiveGenreAction, (state, action: PayloadAction<string>) => {
      state.activeGenre = action.payload;
    })
    .addCase(signOutAction.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.NotAuthorized;
      state.user = null;
      state.favoriteFilmsCount = null;

      const promoFilm = state.promoFilm;

      if (promoFilm) {
        state.promoFilm = {
          ...promoFilm,
          isFavorite: !promoFilm.isFavorite,
        };
      }
    })
    .addCase(signInAction.fulfilled, (state, action: PayloadAction<User>) => {
      state.authorizationStatus = AuthorizationStatus.Authorized;
      state.user = action.payload;
      state.favoriteFilmsCount = 0;
    })
    .addCase(signInCheckAction.rejected, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.NotAuthorized;
      state.user = null;
      state.favoriteFilmsCount = null;
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

        const favoriteFilms = films.filter((film) => film.isFavorite);
        state.favoriteFilmsCount = favoriteFilms.length;

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
