import { Genre } from '../../const';

export default function GenreItem({
  genre,
  activeGenre,
}: {
  genre: Genre;
  activeGenre: Genre;
}): JSX.Element {
  return (
    <li
      className={`catalog__genres-item ${
        activeGenre === genre ? 'catalog__genres-item--active' : ''
      }`}
    >
      <a href='#' className='catalog__genres-link'>
        {genre}
      </a>
    </li>
  );
}
