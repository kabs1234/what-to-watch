type RatingStarProps = {
  ratingIndex: number;
  activeRating: number;
  onStarClick: (rating: number) => void;
};

export default function RatingStar({
  ratingIndex,
  activeRating,
  onStarClick,
}: RatingStarProps): JSX.Element {
  return (
    <>
      <input
        className='rating__input'
        id={`star-${ratingIndex}`}
        type='radio'
        name='rating'
        defaultValue={ratingIndex}
        defaultChecked={activeRating >= ratingIndex}
        onClick={() => onStarClick(ratingIndex)}
      />
      <label className='rating__label' htmlFor={`star-${ratingIndex}`}>
        Rating {ratingIndex}
      </label>
    </>
  );
}
