import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { FilmType, Films, User } from '../types/general';
import {
  fetchFilmsAction,
  fetchPromoFilm,
  signInAction,
  signInCheckAction,
  signOutAction,
} from './thunks';
import { setActiveGenreAction } from './actions';
import { AuthorizationStatus } from '../const';

export type InitialState = {
  films: Films | null;
  promoFilm: FilmType | null;
  activeGenre: string;
  genres: string[] | null;
  areOffersLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  user: User | null;
};

const initialState: InitialState = {
  films: null,
  promoFilm: null,
  activeGenre: 'All',
  genres: null,
  areOffersLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveGenreAction, (state, action: PayloadAction<string>) => {
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

        state.genres = Array.from(new Set(filmGenres));

        state.areOffersLoading = false;
        state.films = films;
      }
    )
    .addCase(
      fetchPromoFilm.fulfilled,
      (state, action: PayloadAction<FilmType>) => {
        state.promoFilm = action.payload;
      }
    );
});
