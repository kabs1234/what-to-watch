import { combineReducers } from '@reduxjs/toolkit';
import { filmSlice } from './film/film.slice';
import { userSlice } from './user/user.slice';
import { NameSpace } from '../const';

export const rootReducer = combineReducers({
  [NameSpace.Film]: filmSlice.reducer,
  [NameSpace.User]: userSlice.reducer,
});
