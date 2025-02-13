import './spinner.css';

export default function Spinner(): JSX.Element {
  return (
    <div className='wrapper'>
      <span className='loader' role='status' aria-label='Loading'></span>
    </div>
  );
}
