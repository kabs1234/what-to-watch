import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

export default function PlayFilmButton({
  filmId,
}: {
  filmId: number;
}): JSX.Element {
  return (
    <Link
      to={`${AppRoute.Player}/${filmId}`}
      className='btn btn--play film-card__button'
      type='button'
    >
      <svg viewBox='0 0 19 19' width='19' height='19'>
        <use xlinkHref='#play-s'></use>
      </svg>
      <span>Play</span>
    </Link>
  );
}
