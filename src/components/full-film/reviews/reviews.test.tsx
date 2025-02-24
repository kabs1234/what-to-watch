import { screen } from '@testing-library/react';
import { fetchCommentsAction } from '../../../store/film/film-thunks';
import FullFilmReviews from './reviews';
import { commentsMock } from '../../../mocks/stub';
import { renderWithProviders } from '../../../utils/test-utils';
import userEvent from '@testing-library/user-event';

jest.mock('../../../store/root-reducer');

jest.mock('../../../store/film/film-thunks', () => ({
  fetchCommentsAction: jest.fn(),
}));

const mockedFetchCommentsAction = fetchCommentsAction as unknown as jest.Mock;

describe('FullFilmReviews Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display comments when fetch is successful', async () => {
    mockedFetchCommentsAction.mockImplementation(
      () => () => Promise.resolve({ payload: commentsMock })
    );

    renderWithProviders(<FullFilmReviews filmId={1} />);

    await screen.findByText(/2.8/i);
    expect(screen.getByText(/Max/i)).toBeInTheDocument();
    expect(screen.getByText(/December 22, 2024/i)).toBeInTheDocument();

    expect(screen.getByText(/5.2/i)).toBeInTheDocument();
    expect(screen.getByText(/Corey/i)).toBeInTheDocument();
    expect(screen.getByText(/December 23, 2024/i)).toBeInTheDocument();
  });

  it('should display loading message when fetch is pending', () => {
    mockedFetchCommentsAction.mockImplementation(
      () => () => Promise.resolve({ payload: null })
    );

    renderWithProviders(<FullFilmReviews filmId={1} />);

    expect(screen.getByText('Loading Comments...')).toBeInTheDocument();
  });

  it('should display info message when fetched comments is empty', async () => {
    mockedFetchCommentsAction.mockImplementation(
      () => () => Promise.resolve({ payload: [] })
    );

    renderWithProviders(<FullFilmReviews filmId={1} />);

    await screen.findByText(
      'No comments has been left. Be the first to comment the film!',
      { exact: false }
    );
  });

  it('should display error message when fetch has failed', async () => {
    mockedFetchCommentsAction.mockImplementation(
      () => () => Promise.resolve({ error: 'Network error' })
    );

    renderWithProviders(<FullFilmReviews filmId={1} />);

    await screen.findByText(
      'Sorry, we were unable to load the comments due to network issues.'
    );
    expect(screen.getByText('Try again')).toBeInTheDocument();
  });

  it('should display comments after click on try again button', async () => {
    mockedFetchCommentsAction.mockImplementationOnce(
      () => () => Promise.resolve({ error: 'Network error' })
    );

    renderWithProviders(<FullFilmReviews filmId={1} />);

    await screen.findByText('Try again');

    mockedFetchCommentsAction.mockImplementationOnce(
      () => () => Promise.resolve({ payload: commentsMock })
    );

    await userEvent.click(screen.getByText('Try again'));

    await screen.findByText(/2.8/i);
    expect(screen.getByText(/Max/i)).toBeInTheDocument();
    expect(screen.getByText(/December 22, 2024/i)).toBeInTheDocument();

    expect(screen.getByText(/5.2/i)).toBeInTheDocument();
    expect(screen.getByText(/Corey/i)).toBeInTheDocument();
    expect(screen.getByText(/December 23, 2024/i)).toBeInTheDocument();
  });
});
