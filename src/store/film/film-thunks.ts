import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import { Action, ApiRoute } from '../../const';
import { Films, FilmType, Comments } from '../../types/general';
import { AppDispatch } from '../../types/store';
import { replaceFilmInfoAction } from './film.slice';

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

export const fetchPromoFilmAction = createAsyncThunk<
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
  FilmType,
  number,
  { extra: AxiosInstance }
>(Action.FetchFilm, async (id, { extra: api }) => {
  try {
    const { data } = await api.get<FilmType>(`${ApiRoute.Films}/${id}`);

    return data;
  } catch (err) {
    toast.error('Error loading film');
    throw new Error('Error loading film');
  }
});

export const fetchSimilarFilmsAction = createAsyncThunk<
  Films,
  number,
  { extra: AxiosInstance }
>(Action.FetchSimilarFilms, async (id, { extra: api }) => {
  try {
    const { data } = await api.get<Films>(`${ApiRoute.Films}/${id}/similar`);

    return data;
  } catch (err) {
    toast.error('Error loading similar films');
    throw new Error('Error loading similar films');
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
  { extra: AxiosInstance; dispatch: AppDispatch }
>(
  Action.ChageFilmStatus,
  async ({ filmid, status }, { extra: api, dispatch }) => {
    try {
      const { data } = await api.post<FilmType>(
        `${ApiRoute.FavoriteFilms}/${filmid}/${status}`
      );

      dispatch(replaceFilmInfoAction(data));
      return data;
    } catch (err) {
      toast.error('Error changing film status');
      throw new Error('Error changing film status');
    }
  }
);

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
