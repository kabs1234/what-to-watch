import { createAsyncThunk } from '@reduxjs/toolkit';
import { Film, Films } from '../types/store';
import { AxiosInstance } from 'axios';
import { Action, ApiRoute } from '../const';

export const fetchFilmsAction = createAsyncThunk<
  Films,
  undefined,
  { extra: AxiosInstance }
>(Action.FetchFilms, async (_, { extra: api }) => {
  const { data } = await api.get<Films>(ApiRoute.Films);

  return data;
});

export const fetchPromoFilm = createAsyncThunk<
  Film,
  undefined,
  { extra: AxiosInstance }
>(Action.FetchPromoFilm, async (_, { extra: api }) => {
  const { data } = await api.get<Film>(ApiRoute.PromoFilm);

  return data;
});
