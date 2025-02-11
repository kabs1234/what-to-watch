import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus, getUser } from '../../store/selectors';
import { isAuthorized } from '../../utils/general';
import HeaderLogged from '../header-logged/header-logged';
import HeaderNotLogged from '../header-not-logged/header-not-logged';

export default function UserBlock(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const user = useAppSelector(getUser);

  return (
    <ul className='user-block'>
      {isAuthorized(authorizationStatus) && user ? (
        <HeaderLogged user={user} />
      ) : (
        <HeaderNotLogged />
      )}
    </ul>
  );
}
