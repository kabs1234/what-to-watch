import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { fetchFilmAction } from '../../store/thunks';
import { Films, FilmType } from '../../types/general';
import FilmCard from '../../components/film-card/film-card';
import Header from '../../components/header/header';
import Sprites from '../../components/sprites/sprites';
import Loading from '../../components/loading/loading';
import FullFilmInfo from '../../components/full-film/info/info';
import Footer from '../../components/footer/footer';
import MyListButton from '../../components/my-list-button/my-list-button';
import { AppRoute } from '../../const';
import PlayFilmButton from '../../components/play-film-button/play-film-button';

export default function Film(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [film, setFilm] = useState<FilmType | null>(null);
  const [similarFilms, setSimilarFilms] = useState<Films | null>(null);

  useEffect(() => {
    dispatch(fetchFilmAction(Number(id))).then((result) => {
      if ('error' in result) {
        throw new Error('error loading film');
      }

      const fullFilm = result.payload;

      setFilm(fullFilm.film);
      setSimilarFilms(fullFilm.similarFilms);
    });
  }, [dispatch, id]);

  if (!film || !similarFilms) {
    return <Loading />;
  }

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
                <PlayFilmButton filmId={film.id} />
                <MyListButton film={film} setFilm={setFilm} />
                <Link
                  to={`${AppRoute.Films}/${film.id}/review`}
                  className='btn film-card__button'
                >
                  Add review
                </Link>
              </div>
            </div>
          </div>
        </div>
        <FullFilmInfo film={film} />
      </section>
      <div className='page-content'>
        <section className='catalog catalog--like-this'>
          <h2 className='catalog__title'>More like this</h2>
          <div className='catalog__films-list'>
            {similarFilms.slice(0, 4).map((similarFilm) => (
              <FilmCard key={similarFilm.name} film={similarFilm} />
            ))}
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}
