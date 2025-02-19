import { useAppSelector } from '../../hooks';
import { getPromoFilm } from '../../store/selectors';
import Header from '../header/header';
import MyListButton from '../my-list-button/my-list-button';
import PlayFilmButton from '../play-film-button/play-film-button';

export function PromoFilm(): JSX.Element {
  const promoFilm = useAppSelector(getPromoFilm);

  if (!promoFilm) {
    return (
      <section className='film-card' style={{ background: '#0C0101' }}>
        <Header />
      </section>
    );
  }

  return (
    <section className='film-card'>
      <div className='film-card__bg'>
        <img src={promoFilm.backgroundImage} alt={promoFilm.name} />
      </div>
      <h1 className='visually-hidden'>WTW</h1>
      <Header />
      <div className='film-card__wrap'>
        <div className='film-card__info'>
          <div className='film-card__poster'>
            <img
              src={promoFilm.posterImage}
              alt={`${promoFilm.name} poster`}
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
              <PlayFilmButton filmId={promoFilm.id} />
              <MyListButton film={promoFilm} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
