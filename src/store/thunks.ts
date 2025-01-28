import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Action, ApiRoute } from '../const';
import {
  Comments,
  Films,
  FilmType,
  FullFilm,
  LoginData,
  User,
} from '../types/general';
import { removeToken, setToken } from '../utils/general';

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

export const fetchCommentsAction = createAsyncThunk<
  Comments,
  number,
  { extra: AxiosInstance }
>(Action.FetchComments, async (id, { extra: api }) => {
  const { data } = await api.get<Comments>(`${ApiRoute.Comments}/${id}`);

  return data;
});

export const signInCheckAction = createAsyncThunk<
  User,
  undefined,
  { extra: AxiosInstance }
>(Action.SignInCheck, async (_, { extra: api }) => {
  const { data } = await api.get<User>(ApiRoute.SignIn);

  return data;
});

export const signInAction = createAsyncThunk<
  User,
  LoginData,
  { extra: AxiosInstance }
>(Action.SignIn, async ({ email, password }, { extra: api }) => {
  const { data } = await api.post<User>(ApiRoute.SignIn, { email, password });

  setToken(data.token);
  return data;
});

export const signOutAction = createAsyncThunk<
  void,
  undefined,
  { extra: AxiosInstance }
>(Action.SignOut, async (_, { extra: api }) => {
  await api.delete(ApiRoute.SignOut);

  removeToken();
});
