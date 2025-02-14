import { render, screen } from '@testing-library/react';
import FullFilmOverview from './overview';
import { filmMock } from '../../../mocks/stub';

describe('Component: FullFilmOverview', () => {
  it('should render correctly', () => {
    const fakeFilm = filmMock;

    render(<FullFilmOverview film={fakeFilm} />);

    expect(screen.getByText(fakeFilm.rating)).toBeInTheDocument();
    expect(screen.getByText('Bad')).toBeInTheDocument();
    expect(
      screen.getByText(`${fakeFilm.scoresCount} ratings`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Director: ${fakeFilm.director}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Starring: ${fakeFilm.starring.join(', ')} and other`)
    ).toBeInTheDocument();
  });
});
