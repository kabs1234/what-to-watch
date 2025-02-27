import { createMemoryHistory, MemoryHistory } from 'history';
import {
  AuthorizationStatus,
  MAX_GENRES_COUNT,
  NameSpace,
  STARTING_FILMS_COUNT,
} from '../../const';
import {
  filmSliceMock,
  filmsMock,
  genresMock,
  userMock,
} from '../../mocks/stub';
import { renderWithProviders } from '../../utils/test-utils';
import App from './app';
import { HistoryRouter } from '../history-route/history-route';
import { screen } from '@testing-library/react';
import { State } from '../../types/store';

let mockState: State;

jest.mock('../../pages/my-list/my-list', () => {
  const mockComponent = () => <div>Mocked MyList</div>;

  return mockComponent;
});
jest.mock('../../pages/film/film', () => {
  const mockComponent = () => <div>Mocked Film</div>;

  return mockComponent;
});
jest.mock('../../pages/player/player', () => {
  const mockComponent = () => <div>Mocked Player</div>;

  return mockComponent;
});

describe('Component: App', () => {
  let history: MemoryHistory;

  const renderWithState = () =>
    renderWithProviders(
      <HistoryRouter history={history}>
        <App />
      </HistoryRouter>,
      {
        preloadedState: mockState,
      }
    );

  beforeEach(() => {
    mockState = {
      [NameSpace.Film]: filmSliceMock,
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Authorized,
        user: userMock,
      },
    };
    history = createMemoryHistory();
  });

  it('should redirect to / path', () => {
    history.push('/');

    renderWithState();

    const userAvatar = screen.getByAltText('User avatar');

    expect(userAvatar).toBeInTheDocument();
    expect(userAvatar).toHaveAttribute(
      'src',
      'https://10.react.htmlacademy.pro/static/avatar/9.jpg'
    );
    expect(screen.getByText('Sign out')).toBeInTheDocument();
    expect(screen.getByText('Play')).toBeInTheDocument();
    expect(
      screen.getByText('My list (3)', { exact: false })
    ).toBeInTheDocument();

    genresMock.slice(0, MAX_GENRES_COUNT).forEach((genre) => {
      expect([1, 2]).toContain(screen.getAllByText(genre).length);
    });

    filmsMock.slice(0, STARTING_FILMS_COUNT).forEach((film) => {
      expect([1, 2]).toContain(screen.getAllByText(film.name).length);
    });
  });

  it('should redirect to /login path', () => {
    history.push('/login');

    mockState = {
      ...mockState,
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Authorized,
        user: userMock,
      },
    };

    renderWithState();

    expect(screen.getAllByText('Sign in')).toHaveLength(2);
    expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('should redirect to /mylist', () => {
    history.push('/mylist');

    renderWithState();

    expect(screen.getByText('Mocked MyList')).toBeInTheDocument();
  });
  it('should redirect to /films/:id', () => {
    history.push('/films/1');

    renderWithState();

    expect(screen.getByText('Mocked Film')).toBeInTheDocument();
  });

  it('should redirect to /films/:id/review path', () => {
    history.push('/player/1');

    renderWithState();

    expect(screen.getByText('Mocked Player')).toBeInTheDocument();
  });
  it('should redirect to * path', () => {
    history.push('/fake');

    renderWithState();

    expect(screen.getByText('404 Page Not Found')).toBeInTheDocument();
    expect(screen.getByText('Go to main page')).toBeInTheDocument();
  });
});
