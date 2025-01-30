type FullFilmButtonsProps = {
  isFavorite: boolean;
  onMyListButtonClick: () => void;
};

export default function FullFilmButtons({
  isFavorite,
  onMyListButtonClick,
}: FullFilmButtonsProps): JSX.Element {
  return (
    <div className='film-card__buttons'>
      <button className='btn btn--play film-card__button' type='button'>
        <svg viewBox='0 0 19 19' width={19} height={19}>
          <use xlinkHref='#play-s' />
        </svg>
        <span>Play</span>
      </button>
      <button
        className='btn btn--list film-card__button'
        type='button'
        onClick={onMyListButtonClick}
      >
        <svg viewBox='0 0 19 20' width={19} height={20}>
          <use xlinkHref={isFavorite ? '#in-list' : '#add'} />
        </svg>
        <span>My list</span>
      </button>
      <a href='add-review.html' className='btn film-card__button'>
        Add review
      </a>
    </div>
  );
}
