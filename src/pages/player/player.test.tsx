import { screen } from '@testing-library/react';
import Player from './player';
import { renderWithProviders } from '../../utils/test-utils';
import { fetchFilmAction } from '../../store/film/film-thunks';
import { filmMock } from '../../mocks/stub';
import userEvent from '@testing-library/user-event';
import useVideo from '../../hooks/use-video';

jest.mock('../../hooks/use-video');

const mockUseVideo = jest.mocked(useVideo);

const mockedUseNavigate = jest.fn();

jest.mock('../../components/player-empty/player-empty', () => {
  const mockComponent = () => <div>Mocked PlayerEmpty</div>;

  return mockComponent;
});

jest.mock('../../store/root-reducer');

jest.mock('../../store/film/film-thunks', () => ({
  fetchFilmAction: jest.fn(),
}));

const mockedFetchFilmAction = fetchFilmAction as unknown as jest.Mock;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual<typeof import('react-router-dom')>('react-router-dom'), // use actual for all non-hook parts
  useNavigate: () => mockedUseNavigate,
  useParams: () => ({ id: '123' }),
}));

describe('Component: Player', () => {
  const mockFilm = filmMock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseVideo.mockReturnValue({
      activeControl: 'play',
      currentTime: 0,
      videoDuration: 13,
      videoProgress: 0,
    });
    mockedFetchFilmAction.mockImplementation(
      () => () => Promise.resolve({ payload: mockFilm })
    );
  });

  describe('Static actions', () => {
    it('should render correctly', async () => {
      renderWithProviders(<Player />);

      await screen.findByText('Exit');

      const videoElement = screen.getByTestId('video');

      expect(videoElement).toBeInTheDocument();
      expect(videoElement).toHaveAttribute('src', mockFilm.videoLink);
      expect(screen.getByText('Transpotting')).toBeInTheDocument();
      expect(screen.getByText('Full screen')).toBeInTheDocument();
      expect(screen.getByText('Play')).toBeInTheDocument();
      expect(screen.getByText('-00:13')).toBeInTheDocument();
    });

    it('should display spinner when video fetch is pending', () => {
      mockedFetchFilmAction.mockImplementation(() => () => Promise.resolve({}));

      renderWithProviders(<Player />);

      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('should display PlayerEmpty when video fetch has failed', async () => {
      mockedFetchFilmAction.mockImplementation(
        () => () => Promise.resolve({ error: 'Error' })
      );

      renderWithProviders(<Player />);

      await screen.findByText('Mocked PlayerEmpty');
    });
  });

  describe('Active actions', () => {
    it('should redirect to previous path when click on exit button', async () => {
      renderWithProviders(<Player />);

      await screen.findByText('Exit');

      await userEvent.click(screen.getByText('Exit'));

      expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
      expect(mockedUseNavigate).toHaveBeenCalledWith(-1);
    });
    it('should play video on control button click', async () => {
      const playButtonMock = jest.fn();

      HTMLVideoElement.prototype.play = playButtonMock;

      renderWithProviders(<Player />);

      await screen.findByText('Play');

      await userEvent.click(screen.getByText('Play'));

      expect(playButtonMock).toHaveBeenCalledTimes(1);
    });
    it('should fullscreen video on control button click', async () => {
      const fullScreenMock = jest.fn();

      HTMLVideoElement.prototype.requestFullscreen = fullScreenMock;

      renderWithProviders(<Player />);

      await screen.findByText('Full screen');

      await userEvent.click(screen.getByText('Full screen'));

      expect(fullScreenMock).toHaveBeenCalledTimes(1);
    });
  });
});
