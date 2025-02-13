import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { HistoryRouter } from '../history-route/history-route';
import PlayerEmpty from './player-empty';
import { createMemoryHistory, MemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

// const mockedNavigate = jest.fn();

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => mockedNavigate,
// }));

describe('Component: PlayerEmpty', () => {
  let history: MemoryHistory;

  beforeEach(() => {
    history = createMemoryHistory();
  });

  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <PlayerEmpty />
      </HistoryRouter>
    );

    const playerErrorMessage = screen.getByText('Oops..', { exact: false });

    expect(playerErrorMessage.textContent).toEqual(
      'Oops.. Seems like we are having trouble loading your film. Please try again :)'
    );

    expect(
      screen.getByRole('button', { name: 'Снова загрузить фильм' })
    ).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Exit' })).toBeInTheDocument();
  });

  it('should reload page when the try again button is clicked', async () => {
    history.push('/player/1');

    render(
      <HistoryRouter history={history}>
        <PlayerEmpty />
      </HistoryRouter>
    );

    const playerTryAgainButton = screen.getByRole('button', {
      name: 'Снова загрузить фильм',
    });

    await userEvent.click(playerTryAgainButton);

    expect(history.location.pathname).toBe('/player/1');
  });

  it('should redirect to previous page when the exit button is clicked', async () => {
    history.push('/films/1');
    history.push('/player/1');

    render(
      <HistoryRouter history={history}>
        <PlayerEmpty />
      </HistoryRouter>
    );

    const exitButton = screen.getByRole('button', { name: 'Exit' });

    await userEvent.click(exitButton);

    expect(history.location.pathname).toBe('/films/1');
  });
});
