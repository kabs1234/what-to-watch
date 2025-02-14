import { render, screen } from '@testing-library/react';
import FilmsList from './films-list';
import { filmsMock } from '../../mocks/stub';

jest.mock('../main-film-card/main-film-card', () => {
  const mockComponent = (): JSX.Element => <div>Mocked film card</div>;

  return mockComponent;
});

describe('Component: FilmsList', () => {
  it('should render correct amount of film cards', () => {
    const fakeFilms = filmsMock;

    render(<FilmsList films={fakeFilms} />);

    expect(screen.getAllByText('Mocked film card')).toHaveLength(
      fakeFilms.length
    );
  });
});
