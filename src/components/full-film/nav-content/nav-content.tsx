import { FullFilmNav } from '../../../const';
import { FilmType } from '../../../types/store';
import FullFilmDetails from '../details/details';
import FullFilmOverview from '../overview/overview';

export default function FullFilmNavContent({
  activeNav,
  film,
}: {
  film: FilmType;
  activeNav: FullFilmNav;
}): JSX.Element {
  switch (activeNav) {
    case FullFilmNav.Overview:
      return <FullFilmOverview film={film} />;
    case FullFilmNav.Details:
      return <FullFilmDetails film={film} />;
    default:
      return <span>Unknown navigation name</span>;
  }
}
