export default function RatingStar({
  ratingIndex,
}: {
  ratingIndex: number;
}): JSX.Element {
  return (
    <>
      <input
        className='rating__input'
        id={`star-${ratingIndex}`}
        type='radio'
        name='rating'
        defaultValue={ratingIndex}
      />
      <label className='rating__label' htmlFor={`star-${ratingIndex}`}>
        Rating {ratingIndex}
      </label>
    </>
  );
}
