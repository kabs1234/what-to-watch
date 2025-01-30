import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';

export default function Header(): JSX.Element {
  return (
    <header className='page-header film-card__head'>
      <Logo />
      <UserBlock />
    </header>
  );
}
