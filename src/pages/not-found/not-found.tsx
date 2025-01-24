import { Link } from 'react-router-dom';

export default function NotFound(): JSX.Element {
  return (
    <>
      <h1>404 Page Not Found</h1>
      <Link to={'/'}>Go to main page</Link>
    </>
  );
}
