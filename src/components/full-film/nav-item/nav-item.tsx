import { FullFilmNav } from '../../../const';

export default function FullFilmNavItem({
  navType,
  activeNav,
  onNavButtonClick,
}: {
  navType: FullFilmNav;
  activeNav: FullFilmNav;
  onNavButtonClick: (newActiveNav: FullFilmNav) => void;
}): JSX.Element {
  return (
    <li
      className={`film-nav__item ${
        navType === activeNav ? 'film-nav__item--active' : ''
      }`}
    >
      <button
        onClick={() => onNavButtonClick(navType)}
        className='film-nav__link'
        style={{ border: 'none', backgroundColor: 'transparent' }}
      >
        {navType}
      </button>
    </li>
  );
}
