import { FilmType } from '../../../types/store';
import * as dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Fragment } from 'react';
dayjs.extend(duration);

export default function FullFilmDetails({
  film,
}: {
  film: FilmType;
}): JSX.Element {
  const runTimeDuration = dayjs.duration(film.runTime, 'minutes');

  const formattedRunTime =
    runTimeDuration.asMinutes() >= 60
      ? runTimeDuration.format('H[h] mm[m]')
      : runTimeDuration.format('mm[m]');

  return (
    <div className='film-card__text film-card__row'>
      <div className='film-card__text-col'>
        <p className='film-card__details-item'>
          <strong className='film-card__details-name'>Director</strong>
          <span className='film-card__details-value'>{film.director}</span>
        </p>
        <p className='film-card__details-item'>
          <strong className='film-card__details-name'>Starring</strong>
          <span className='film-card__details-value'>
            {film.starring.map((actor, index) => {
              if (index + 1 !== film.starring.length) {
                return (
                  <Fragment key={actor}>
                    {actor}, <br />
                  </Fragment>
                );
              } else {
                return actor;
              }
            })}
          </span>
        </p>
      </div>
      <div className='film-card__text-col'>
        <p className='film-card__details-item'>
          <strong className='film-card__details-name'>Run Time</strong>
          <span className='film-card__details-value'>{formattedRunTime}</span>
        </p>
        <p className='film-card__details-item'>
          <strong className='film-card__details-name'>Genre</strong>
          <span className='film-card__details-value'>{film.genre}</span>
        </p>
        <p className='film-card__details-item'>
          <strong className='film-card__details-name'>Released</strong>
          <span className='film-card__details-value'>{film.released}</span>
        </p>
      </div>
    </div>
  );
}
