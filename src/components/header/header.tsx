import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Logo from '../logo/logo';

export default function Header(): JSX.Element {
  return (
    <header className='page-header film-card__head'>
      <Logo />
      <ul className='user-block'>
        <li className='user-block__item'>
          <Link
            to={AppRoute.MyList}
            className='user-block__avatar'
            style={{ display: 'block' }}
          >
            <img
              src='img/avatar.jpg'
              alt='User avatar'
              width={63}
              height={63}
            />
          </Link>
        </li>
        <li className='user-block__item'>
          <Link to={AppRoute.SignIn} className='user-block__link'>
            Sign out
          </Link>
        </li>
      </ul>
    </header>
  );
}
