import { createAsyncThunk } from '@reduxjs/toolkit';
import { FullFilm, FilmType, Films } from '../types/store';
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
  FilmType,
  undefined,
  { extra: AxiosInstance }
>(Action.FetchPromoFilm, async (_, { extra: api }) => {
  const { data } = await api.get<FilmType>(ApiRoute.PromoFilm);

  return data;
});

export const fetchFilmAction = createAsyncThunk<
  FullFilm,
  number,
  { extra: AxiosInstance }
>(Action.FetchFilm, async (id, { extra: api }) => {
  const film = await api.get<FilmType>(`${ApiRoute.Films}/${id}`);
  const similarFilms = await api.get<Films>(`${ApiRoute.Films}/${id}/similar`);

  const filmData = film.data;
  const similarFilmsData = similarFilms.data;

  return {
    film: filmData,
    similarFilms: similarFilmsData,
  };
});
