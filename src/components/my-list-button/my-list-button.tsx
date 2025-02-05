import { toast } from 'react-toastify';
import { isAuthorized } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/selectors';
import { chageFilmStatusAction } from '../../store/thunks';
import { FilmType } from '../../types/general';
import { getFilmStatus } from '../../utils/general';

export type MyListButtonProps = {
  film: FilmType;
  onSuccess: () => void;
};

export default function MyListButton({
  film,
  onSuccess,
}: MyListButtonProps): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const handleMyListButtonClick = () => {
    if (!isAuthorized(authorizationStatus)) {
      toast.info('Please sign in first before performing that action.');
      return;
    }

    dispatch(
      chageFilmStatusAction({
        filmid: film.id,
        status: getFilmStatus(film.isFavorite),
      })
    ).then((result) => {
      if ('error' in result) {
        throw new Error('Error adding into my list');
      }

      onSuccess();
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
