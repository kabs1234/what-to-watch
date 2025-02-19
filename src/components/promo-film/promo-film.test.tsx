import { screen } from '@testing-library/react';
import { filmMock, filmsMock, genresMock } from '../../mocks/stub';
import { renderWithProviders } from '../../utils/test-utils';
import { PromoFilm } from './promo-film';

jest.mock('../header/header', () => {
  const mockComponent = (): JSX.Element => <div>Mocked Header</div>;

  return mockComponent;
});

jest.mock('../my-list-button/my-list-button', () => {
  const mockComponent = (): JSX.Element => <div>Mocked PlayFilmButton</div>;

  return mockComponent;
});

jest.mock('../play-film-button/play-film-button', () => {
  const mockComponent = (): JSX.Element => <div>Mocked MyListButton</div>;

  return mockComponent;
});

describe('Component: PromoFilm', () => {
  it('should render correctly when promo film is not null', () => {
    const fakePromoFilm = filmMock;

    renderWithProviders(<PromoFilm />, {
      preloadedState: {
        Film: {
          films: filmsMock,
          promoFilm: fakePromoFilm,
          activeGenre: 'All',
          genres: genresMock,
          areOffersLoading: false,
          isFilmsFetchFailed: false,
        },
      },
    });

    const promoFilmBackground = screen.getByAltText(fakePromoFilm.name);

    const promoFilmPoster = screen.getByAltText(`${fakePromoFilm.name} poster`);

    expect(screen.getByText(fakePromoFilm.name)).toBeInTheDocument();
    expect(screen.getByText(fakePromoFilm.genre)).toBeInTheDocument();
    expect(screen.getByText(fakePromoFilm.released)).toBeInTheDocument();

    expect(screen.getByText('Mocked Header')).toBeInTheDocument();
    expect(screen.getByText('Mocked PlayFilmButton')).toBeInTheDocument();
    expect(screen.getByText('Mocked MyListButton')).toBeInTheDocument();

    expect(promoFilmBackground).toBeInTheDocument();
    expect(promoFilmBackground).toHaveAttribute(
      'src',
      fakePromoFilm.backgroundImage
    );

    expect(promoFilmPoster).toBeInTheDocument();
    expect(promoFilmPoster).toHaveAttribute('src', fakePromoFilm.posterImage);
  });
});
