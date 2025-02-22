import { PromoFilm } from '../../components/promo-film/promo-film';
import Sprites from '../../components/sprites/sprites';
import GenresList from '../../components/genres-list/genres-list';
import FilmsList from '../../components/films-list/films-list';
import Footer from '../../components/footer/footer';
import { useAppSelector } from '../../hooks';
import { useEffect, useState } from 'react';
import { ADDING_FILMS_COUNT, STARTING_FILMS_COUNT } from '../../const';
import MainEmpty from '../main-empty/main-empty';
import {
  getActiveGenre,
  getIsFilmsFetchFailed,
  getFilms,
} from '../../store/film/film-selectors';

export default function Main(): JSX.Element {
  const activeGenre = useAppSelector(getActiveGenre);
  const isFilmsFetchFailed = useAppSelector(getIsFilmsFetchFailed);
  const films = useAppSelector(getFilms) ?? [];
  const [shownFilmsCount, setShownFilmsCount] =
    useState<number>(STARTING_FILMS_COUNT);

  useEffect(() => {
    setShownFilmsCount(STARTING_FILMS_COUNT);
  }, [activeGenre]);

  const filteredFilms =
    activeGenre !== 'All'
      ? films.filter((film) => film.genre === activeGenre)
      : films;

  const showingFilms = filteredFilms.slice(0, shownFilmsCount);

  const handleShowMoreButtonClick = () => {
    setShownFilmsCount((prev) => prev + ADDING_FILMS_COUNT);
  };

  if (isFilmsFetchFailed) {
    return <MainEmpty />;
  }

  return (
    <>
      <Sprites />
      {<PromoFilm />}
      <div className='page-content'>
        <section className='catalog'>
          <h2 className='catalog__title visually-hidden'>Catalog</h2>
          <GenresList />
          <FilmsList films={showingFilms} />

          {filteredFilms.length >= shownFilmsCount && (
            <div className='catalog__more'>
              <button
                className='catalog__button'
                type='button'
                onClick={handleShowMoreButtonClick}
              >
                Show more
              </button>
            </div>
          )}
        </section>
        <Footer />
      </div>
    </>
  );
}
