import axios from 'axios';
import { REQUEST_TIMEOUT } from '../const';

export const createAPI = () =>
  axios.create({
    baseURL: 'https://10.react.htmlacademy.pro/wtw',
    timeout: REQUEST_TIMEOUT,
  });
