import { useEffect, useRef, useState } from 'react';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import Sprites from '../../components/sprites/sprites';
import { Films } from '../../types/general';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFavoriteFilmsAction } from '../../store/thunks';
import Loading from '../../components/loading/loading';
import { getAuthorizationStatus } from '../../store/selectors';
import { AppRoute, isAuthorized } from '../../const';
import { redirectToRouteAction } from '../../store/actions';
import UserBlock from '../../components/user-block/user-block';
import FilmCard from '../../components/film-card/film-card';

export default function MyList(): JSX.Element {
  const [favoriteFilms, setFavoriteFilms] = useState<Films | null>(null);
  const dispatch = useAppDispatch();
  const hasFetched = useRef(false);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    if (!isAuthorized(authorizationStatus)) {
      dispatch(redirectToRouteAction(AppRoute.SignIn));
      return;
    }

    if (!hasFetched.current) {
      hasFetched.current = true;
      dispatch(fetchFavoriteFilmsAction()).then((result) => {
        if ('error' in result) {
          throw new Error('Error loading favorite films');
        }

        setFavoriteFilms(result.payload);
      });
    }
  });

  if (!favoriteFilms) {
    return <Loading />;
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
