export default function GenreItem({
  genre,
  activeGenre,
}: {
  genre: string;
  activeGenre: string;
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
