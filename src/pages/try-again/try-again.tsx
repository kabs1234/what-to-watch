import { useNavigate } from 'react-router-dom';
import './try-again.css';

export default function TryAgain({
  errorMessage,
  pageLink,
}: {
  errorMessage: string;
  pageLink: string;
}): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className='try-again-container'>
      <p className='error-message'>
        <b>{errorMessage}</b>
      </p>
      <a href={pageLink} className='try-again-link'>
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
