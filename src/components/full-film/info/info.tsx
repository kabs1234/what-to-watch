import { useState } from 'react';
import { FULL_FILM_NAVIGATIONS, FullFilmNav } from '../../../const';
import FullFilmNavItem from '../nav-item/nav-item';
import FullFilmNavContent from '../nav-content/nav-content';
import { FilmType } from '../../../types/general';

export default function FullFilmInfo({
  film,
}: {
  film: FilmType;
}): JSX.Element {
  const [activeNav, setActiveNav] = useState<FullFilmNav>(FullFilmNav.Overview);

  const handleNavButtonClick = (newActiveNav: FullFilmNav) => {
    setActiveNav(newActiveNav);
  };

  return (
    <div className='film-card__wrap film-card__translate-top'>
      <div className='film-card__info'>
        <div className='film-card__poster film-card__poster--big'>
          <img
            src={film.posterImage}
            alt='The Grand Budapest Hotel poster'
            width={218}
            height={327}
          />
        </div>
        <div className='film-card__desc'>
          <nav className='film-nav film-card__nav'>
            <ul className='film-nav__list'>
              {FULL_FILM_NAVIGATIONS.map((navType) => (
                <FullFilmNavItem
                  key={navType}
                  activeNav={activeNav}
                  navType={navType}
                  onNavButtonClick={handleNavButtonClick}
                />
              ))}
            </ul>
          </nav>
          <FullFilmNavContent activeNav={activeNav} film={film} />
        </div>
      </div>
    </div>
  );
}
