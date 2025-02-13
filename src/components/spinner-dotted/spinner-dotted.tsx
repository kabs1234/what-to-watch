import './spinner-dotted.css';

export default function SpinnerDotted(): JSX.Element {
  return (
    <span className='btn__loader' role='status' aria-label='Updating'></span>
  );
}
