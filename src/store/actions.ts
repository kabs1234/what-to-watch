import { createAction } from '@reduxjs/toolkit';
import { Action } from '../const';

export const redirectToRouteAction = createAction<string>(
  Action.RedirectToRoute
);
