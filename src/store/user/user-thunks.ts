import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import { Action, ApiRoute, AppRoute } from '../../const';
import { User, LoginData } from '../../types/general';
import { AppDispatch } from '../../types/store';
import { setToken, removeToken } from '../../utils/general';
import { redirectToRouteAction } from '../actions';

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

    toast.error('Error checking sign in status');
    throw new Error('Error checking sign in status');
  }
});

export const signInAction = createAsyncThunk<
  User,
  LoginData,
  { extra: AxiosInstance; dispatch: AppDispatch }
>(Action.SignIn, async ({ email, password }, { extra: api, dispatch }) => {
  try {
    const { data } = await api.post<User>(AppRoute.SignIn, { email, password });

    setToken(data.token);
    dispatch(redirectToRouteAction(AppRoute.Main));
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
