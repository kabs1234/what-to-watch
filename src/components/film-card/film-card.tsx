import { useState } from 'react';
import { Film } from '../../types/store';

export default function FilmCard({ film }: { film: Film }): JSX.Element {
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
        <a className='small-film-card__link' href='film-page.html'>
          {film.name}
        </a>
      </h3>
    </article>
  );
}
