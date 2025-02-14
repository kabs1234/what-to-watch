import { render, screen } from '@testing-library/react';
import { filmMock } from '../../../mocks/stub';
import FullFilmInfo from './info';
import { FULL_FILM_NAVIGATIONS } from '../../../const';

describe('Component: FullFilmInfo', () => {
  it('should render correctly', () => {
    const fakeFilm = filmMock;

    render(<FullFilmInfo film={fakeFilm} />);

    const posterImage = screen.getByAltText(`${fakeFilm.name} poster`);

    expect(posterImage).toBeInTheDocument();
    expect(posterImage).toHaveAttribute('src', fakeFilm.posterImage);

    FULL_FILM_NAVIGATIONS.forEach((navType) => {
      const navItem = screen.getByText(navType);
      expect(navItem).toBeInTheDocument();
    });
  });
});
