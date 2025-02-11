import { createAction } from '@reduxjs/toolkit';
import { Action } from '../const';
import { FilmType } from '../types/general';

export const setActiveGenreAction = createAction<string>(Action.SetActiveGenre);

export const redirectToRouteAction = createAction<string>(
  Action.RedirectToRoute
);

export const unfavoriteAllFilmsAction = createAction<void>(
  Action.UnfavoriteAllFilms
);

export const replaceFilmInfoAction = createAction<FilmType>(
  Action.ReplaceFilmInfo
);
