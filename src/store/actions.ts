import { createAction } from '@reduxjs/toolkit';
import { Action } from '../const';

export const setActiveGenreAction = createAction<string>(Action.SetActiveGenre);

export const redirectToRouteAction = createAction<string>(
  Action.RedirectToRoute
);
