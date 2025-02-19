import { render, screen } from '@testing-library/react';
import { HistoryRouter } from '../history-route/history-route';
import { createMemoryHistory } from 'history';
import PlayFilmButton from './play-film-button';
import { filmMock } from '../../mocks/stub';
import userEvent from '@testing-library/user-event';
import { AppRoute } from '../../const';

const history = createMemoryHistory();

describe('Component: PlayFilmButton', () => {
  it('should render correctly', () => {
    const fakeFilmId = filmMock.id;

    render(
      <HistoryRouter history={history}>
        <PlayFilmButton filmId={fakeFilmId} />
      </HistoryRouter>
    );

    expect(screen.getByText('Play')).toBeInTheDocument();
  });

  it('should redirect to /player/:filmId path when click on play button', async () => {
    const fakeFilmId = filmMock.id;

    render(
      <HistoryRouter history={history}>
        <PlayFilmButton filmId={fakeFilmId} />
      </HistoryRouter>
    );

    const playButton = screen.getByText('Play');

    await userEvent.click(playButton);

    expect(history.location.pathname).toBe(`${AppRoute.Player}/${fakeFilmId}`);
  });
});
