import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  favoriteFilmsSelector,
  getAuthorizationStatus,
} from '../../store/selectors';
import { chageFilmStatusAction } from '../../store/thunks';
import { FilmType } from '../../types/general';
import { getFilmStatus, isAuthorized } from '../../utils/general';
import { useState } from 'react';
import SpinnerDotted from '../spinner-dotted/spinner-dotted';

export type MyListButtonProps = {
  film: FilmType;
  onSuccess?: () => void;
};

export default function MyListButton({
  film,
  onSuccess,
}: MyListButtonProps): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const favoriteFilms = useAppSelector(favoriteFilmsSelector);
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

        const isFilmFavorite = result.payload.isFavorite;

        if (onSuccess) {
          onSuccess();
        }

        if (isFilmFavorite) {
          toast.success('Added film to my list');
        } else {
          toast.info('Removed film from my list');
        }
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
        {favoriteFilms !== undefined && isAuthorized(authorizationStatus)
          ? `(${favoriteFilms.length})`
          : null}
      </span>
    </button>
  );
}
