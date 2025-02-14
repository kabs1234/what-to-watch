import { render, screen } from '@testing-library/react';
import { filmMock } from '../../../mocks/stub';
import { FilmType } from '../../../types/general';
import FullFilmNavContent from './nav-content';
import { FullFilmNav, UNKNOWN_NAVIGATION_MESSAGE } from '../../../const';

jest.mock('../details/details', () => {
  const mockComponent = (): JSX.Element => <div>Mocked details</div>;

  return mockComponent;
});
jest.mock('../overview/overview', () => {
  const mockComponent = (): JSX.Element => <div>Mocked overview</div>;

  return mockComponent;
});
jest.mock('../reviews/reviews', () => {
  const mockComponent = (): JSX.Element => <div>Mocked reviews</div>;

  return mockComponent;
});

describe('Component: FullFilmNavContent', () => {
  let fakeFilm: FilmType;

  beforeEach(() => {
    fakeFilm = filmMock;
  });
  it('should render film details when active navigation is details', () => {
    render(
      <FullFilmNavContent activeNav={FullFilmNav.Details} film={fakeFilm} />
    );

    expect(screen.getByText('Mocked details')).toBeInTheDocument();
  });
  it('should render film overview when active navigation is overview', () => {
    render(
      <FullFilmNavContent activeNav={FullFilmNav.Overview} film={fakeFilm} />
    );

    expect(screen.getByText('Mocked overview')).toBeInTheDocument();
  });
  it('should render film reviews when active navigation is reviews', () => {
    render(
      <FullFilmNavContent activeNav={FullFilmNav.Reviews} film={fakeFilm} />
    );

    expect(screen.getByText('Mocked reviews')).toBeInTheDocument();
  });

  it('should render error message when active navigation is unknown', () => {
    render(
      <FullFilmNavContent
        activeNav={'unknownNav' as FullFilmNav}
        film={fakeFilm}
      />
    );

    expect(screen.getByText(UNKNOWN_NAVIGATION_MESSAGE)).toBeInTheDocument();
  });
});
