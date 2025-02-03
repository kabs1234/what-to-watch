import { FilmLevel } from '../const';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export const getFilmLevel = (rating: number): FilmLevel | 'another level' => {
  if (rating >= 0 && rating < 3) {
    return FilmLevel.Bad;
  } else if (rating >= 3 && rating < 5) {
    return FilmLevel.Normal;
  } else if (rating >= 5 && rating < 8) {
    return FilmLevel.Good;
  } else if (rating >= 8 && rating < 10) {
    return FilmLevel.VeryGood;
  } else if (rating === 10) {
    return FilmLevel.Awesome;
  }

  return 'another level';
};

export const getToken = (): string | null => localStorage.getItem('x-token');

export const setToken = (token: string): void => {
  localStorage.setItem('x-token', token);
};

export const removeToken = (): void => {
  localStorage.removeItem('x-token');
};

export const isPasswordValid = (password: string): boolean => {
  const regex = /^(?=.*[0-9])(?=.*[A-Za-z])[A-Za-z0-9]+$/;

  return regex.test(password);
};

export const getFilmStatus = (isFavorite: boolean) => (isFavorite ? 0 : 1);

export const isEmailValid = (email: string): boolean => {
  const regex = /^\S+@\S+\.\S+$/;

  return regex.test(email);
};

export function shadeColor(color: string, percent: number): string {
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);

  R = Math.min(255, Math.round((R * (100 + percent)) / 100));
  G = Math.min(255, Math.round((G * (100 + percent)) / 100));
  B = Math.min(255, Math.round((B * (100 + percent)) / 100));

  const RR = R.toString(16).padStart(2, '0');
  const GG = G.toString(16).padStart(2, '0');
  const BB = B.toString(16).padStart(2, '0');

  return `#${RR}${GG}${BB}`;
}

export const formatTime = (timeInSeconds: number): string =>
  dayjs.duration(timeInSeconds, 'seconds').format('[-]MM:ss');

export const getDisplayTime = (
  videoDuration: number | null,
  currentTime: number
): string | null => {
  if (videoDuration === null) {
    return formatTime(0);
  }

  const remainingTime = videoDuration - currentTime;
  return formatTime(remainingTime);
};
