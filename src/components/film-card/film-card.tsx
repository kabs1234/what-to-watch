import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { FilmType } from '../../types/general';

export default function FilmCard({ film }: { film: FilmType }): JSX.Element {
  return (
    <article className='small-film-card catalog__films-card'>
      <Link
        to={`${AppRoute.Films}/${film.id}`}
        className='small-film-card__image'
        style={{ display: 'inline-block' }}
      >
        <img
          src={film.previewImage}
          alt='Fantastic Beasts: The Crimes of Grindelwald'
          width={280}
          height={175}
        />
      </Link>
      <h3 className='small-film-card__title'>
        <Link
          className='small-film-card__link'
          to={`${AppRoute.Films}/${film.id}`}
        >
          {film.name}
        </Link>
      </h3>
    </article>
  );
}
