import { Films } from '../../types/general';
import FilmCard from '../film-card/film-card';

export default function FilmsList({ films }: { films: Films }): JSX.Element {
  return (
    <div className='catalog__films-list'>
      {films.map((film) => (
        <FilmCard key={film.id} film={film} />
      ))}
    </div>
  );
}
