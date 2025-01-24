import { GENRES } from '../../const';
import { useAppSelector } from '../../hooks';
import GenreItem from '../genre-item/genre-item';

export default function GenresList(): JSX.Element {
  const activeGenre = useAppSelector((state) => state.genre);

  return (
    <ul className='catalog__genres-list'>
      {GENRES.map((genre) => (
        <GenreItem key={genre} genre={genre} activeGenre={activeGenre} />
      ))}
    </ul>
  );
}
