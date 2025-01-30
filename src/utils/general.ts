import { FilmLevel } from '../const';

export const getFilmLevel = (rating: number): FilmLevel | 'another level' => {
  if (rating >= 0 && rating <= 3) {
    return FilmLevel.Bad;
  } else if (rating > 3 && rating <= 5) {
    return FilmLevel.Normal;
  } else if (rating > 5 && rating <= 8) {
    return FilmLevel.Good;
  } else if (rating > 8 && rating < 10) {
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
