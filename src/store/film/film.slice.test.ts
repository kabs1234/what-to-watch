import { filmMock, filmSliceMock } from '../../mocks/stub';
import { Films, FilmType } from '../../types/general';
import {
  filmSlice,
  replaceFilmInfoAction,
  setActiveGenreAction,
  unfavoriteAllFilmsAction,
} from './film.slice';

const reducer = filmSlice.reducer;
describe('Slice: Film', () => {
  describe('Sync Actions:', () => {
    it('should turn all films to not favorite', () => {
      const state = filmSliceMock;
      const transformedFilms = state.films.map((film) => ({
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

      if (promoFilm && updatedFilm.id === state.promoFilm?.id) {
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
});
