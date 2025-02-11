import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { User } from '../../types/general';
import { useAppDispatch } from '../../hooks';
import { signOutAction } from '../../store/thunks';
import { unfavoriteAllFilmsAction } from '../../store/film/film.slice';

export default function HeaderLogged({ user }: { user: User }): JSX.Element {
  const dispatch = useAppDispatch();

  const handleSignOutButtonClick = () => {
    dispatch(signOutAction()).then((result) => {
      if ('error' in result) {
        return;
      }

      dispatch(unfavoriteAllFilmsAction());
    });
  };

  return (
    <>
      <li className='user-block__item'>
        <Link
          to={AppRoute.MyList}
          className='user-block__avatar'
          style={{ display: 'block' }}
        >
          <img src={user.avatarUrl} alt='User avatar' width={63} height={63} />
        </Link>
      </li>
      <li className='user-block__item'>
        <button
          className='user-block__link'
          style={{ border: 'none', backgroundColor: 'transparent' }}
          onClick={handleSignOutButtonClick}
        >
          Sign out
        </button>
      </li>
    </>
  );
}
