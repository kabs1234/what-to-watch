import { useEffect, useState } from 'react';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import Sprites from '../../components/sprites/sprites';
import { Films } from '../../types/general';
import { useAppDispatch } from '../../hooks';
import UserBlock from '../../components/user-block/user-block';
import FilmCard from '../../components/film-card/film-card';
import Spinner from '../../components/spinner/spinner';
import TryAgain from '../try-again/try-again';
import { fetchFavoriteFilmsAction } from '../../store/film/film-thunks';

export default function MyList(): JSX.Element {
  const [favoriteFilms, setFavoriteFilms] = useState<Films | null>(null);
  const [isFetchFailed, setIsFetchFailed] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isFetchFailed) {
      dispatch(fetchFavoriteFilmsAction()).then((result) => {
        if ('error' in result) {
          setIsFetchFailed(true);
          return;
        }

        setFavoriteFilms(result.payload);
      });
    }
  }, [dispatch, isFetchFailed]);

  if (isFetchFailed) {
    return (
      <TryAgain errorMessage='Something went wrong loading your film list...' />
    );
  }

  if (!favoriteFilms) {
    return <Spinner />;
  }

  return (
    <div>
      <Sprites />
      <div className='user-page'>
        <header className='page-header user-page__head'>
          <Logo />
          <h1 className='page-title user-page__title'>My list</h1>
          <UserBlock />
        </header>
        <section className='catalog'>
          <h2 className='catalog__title visually-hidden'>Catalog</h2>
          <div className='catalog__films-list'>
            {favoriteFilms.length === 0 && (
              <p>
                The List is empty. <br />
                Try to press my list button on some films, they will appear
                here:)
              </p>
            )}
            {favoriteFilms.map((film) => (
              <FilmCard key={film.id} film={film} />
            ))}
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}
