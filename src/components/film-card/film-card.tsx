import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { FilmType } from '../../types/general';

export default function FilmCard({ film }: { film: FilmType }): JSX.Element {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <article className='small-film-card catalog__films-card'>
      <div
        className='small-film-card__image'
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
      >
        {hover ? (
          <video
            src={film.previewVideoLink}
            autoPlay
            width={280}
            style={{ objectFit: 'fill' }}
            loop
          />
        ) : (
          <img
            src={film.previewImage}
            alt='Fantastic Beasts: The Crimes of Grindelwald'
            width={280}
            height={175}
          />
        )}
      </div>
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
