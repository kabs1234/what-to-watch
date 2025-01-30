import { RATING_STARS_COUNT } from '../../const';
import RatingStar from '../rating-star/rating-star';

export default function Rating(): JSX.Element {
  const ratingStars: number[] = [];

  for (let i = RATING_STARS_COUNT; i > 0; i--) {
    ratingStars.push(i);
  }

  return (
    <div className='rating'>
      <div className='rating__stars'>
        {ratingStars.map((ratingIndex) => (
          <RatingStar key={ratingIndex} ratingIndex={ratingIndex} />
        ))}
      </div>
    </div>
  );
}
