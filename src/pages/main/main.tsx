import { PromoFilm } from '../../components/promo-film/promo-film';
import Sprites from '../../components/sprites/sprites';
import GenresList from '../../components/genres-list/genres-list';
import FilmsList from '../../components/films-list/films-list';
import Footer from '../../components/footer/footer';
import { useAppSelector } from '../../hooks';
import { getFilms } from '../../store/selectors';
import { useState } from 'react';
import { ADDING_FILMS_COUNT, STARTING_FILMS_COUNT } from '../../const';

export default function Main(): JSX.Element {
  const films = useAppSelector(getFilms) ?? [];
  const [shownFilmsCount, setShownFilmsCount] =
    useState<number>(STARTING_FILMS_COUNT);

  const showingFilms = films.slice(0, shownFilmsCount);

  const handleShowMoreButtonClick = () => {
    setShownFilmsCount((prev) => prev + ADDING_FILMS_COUNT);
  };

  return (
    <>
      <Sprites />
      {<PromoFilm />}
      <div className='page-content'>
        <section className='catalog'>
          <h2 className='catalog__title visually-hidden'>Catalog</h2>
          <GenresList />
          <FilmsList films={showingFilms} />

          {films.length >= shownFilmsCount && (
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
