import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosInstance } from 'axios';
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
import { toast } from 'react-toastify';

export const fetchFilmsAction = createAsyncThunk<
  Films,
  undefined,
  { extra: AxiosInstance }
>(Action.FetchFilms, async (_, { extra: api }) => {
  try {
    const { data } = await api.get<Films>(ApiRoute.Films);

    return data;
  } catch (err) {
    toast.error('Error loading films');
    throw new Error('Error loading films');
  }
});

export const fetchPromoFilm = createAsyncThunk<
  FilmType,
  undefined,
  { extra: AxiosInstance }
>(Action.FetchPromoFilm, async (_, { extra: api }) => {
  try {
    const { data } = await api.get<FilmType>(ApiRoute.PromoFilm);

    return data;
  } catch (err) {
    toast.error('Error loading promo film');
    throw new Error('Error loading promo film');
  }
});

export const fetchFilmAction = createAsyncThunk<
  FullFilm,
  number,
  { extra: AxiosInstance }
>(Action.FetchFilm, async (id, { extra: api }) => {
  try {
    const film = await api.get<FilmType>(`${ApiRoute.Films}/${id}fff`);
    const similarFilms = await api.get<Films>(
      `${ApiRoute.Films}/${id}/similar`
    );

    const filmData = film.data;
    const similarFilmsData = similarFilms.data;

    return {
      film: filmData,
      similarFilms: similarFilmsData,
    };
  } catch (err) {
    toast.error('Error loading film');
    throw new Error('Error loading film');
  }
});

export const fetchCommentsAction = createAsyncThunk<
  Comments,
  number,
  { extra: AxiosInstance }
>(Action.FetchComments, async (id, { extra: api }) => {
  try {
    const { data } = await api.get<Comments>(`${ApiRoute.Comments}/${id}`);

    return data;
  } catch (err) {
    toast.error('Error loading film comments');
    throw new Error('Error loading film comments');
  }
});

export const signInCheckAction = createAsyncThunk<
  User,
  undefined,
  { extra: AxiosInstance }
>(Action.SignInCheck, async (_, { extra: api }) => {
  try {
    const { data } = await api.get<User>(ApiRoute.SignIn);

    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 401) {
        throw new Error('Unauthorized');
      }
    }

    toast.error('Error signing you in');
    throw new Error('Error signing you in');
  }
});

export const signInAction = createAsyncThunk<
  User,
  LoginData,
  { extra: AxiosInstance }
>(Action.SignIn, async ({ email, password }, { extra: api }) => {
  try {
    const { data } = await api.post<User>(ApiRoute.SignIn, { email, password });

    setToken(data.token);
    return data;
  } catch (err) {
    toast.error('Error signing you in');
    throw new Error('Error signing you in');
  }
});

export const signOutAction = createAsyncThunk<
  void,
  undefined,
  { extra: AxiosInstance }
>(Action.SignOut, async (_, { extra: api }) => {
  try {
    await api.delete(ApiRoute.SignOut);

    removeToken();
  } catch (err) {
    toast.error('Error signing you out');
    throw new Error('Error signing you out');
  }
});

export const fetchFavoriteFilmsAction = createAsyncThunk<
  Films,
  undefined,
  { extra: AxiosInstance }
>(Action.FetchFavoriteFilms, async (_, { extra: api }) => {
  try {
    const { data } = await api.get<Films>(ApiRoute.FavoriteFilms);

    return data;
  } catch (err) {
    toast.error('Error loading favorite films');
    throw new Error('Error loading favorite films');
  }
});

export const chageFilmStatusAction = createAsyncThunk<
  FilmType,
  { filmid: number; status: 0 | 1 },
  { extra: AxiosInstance }
>(Action.ChageFilmStatus, async ({ filmid, status }, { extra: api }) => {
  try {
    const { data } = await api.post<FilmType>(
      `${ApiRoute.FavoriteFilms}/${filmid}/${status}`
    );

    return data;
  } catch (err) {
    toast.error('Error changing film status');
    throw new Error('Error changing film status');
  }
});

export const postCommentAction = createAsyncThunk<
  Comments,
  {
    filmId: number;
    comment: string;
    rating: number;
  },
  { extra: AxiosInstance }
>(Action.PostComment, async ({ comment, rating, filmId }, { extra: api }) => {
  try {
    const { data } = await api.post<Comments>(
      `${ApiRoute.Comments}/${filmId}`,
      {
        comment,
        rating,
      }
    );

    return data;
  } catch (err) {
    toast.error('Error posting comment');
    throw new Error('Error posting comment');
  }
});
