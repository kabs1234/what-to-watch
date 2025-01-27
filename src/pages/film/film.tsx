import FilmCard from '../../components/film-card/film-card';
import Header from '../../components/header/header';
import Sprites from '../../components/sprites/sprites';
import { filmMock, similarFilmsMock } from '../../mocks/stub';
import { getFilmLevel } from '../../utils/general';

export default function Film(): JSX.Element {
  const film = filmMock;
  const similarFilms = similarFilmsMock;

  return (
    <div>
      <Sprites />
      <section
        className='film-card film-card--full'
        style={{ backgroundColor: film.backgroundColor }}
      >
        <div className='film-card__hero'>
          <div className='film-card__bg'>
            <img src={film.backgroundImage} alt={film.name} />
          </div>
          <h1 className='visually-hidden'>WTW</h1>
          <Header />
          <div className='film-card__wrap'>
            <div className='film-card__desc'>
              <h2 className='film-card__title'>{film.name}</h2>
              <p className='film-card__meta'>
                <span className='film-card__genre'>{film.genre}</span>
                <span className='film-card__year'>{film.released}</span>
              </p>
              <div className='film-card__buttons'>
                <button
                  className='btn btn--play film-card__button'
                  type='button'
                >
                  <svg viewBox='0 0 19 19' width={19} height={19}>
                    <use xlinkHref='#play-s' />
                  </svg>
                  <span>Play</span>
                </button>
                <button
                  className='btn btn--list film-card__button'
                  type='button'
                >
                  <svg viewBox='0 0 19 20' width={19} height={20}>
                    <use xlinkHref='#add' />
                  </svg>
                  <span>My list</span>
                </button>
                <a href='add-review.html' className='btn film-card__button'>
                  Add review
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='film-card__wrap film-card__translate-top'>
          <div className='film-card__info'>
            <div className='film-card__poster film-card__poster--big'>
              <img
                src={film.posterImage}
                alt='The Grand Budapest Hotel poster'
                width={218}
                height={327}
              />
            </div>
            <div className='film-card__desc'>
              <nav className='film-nav film-card__nav'>
                <ul className='film-nav__list'>
                  <li className='film-nav__item film-nav__item--active'>
                    <a href='#' className='film-nav__link'>
                      Overview
                    </a>
                  </li>
                  <li className='film-nav__item'>
                    <a href='#' className='film-nav__link'>
                      Details
                    </a>
                  </li>
                  <li className='film-nav__item'>
                    <a href='#' className='film-nav__link'>
                      Reviews
                    </a>
                  </li>
                </ul>
              </nav>
              <div className='film-rating'>
                <div className='film-rating__score'>{film.rating}</div>
                <p className='film-rating__meta'>
                  <span className='film-rating__level'>
                    {getFilmLevel(film.rating)}
                  </span>
                  <span className='film-rating__count'>
                    {film.scoresCount} ratings
                  </span>
                </p>
              </div>
              <div className='film-card__text'>
                <p>{film.description}</p>
                <p className='film-card__director'>
                  <strong>Director: {film.director}</strong>
                </p>
                <p className='film-card__starring'>
                  <strong>
                    Starring: {film.starring.join(', ')} and other
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className='page-content'>
        <section className='catalog catalog--like-this'>
          <h2 className='catalog__title'>More like this</h2>
          <div className='catalog__films-list'>
            {similarFilms.map((similarFilm) => (
              <FilmCard key={similarFilm.name} film={similarFilm} />
            ))}
          </div>
        </section>
        <footer className='page-footer'>
          <div className='logo'>
            <a href='main.html' className='logo__link logo__link--light'>
              <span className='logo__letter logo__letter--1'>W</span>
              <span className='logo__letter logo__letter--2'>T</span>
              <span className='logo__letter logo__letter--3'>W</span>
            </a>
          </div>
          <div className='copyright'>
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
