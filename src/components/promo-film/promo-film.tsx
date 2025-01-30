import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getPromoFilm } from '../../store/selectors';
import { FilmType } from '../../types/general';
import Header from '../header/header';
import MyListButton from '../my-list-button/my-list-button';

export function PromoFilm(): JSX.Element | null {
  const promoFilm = useAppSelector(getPromoFilm);
  const [film, setFilm] = useState<FilmType | null>(promoFilm);

  if (!promoFilm) {
    return null;
  }

  return (
    <section className='film-card'>
      <div className='film-card__bg'>
        <img src={promoFilm.backgroundImage} alt='The Grand Budapest Hotel' />
      </div>
      <h1 className='visually-hidden'>WTW</h1>
      <Header />
      <div className='film-card__wrap'>
        <div className='film-card__info'>
          <div className='film-card__poster'>
            <img
              src={promoFilm.posterImage}
              alt='The Grand Budapest Hotel poster'
              width={218}
              height={327}
            />
          </div>
          <div className='film-card__desc'>
            <h2 className='film-card__title'>{promoFilm.name}</h2>
            <p className='film-card__meta'>
              <span className='film-card__genre'>{promoFilm.genre}</span>
              <span className='film-card__year'>{promoFilm.released}</span>
            </p>
            <div className='film-card__buttons'>
              <button className='btn btn--play film-card__button' type='button'>
                <svg viewBox='0 0 19 19' width={19} height={19}>
                  <use xlinkHref='#play-s' />
                </svg>
                <span>Play</span>
              </button>
              <MyListButton film={film} setFilm={setFilm} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
