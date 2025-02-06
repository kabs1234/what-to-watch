import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import './film-try-again.css'; // Import a CSS file for styling

export default function FilmTryAgain({
  filmId,
}: {
  filmId: number;
}): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className='film-try-again-container'>
      <p className='error-message'>
        <b>Something went wrong loading film...</b>
      </p>
      <a href={`${AppRoute.Films}/${filmId}`} className='try-again-link'>
        Try again
      </a>
      <button
        onClick={() => {
          navigate(-1);
        }}
        className='go-back-button'
      >
        Go back to previous page
      </button>
    </div>
  );
}
