import { Films } from '../../types/general';
import MainFilmCard from '../main-film-card/main-film-card';

export default function FilmsList({ films }: { films: Films }): JSX.Element {
  return (
    <div className='catalog__films-list'>
      {films.map((film) => (
        <MainFilmCard key={film.id} film={film} />
      ))}
    </div>
  );
}
