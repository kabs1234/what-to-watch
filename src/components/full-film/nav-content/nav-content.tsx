import { FullFilmNav } from '../../../const';
import { FilmType } from '../../../types/general';
import FullFilmDetails from '../details/details';
import FullFilmOverview from '../overview/overview';
import FullFilmReviews from '../reviews/reviews';

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
    case FullFilmNav.Reviews:
      return <FullFilmReviews />;
    default:
      return <span>Unknown navigation name</span>;
  }
}
