import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Films, FilmType } from '../../types/general';
import { fetchFilmsAction, fetchPromoFilm } from '../thunks';
import { MAX_GENRES_COUNT } from '../../const';

type FilmSlice = {
  films: Films | null;
  promoFilm: FilmType | null;
  activeGenre: string;
  genres: string[] | null;
  areOffersLoading: boolean;
  isFilmsFetchFailed: boolean;
};

const initialState: FilmSlice = {
  films: null,
  promoFilm: null,
  activeGenre: 'All',
  genres: null,
  areOffersLoading: false,
  isFilmsFetchFailed: false,
};

export const filmSlice = createSlice({
  name: 'film',
  initialState,
  reducers: {
    unfavoriteAllFilmsAction(state, action: PayloadAction<void>) {
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
    },
    replaceFilmInfoAction(state, action: PayloadAction<FilmType>) {
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
    },
    setActiveGenreAction(state, action: PayloadAction<string>) {
      state.activeGenre = action.payload;
    },
  },
  extraReducers(builder) {
    builder
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
  },
});

export const {
  unfavoriteAllFilmsAction,
  replaceFilmInfoAction,
  setActiveGenreAction,
} = filmSlice.actions;
