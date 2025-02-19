import { MAX_COMMENT_RATING } from '../../const';
import RatingStar from '../rating-star/rating-star';

type RatingProps = {
  activeRating: number;
  onStarClick: (rating: number) => void;
};

export default function Rating({
  activeRating,
  onStarClick,
}: RatingProps): JSX.Element {
  const ratingStars: number[] = [];

  for (let i = MAX_COMMENT_RATING; i > 0; i--) {
    ratingStars.push(i);
  }

  return (
    <div className='rating'>
      <div className='rating__stars'>
        {ratingStars.map((ratingIndex) => (
          <RatingStar
            key={ratingIndex}
            ratingIndex={ratingIndex}
            activeRating={activeRating}
            onStarClick={onStarClick}
          />
        ))}
      </div>
    </div>
  );
}
