import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks';
import GenreItem from '../genre-item/genre-item';
import { setActiveGenreAction } from '../../store/film/film.slice';
import { MAX_GENRES_COUNT } from '../../const';
import { getActiveGenre, getGenres } from '../../store/film/film-selectors';

export default function GenresList(): JSX.Element {
  const activeGenre = useAppSelector(getActiveGenre);
  const genres = useAppSelector(getGenres) ?? [];
  const dispatch = useDispatch();

  const handleGenreButtonClick = (genre: string) => {
    dispatch(setActiveGenreAction(genre));
  };

  return (
    <ul className='catalog__genres-list'>
      {genres.slice(0, MAX_GENRES_COUNT).map((genre) => (
        <GenreItem
          key={genre}
          genre={genre}
          activeGenre={activeGenre}
          onClick={handleGenreButtonClick}
        />
      ))}
    </ul>
  );
}
