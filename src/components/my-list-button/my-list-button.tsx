import { useAppDispatch } from '../../hooks';
import { chageFilmStatusAction } from '../../store/thunks';
import { FilmType } from '../../types/general';
import { getFilmStatus } from '../../utils/general';

export type MyListButtonProps = {
  film: FilmType | null;
  setFilm: React.Dispatch<React.SetStateAction<FilmType | null>>;
};

export default function MyListButton({
  film,
  setFilm,
}: MyListButtonProps): JSX.Element | null {
  const dispatch = useAppDispatch();

  if (!film) {
    return null;
  }

  const handleMyListButtonClick = () => {
    dispatch(
      chageFilmStatusAction({
        filmid: film.id,
        status: getFilmStatus(film.isFavorite),
      })
    ).then((result) => {
      if ('error' in result) {
        throw new Error('Error adding into my list');
      }

      setFilm({ ...film, isFavorite: !film.isFavorite });
    });
  };

  return (
    <button
      className='btn btn--list film-card__button'
      type='button'
      onClick={handleMyListButtonClick}
    >
      <svg viewBox='0 0 19 20' width={19} height={20}>
        <use xlinkHref={film.isFavorite ? '#in-list' : '#add'} />
      </svg>
      <span>My list</span>
    </button>
  );
}
