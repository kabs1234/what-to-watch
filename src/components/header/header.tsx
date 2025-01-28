import Logo from '../logo/logo';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus, getUser } from '../../store/selectors';
import { isAuthorized } from '../../const';
import HeaderLogged from '../header-logged/header-logged';
import HeaderNotLogged from '../header-not-logged/header-not-logged';

export default function Header(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const user = useAppSelector(getUser);

  return (
    <header className='page-header film-card__head'>
      <Logo />
      <ul className='user-block'>
        {isAuthorized(authorizationStatus) && user ? (
          <HeaderLogged user={user} />
        ) : (
          <HeaderNotLogged />
        )}
      </ul>
    </header>
  );
}
