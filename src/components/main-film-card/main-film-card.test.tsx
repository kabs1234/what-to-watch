import { render, screen } from '@testing-library/react';
import { filmMock } from '../../mocks/stub';
import MainFilmCard from './main-film-card';
import { HistoryRouter } from '../history-route/history-route';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();

describe('Component: MainFilmCard', () => {
  it('should render correctly', () => {
    const fakeFilm = filmMock;

    render(
      <HistoryRouter history={history}>
        <MainFilmCard film={fakeFilm} />
      </HistoryRouter>
    );

    expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
    expect(screen.getByAltText(fakeFilm.name)).toBeInTheDocument();
  });

  it('should render preview video when hover on film image', async () => {
    const fakeFilm = filmMock;

    render(
      <HistoryRouter history={history}>
        <MainFilmCard film={fakeFilm} />
      </HistoryRouter>
    );

    const filmImage = screen.getByAltText(fakeFilm.name);

    await userEvent.hover(filmImage);

    const previewVideo = screen.getByTestId('preview-video');
    expect(previewVideo).toBeInTheDocument();
    expect(previewVideo).toHaveAttribute('src', fakeFilm.previewVideoLink);
  });
});
