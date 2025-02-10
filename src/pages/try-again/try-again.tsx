import { useNavigate } from 'react-router-dom';
import './try-again.css';

export default function TryAgain({
  errorMessage,
}: {
  errorMessage: string;
}): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className='try-again-container'>
      <p className='error-message'>
        <b>{errorMessage}</b>
      </p>
      <button className='try-again-link' onClick={() => navigate(0)}>
        Try again
      </button>
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
