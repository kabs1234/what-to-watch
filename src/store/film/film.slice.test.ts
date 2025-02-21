import {
  filmMock,
  filmSliceMock,
  filmsMock,
  initialFilmSliceMock,
} from '../../mocks/stub';
import { Films, FilmType } from '../../types/general';
import { fetchFilmsAction, fetchPromoFilmAction } from './film-thunks';
import {
  FilmSlice,
  filmSlice,
  replaceFilmInfoAction,
  setActiveGenreAction,
  unfavoriteAllFilmsAction,
} from './film.slice';

const reducer = filmSlice.reducer;
describe('Reducer slice: Film', () => {
  describe('Sync Actions', () => {
    it('should turn all films to not favorite', () => {
      const state = filmSliceMock;
      const transformedFilms = state.films?.map((film) => ({
        ...film,
        isFavorite: false,
      }));
      const unfavoritedPromoFilm = {
        ...state.promoFilm,
        isFavorite: false,
      };

      expect(reducer(state, { type: unfavoriteAllFilmsAction.type })).toEqual({
        ...state,
        films: transformedFilms,
        promoFilm: unfavoritedPromoFilm,
      });
    });

    it('should turn one film to not favorite', () => {
      const updatedFilm = filmMock;
      const state = filmSliceMock;
      const films = state.films;
      const promoFilm = state.promoFilm;
      let updatedPromoFilm: FilmType = state.promoFilm;

      if (promoFilm && updatedFilm.id === state.promoFilm.id) {
        updatedPromoFilm = { ...updatedFilm };
      }

      const updatedFilmIndex = films.findIndex(
        (film) => film.id === updatedFilm.id
      );
      const updatedFilms: Films = [
        ...films.slice(0, updatedFilmIndex),
        updatedFilm,
        ...films.slice(updatedFilmIndex + 1),
      ];

      expect(
        reducer(state, {
          type: replaceFilmInfoAction.type,
          payload: updatedFilm,
        })
      ).toEqual({
        ...state,
        films: updatedFilms,
        promoFilm: updatedPromoFilm,
      });
    });

    it('should change active genre', () => {
      const state = filmSliceMock;

      const newActiveGenre = 'Comedy';

      expect(
        reducer(state, {
          type: setActiveGenreAction.type,
          payload: newActiveGenre,
        })
      ).toEqual({ ...state, activeGenre: newActiveGenre });
    });
  });

  describe('Async actions', () => {
    it('should set areOffersLoading to true on films pending', () => {
      const state: FilmSlice = {
        ...initialFilmSliceMock,
        areOffersLoading: false,
      };

      expect(reducer(state, { type: fetchFilmsAction.pending.type })).toEqual({
        ...state,
        areOffersLoading: true,
      });
    });
  });

  it('should setup film slice when films loading is succesful', () => {
    const state = initialFilmSliceMock;
    const films = filmsMock;

    const filmGenres = films.map((film: FilmType) => film.genre);
    filmGenres.unshift('All');

    expect(
      reducer(state, { type: fetchFilmsAction.fulfilled.type, payload: films })
    ).toEqual({
      ...state,
      genres: Array.from(new Set(filmGenres)),
      films,
      areOffersLoading: false,
    });
  });

  it('should setup areOffersLoading and isFilmsFetchFailed on films fetch fail', () => {
    const state = initialFilmSliceMock;

    expect(reducer(state, { type: fetchFilmsAction.rejected.type })).toEqual({
      ...state,
      areOffersLoading: false,
      isFilmsFetchFailed: true,
    });
  });

  it('should set promoFilm on fetchPromoFilmAction success', () => {
    const state = initialFilmSliceMock;
    const promoFilm = filmMock;

    expect(
      reducer(state, {
        type: fetchPromoFilmAction.fulfilled.type,
        payload: promoFilm,
      })
    ).toEqual({
      ...state,
      promoFilm,
    });
  });
});
