import { FilmType } from '../../../types/store';
import { getFilmLevel } from '../../../utils/general';

export default function FullFilmOverview({
  film,
}: {
  film: FilmType;
}): JSX.Element {
  return (
    <>
      <div className='film-rating'>
        <div className='film-rating__score'>{film.rating}</div>
        <p className='film-rating__meta'>
          <span className='film-rating__level'>
            {getFilmLevel(film.rating)}
          </span>
          <span className='film-rating__count'>{film.scoresCount} ratings</span>
        </p>
      </div>
      <div className='film-card__text'>
        <p>{film.description}</p>
        <p className='film-card__director'>
          <strong>Director: {film.director}</strong>
        </p>
        <p className='film-card__starring'>
          <strong>Starring: {film.starring.join(', ')} and other</strong>
        </p>
      </div>
    </>
  );
}
