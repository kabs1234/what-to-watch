import { toast } from 'react-toastify';
import { isAuthorized } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getAuthorizationStatus,
  getFavoriteFilmsCount,
} from '../../store/selectors';
import { chageFilmStatusAction } from '../../store/thunks';
import { FilmType } from '../../types/general';
import { getFilmStatus } from '../../utils/general';
import { changeFavoriteFilmsCount } from '../../store/actions';
import { useState } from 'react';
import SpinnerDotted from '../spinner-dotted/spinner-dotted';

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
  const favoriteFilmsCount = useAppSelector(getFavoriteFilmsCount);
  const [isChangingStatus, setisChangingStatus] = useState<boolean>();

  const handleMyListButtonClick = () => {
    if (!isAuthorized(authorizationStatus)) {
      toast.info('Please sign in first before performing that action.');
      return;
    }

    setisChangingStatus(true);

    dispatch(
      chageFilmStatusAction({
        filmid: film.id,
        status: getFilmStatus(!film.isFavorite),
      })
    )
      .then((result) => {
        if ('error' in result) {
          return;
        }

        dispatch(changeFavoriteFilmsCount(result.payload.isFavorite ? 1 : 0));
        onSuccess();
      })
      .finally(() => {
        setisChangingStatus(false);
      });
  };

  return (
    <button
      className='btn btn--list film-card__button'
      type='button'
      onClick={handleMyListButtonClick}
      disabled={isChangingStatus}
    >
      {isChangingStatus ? (
        <SpinnerDotted />
      ) : (
        <svg viewBox='0 0 19 20' width={19} height={20}>
          <use
            xlinkHref={
              film.isFavorite && isAuthorized(authorizationStatus)
                ? '#in-list'
                : '#add'
            }
          />
        </svg>
      )}
      <span>
        My list{' '}
        {favoriteFilmsCount !== null && isAuthorized(authorizationStatus)
          ? `(${favoriteFilmsCount})`
          : null}
      </span>
    </button>
  );
}
