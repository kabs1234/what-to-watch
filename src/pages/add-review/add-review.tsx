import { Link, useParams } from 'react-router-dom';
import Rating from '../../components/rating/rating';
import Sprites from '../../components/sprites/sprites';
import { useAppDispatch, useAppSelector } from '../../hooks';
import NotFound from '../not-found/not-found';
import { isAuthorized, shadeColor } from '../../utils/general';
import UserBlock from '../../components/user-block/user-block';
import Logo from '../../components/logo/logo';
import { AppRoute } from '../../const';
import { SyntheticEvent, useState } from 'react';
import { redirectToRouteAction } from '../../store/actions';
import Spinner from '../../components/spinner/spinner';
import { postCommentAction } from '../../store/film/film-thunks';
import { getAuthorizationStatus } from '../../store/user/user-selectors';
import { getFilms } from '../../store/film/film-selectors';

export default function AddReview(): JSX.Element {
  const { id } = useParams();
  const allfilms = useAppSelector(getFilms);
  const dispatch = useAppDispatch();

  const [activeRating, setActiveRating] = useState<number>(0);
  const [commentText, setCommentText] = useState<string>('');
  const commentLength = commentText.length;
  const isFormValid =
    commentLength >= 50 && commentLength <= 400 && activeRating !== 0;
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] =
    useState<boolean>(false);

  if (!isAuthorized(authorizationStatus)) {
    dispatch(redirectToRouteAction(AppRoute.SignIn));
  }

  if (!allfilms) {
    return <Spinner />;
  }

  const film = allfilms.find((element) => element.id === Number(id));

  if (!film) {
    return <NotFound />;
  }

  const textareaBg = shadeColor(film.backgroundColor, 6);

  const handleStarClick = (rating: number): void => {
    setActiveRating(rating);
  };

  const handleCommentChange = (evt: SyntheticEvent<HTMLTextAreaElement>) => {
    setCommentText(evt.currentTarget.value);
  };

  const handleFormSubmit = (evt: SyntheticEvent<HTMLFormElement>): void => {
    evt.preventDefault();

    setIsSubmitButtonDisabled(true);

    dispatch(
      postCommentAction({
        comment: commentText,
        rating: activeRating,
        filmId: film.id,
      })
    ).then((result) => {
      if ('error' in result) {
        setIsSubmitButtonDisabled(false);
        return;
      }

      dispatch(redirectToRouteAction(`${AppRoute.Films}/${film.id}`));
    });
  };

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
          <form className='add-review__form' onSubmit={handleFormSubmit}>
            <Rating activeRating={activeRating} onStarClick={handleStarClick} />
            <div
              className='add-review__text'
              style={{ backgroundColor: textareaBg }}
            >
              <textarea
                className='add-review__textarea'
                name='review-text'
                id='review-text'
                placeholder='Review text'
                minLength={50}
                maxLength={400}
                value={commentText}
                onChange={handleCommentChange}
              />
              <div className='add-review__submit'>
                <button
                  className='add-review__btn'
                  type='submit'
                  disabled={isSubmitButtonDisabled || !isFormValid}
                >
                  {isSubmitButtonDisabled ? 'Posting...' : 'Post'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
