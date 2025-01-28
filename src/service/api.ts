import axios from 'axios';
import { REQUEST_TIMEOUT } from '../const';
import { getToken } from '../utils/general';

export const createAPI = () => {
  const api = axios.create({
    baseURL: 'https://10.react.htmlacademy.pro/wtw',
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();

    if (token) {
      config.headers = { 'x-token': token };
    }

    return config;
  });

  return api;
};
