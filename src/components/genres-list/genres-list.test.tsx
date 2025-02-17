import { screen } from '@testing-library/react';
import { filmsMock, genresMock } from '../../mocks/stub';
import { renderWithProviders } from '../../utils/test-utils';
import GenresList from './genres-list';
import { MAX_GENRES_COUNT } from '../../const';

jest.mock('../genre-item/genre-item', () => {
  const mockComponent = (): JSX.Element => <div>Mock GenreItem</div>;

  return mockComponent;
});

describe('Component: GenresList', () => {
  it('should render correctly', () => {
    const fakeFilms = filmsMock;
    const fakeGenres = genresMock.slice(0, MAX_GENRES_COUNT);

    renderWithProviders(<GenresList />, {
      preloadedState: {
        Film: {
          films: fakeFilms,
          promoFilm: fakeFilms[0],
          activeGenre: 'All',
          genres: fakeGenres,
          areOffersLoading: true,
          isFilmsFetchFailed: false,
        },
      },
    });

    expect(screen.getAllByText('Mock GenreItem')).toHaveLength(
      fakeGenres.length
    );
  });

  it('should restrict max length of genres list to 10 if it is more than 10', () => {
    const fakeFilms = filmsMock;
    const fakeGenres = genresMock;

    renderWithProviders(<GenresList />, {
      preloadedState: {
        Film: {
          films: fakeFilms,
          promoFilm: fakeFilms[0],
          activeGenre: 'All',
          genres: fakeGenres,
          areOffersLoading: true,
          isFilmsFetchFailed: false,
        },
      },
    });

    expect(screen.getAllByText('Mock GenreItem')).toHaveLength(
      MAX_GENRES_COUNT
    );
  });
});
