import { SyntheticEvent, useEffect, useRef } from 'react';
import Footer from '../../components/footer/footer';
import Sprites from '../../components/sprites/sprites';
import { isEmailValid, isPasswordValid } from '../../utils/general';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { signInAction } from '../../store/thunks';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, isAuthorized } from '../../const';
import { getAuthorizationStatus } from '../../store/selectors';
import { redirectToRouteAction } from '../../store/actions';

export default function SignIn(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthorized(authorizationStatus)) {
      dispatch(redirectToRouteAction(AppRoute.Main));
    }
  }, [authorizationStatus, dispatch]);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSignInButtonClick = (evt: SyntheticEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!emailRef.current || !passwordRef.current) {
      return;
    }

    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;

    if (isEmailValid(emailValue) && isPasswordValid(passwordValue)) {
      dispatch(
        signInAction({ email: emailValue, password: passwordValue })
      ).then((result) => {
        if ('error' in result) {
          throw new Error('Error signing in');
        }

        navigate(AppRoute.Main);
      });
    }
  };

  return (
    <div>
      <Sprites />
      <div className='user-page'>
        <header className='page-header user-page__head'>
          <div className='logo'>
            <Link to={'/'} className='logo__link'>
              <span className='logo__letter logo__letter--1'>W</span>
              <span className='logo__letter logo__letter--2'>T</span>
              <span className='logo__letter logo__letter--3'>W</span>
            </Link>
          </div>
          <h1 className='page-title user-page__title'>Sign in</h1>
        </header>
        <div className='sign-in user-page__content'>
          <form className='sign-in__form' onSubmit={handleSignInButtonClick}>
            <div className='sign-in__fields'>
              <div className='sign-in__field'>
                <input
                  className='sign-in__input'
                  type='email'
                  placeholder='Email address'
                  name='user-email'
                  id='user-email'
                  ref={emailRef}
                />
                <label
                  className='sign-in__label visually-hidden'
                  htmlFor='user-email'
                >
                  Email address
                </label>
              </div>
              <div className='sign-in__field'>
                <input
                  className='sign-in__input'
                  type='password'
                  placeholder='Password'
                  name='user-password'
                  id='user-password'
                  ref={passwordRef}
                />
                <label
                  className='sign-in__label visually-hidden'
                  htmlFor='user-password'
                >
                  Password
                </label>
              </div>
            </div>
            <div className='sign-in__submit'>
              <button className='sign-in__btn' type='submit'>
                Sign in
              </button>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
}
