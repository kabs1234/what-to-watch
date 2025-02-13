import { createMemoryHistory, MemoryHistory } from 'history';
import { screen } from '@testing-library/react';
import { HistoryRouter } from '../history-route/history-route';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../utils/test-utils';
import FilmCard from './film-card';
import { filmMock } from '../../mocks/stub';
import { AppRoute } from '../../const';

describe('Component: FilmCard', () => {
  let history: MemoryHistory;

  beforeEach(() => {
    history = createMemoryHistory();
  });

  it('should render correctly', () => {
    const fakeFilm = filmMock;

    renderWithProviders(
      <HistoryRouter history={history}>
        <FilmCard film={filmMock} />
      </HistoryRouter>
    );

    expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
    expect(screen.getByAltText(fakeFilm.name)).toBeInTheDocument();
  });

  it('should navigate to the film page when the film name is clicked', async () => {
    const fakeFilm = filmMock;
    history.push(AppRoute.MyList);

    renderWithProviders(
      <HistoryRouter history={history}>
        <FilmCard film={fakeFilm} />
      </HistoryRouter>
    );

    const filmLink = screen.getByText(fakeFilm.name);

    await userEvent.click(filmLink);

    expect(history.location.pathname).toBe(`${AppRoute.Films}/${fakeFilm.id}`);
  });
  it('should navigate to the film page when the film image is clicked', async () => {
    const fakeFilm = filmMock;

    history.push(`${AppRoute.Films}/2`);

    renderWithProviders(
      <HistoryRouter history={history}>
        <FilmCard film={fakeFilm} />
      </HistoryRouter>
    );

    const filmLink = screen.getByAltText(fakeFilm.name);

    await userEvent.click(filmLink);

    expect(history.location.pathname).toBe(`${AppRoute.Films}/${fakeFilm.id}`);
  });
});
