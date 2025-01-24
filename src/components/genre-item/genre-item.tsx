export default function GenreItem({
  genre,
  activeGenre,
  onClick,
}: {
  genre: string;
  activeGenre: string;
  onClick: (genre: string) => void;
}): JSX.Element {
  return (
    <li
      className={`catalog__genres-item ${
        activeGenre === genre ? 'catalog__genres-item--active' : ''
      }`}
    >
      <button
        className='catalog__genres-link'
        style={{ backgroundColor: 'transparent', border: 'none' }}
        onClick={() => onClick(genre)}
      >
        {genre}
      </button>
    </li>
  );
}
