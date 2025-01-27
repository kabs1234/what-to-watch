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
