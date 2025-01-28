import dayjs from 'dayjs';
import { Comment } from '../../../types/general';

export default function FullFilmReview({
  comment,
}: {
  comment: Comment;
}): JSX.Element {
  const convertedDate = dayjs(comment.date);
  const dateTime = convertedDate.format('YYYY-MM-DD');
  const formattedDate = convertedDate.format('MMMM D YYYY');

  return (
    <div className='review'>
      <blockquote className='review__quote'>
        <p className='review__text'>{comment.comment}</p>
        <footer className='review__details'>
          <cite className='review__author'>{comment.user.name}</cite>
          <time className='review__date' dateTime={dateTime}>
            {formattedDate}
          </time>
        </footer>
      </blockquote>
      <div className='review__rating'>{comment.rating}</div>
    </div>
  );
}
