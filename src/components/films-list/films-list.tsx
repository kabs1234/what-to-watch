import { useAppSelector } from '../../hooks';
import { getFilms } from '../../store/selectors';
import FilmCard from '../film-card/film-card';

export default function FilmsList(): JSX.Element | null {
  const films = useAppSelector(getFilms);

  if (!films) {
    return null;
  }

  return (
    <div className='catalog__films-list'>
      {films.map((film) => (
        <FilmCard key={film.id} film={film} />
      ))}
    </div>
  );
}
