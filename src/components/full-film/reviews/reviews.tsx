import { commentsMock } from '../../../mocks/stub';
import FullFilmReview from '../review/review';

export default function FullFilmReviews(): JSX.Element {
  const comments = commentsMock;
  const halfCommentsCount = Math.ceil(comments.length / 2);

  return (
    <div className='film-card__reviews film-card__row'>
      <div className='film-card__reviews-col'>
        {comments.slice(0, halfCommentsCount).map((comment) => (
          <FullFilmReview key={comment.id} comment={comment} />
        ))}
      </div>
      <div className='film-card__reviews-col'>
        {comments.slice(halfCommentsCount).map((comment) => (
          <FullFilmReview key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
