import { useEffect, useState } from 'react';
import FullFilmReview from '../review/review';
import { Comments } from '../../../types/general';
import { useAppDispatch } from '../../../hooks';
import { fetchCommentsAction } from '../../../store/thunks';

export default function FullFilmReviews({
  filmId,
}: {
  filmId: number;
}): JSX.Element {
  const [comments, setComments] = useState<Comments | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCommentsAction(filmId)).then((result) => {
      if ('result' in result) {
        throw new Error('Error loading comments');
      }

      const fetchedComments = result.payload as Comments;

      setComments(fetchedComments);
    });
  }, [dispatch, filmId]);

  if (!comments) {
    return <p style={{ color: '#000' }}>Loading Comments...</p>;
  }

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
