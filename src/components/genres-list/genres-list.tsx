import { useAppSelector } from '../../hooks';
import { getGenre, getGenres } from '../../store/selectors';
import GenreItem from '../genre-item/genre-item';

export default function GenresList(): JSX.Element {
  const activeGenre = useAppSelector(getGenre);
  const genres = useAppSelector(getGenres) ?? [];

  return (
    <ul className='catalog__genres-list'>
      {genres.map((genre) => (
        <GenreItem key={genre} genre={genre} activeGenre={activeGenre} />
      ))}
    </ul>
  );
}
