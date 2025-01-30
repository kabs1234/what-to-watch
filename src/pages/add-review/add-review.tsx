import { Link, useParams } from 'react-router-dom';
import Rating from '../../components/rating/rating';
import Sprites from '../../components/sprites/sprites';
import { useAppSelector } from '../../hooks';
import { getFilms } from '../../store/selectors';
import Loading from '../../components/loading/loading';
import NotFound from '../not-found/not-found';
import { shadeColor } from '../../utils/general';
import UserBlock from '../../components/user-block/user-block';
import Logo from '../../components/logo/logo';
import { AppRoute } from '../../const';

export default function AddReview(): JSX.Element {
  const { id } = useParams();
  const allfilms = useAppSelector(getFilms);

  if (!allfilms) {
    return <Loading />;
  }

  const film = allfilms.find((element) => element.id === Number(id));

  if (!film) {
    return <NotFound />;
  }

  const textareaBg = shadeColor(film.backgroundColor, 6);

  return (
    <div>
      <Sprites />
      <section
        className='film-card film-card--full'
        style={{ backgroundColor: film.backgroundColor }}
      >
        <div className='film-card__header'>
          <div className='film-card__bg'>
            <img src={film.backgroundImage} alt={film.name} />
          </div>
          <h1 className='visually-hidden'>WTW</h1>
          <header className='page-header'>
            <Logo />
            <nav className='breadcrumbs'>
              <ul className='breadcrumbs__list'>
                <li className='breadcrumbs__item'>
                  <Link
                    to={`${AppRoute.Films}/${film.id}`}
                    className='breadcrumbs__link'
                  >
                    {film.name}
                  </Link>
                </li>
                <li className='breadcrumbs__item'>
                  <span className='breadcrumbs__link'>Add review</span>
                </li>
              </ul>
            </nav>
            <UserBlock />
          </header>
          <div className='film-card__poster film-card__poster--small'>
            <img
              src={film.posterImage}
              alt={`${film.name} poster`}
              width={218}
              height={327}
            />
          </div>
        </div>
        <div className='add-review'>
          <form action='#' className='add-review__form'>
            <Rating />
            <div
              className='add-review__text'
              style={{ backgroundColor: textareaBg }}
            >
              <textarea
                className='add-review__textarea'
                name='review-text'
                id='review-text'
                placeholder='Review text'
                defaultValue={''}
              />
              <div className='add-review__submit'>
                <button className='add-review__btn' type='submit'>
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
