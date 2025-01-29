import { createAction } from '@reduxjs/toolkit';
import { Action, AppRoute } from '../const';

export const setActiveGenreAction = createAction<string>(Action.SetActiveGenre);

export const redirectToRouteAction = createAction<AppRoute>(
  Action.RedirectToRoute
);
