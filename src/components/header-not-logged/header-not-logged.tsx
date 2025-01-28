import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

export default function HeaderNotLogged(): JSX.Element {
  return (
    <li className='user-block__item'>
      <Link to={AppRoute.SignIn} className='user-block__link'>
        Sign In
      </Link>
    </li>
  );
}
