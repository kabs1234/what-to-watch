import { render, screen } from '@testing-library/react';
import {
  AuthorizationStatus,
  MAX_COMMENT_RATING,
  NameSpace,
} from '../../const';
import {
  commentMock,
  filmMock,
  filmSliceMock,
  userMock,
} from '../../mocks/stub';
import { renderWithProviders } from '../../utils/test-utils';
import AddReview from './add-review';
import { createMemoryHistory } from 'history';
import { HistoryRouter } from '../../components/history-route/history-route';
import userEvent from '@testing-library/user-event';
import { createAPI } from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { State } from '../../types/store';
import { Provider } from 'react-redux';
import { postCommentAction } from '../../store/film/film-thunks';
import { redirectToRouteAction } from '../../store/actions';

const history = createMemoryHistory();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual<typeof import('react-router-dom')>('react-router-dom'),
  useParams: () => ({ id: '1' }),
}));

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const mockPreloadedState = {
  [NameSpace.Film]: filmSliceMock,
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Authorized,
    user: userMock,
  },
};

describe('Page: AddReview', () => {
  it('should render correctly', () => {
    const mockFilm = filmMock;

    renderWithProviders(
      <HistoryRouter history={history}>
        <AddReview />
      </HistoryRouter>,
      {
        preloadedState: mockPreloadedState,
      }
    );

    const backgroundImage = screen.getByAltText(mockFilm.name);
    const posterImage = screen.getByAltText(`${mockFilm.name} poster`);

    expect(backgroundImage).toBeInTheDocument();
    expect(backgroundImage).toHaveAttribute('src', mockFilm.backgroundImage);
    expect(screen.getByText('Add review')).toBeInTheDocument();
    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
    expect(posterImage).toBeInTheDocument();
    expect(posterImage).toHaveAttribute('src', mockFilm.posterImage);

    expect(screen.getByPlaceholderText('Review text')).toBeInTheDocument();
    for (let i = 1; i <= MAX_COMMENT_RATING; i++) {
      expect(screen.getByDisplayValue(i)).toBeInTheDocument();
    }
    expect(screen.getByText('Post')).toBeInTheDocument();
  });
  it('should redirect to /films/:id when click on breadcrumb link', async () => {
    const mockFilm = filmMock;

    renderWithProviders(
      <HistoryRouter history={history}>
        <AddReview />
      </HistoryRouter>,
      {
        preloadedState: mockPreloadedState,
      }
    );

    const breadcrumbLink = screen.getByText(mockFilm.name);
    expect(breadcrumbLink).toBeInTheDocument();

    await userEvent.click(breadcrumbLink);

    expect(history.location.pathname).toBe('/films/1');
  });

  it('should show text that user has typed in the textarea', async () => {
    renderWithProviders(
      <HistoryRouter history={history}>
        <AddReview />
      </HistoryRouter>,
      {
        preloadedState: mockPreloadedState,
      }
    );

    const reviewTextArea = screen.getByPlaceholderText('Review text');

    await userEvent.type(reviewTextArea, 'fake review');

    expect(screen.getByText('fake review')).toBeInTheDocument();
  });

  it('should correctly check radio inputs(stars)', async () => {
    renderWithProviders(
      <HistoryRouter history={history}>
        <AddReview />
      </HistoryRouter>,
      {
        preloadedState: mockPreloadedState,
      }
    );

    const mockRadioInputIndex = 6;
    const radioInput = screen.getByDisplayValue(mockRadioInputIndex);

    await userEvent.click(radioInput);

    for (let i = 1; i <= mockRadioInputIndex; i++) {
      expect(screen.getByDisplayValue(i)).toHaveAttribute('checked');
    }

    for (let i = mockRadioInputIndex + 1; i <= MAX_COMMENT_RATING; i++) {
      expect(screen.getByDisplayValue(i)).not.toHaveAttribute('checked');
    }
  });

  it('should dispatch postCommentAction on post button click', async () => {
    const store = mockStore(mockPreloadedState);
    const mockComment = commentMock;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddReview />
        </HistoryRouter>
      </Provider>
    );

    mockAPI.onPost('/comments/1').reply(200, mockComment);

    const maxRatingRadioInput: HTMLInputElement =
      screen.getByDisplayValue('10');
    const reviewTextArea = screen.getByPlaceholderText('Review text');

    await userEvent.click(maxRatingRadioInput);
    await userEvent.type(reviewTextArea, mockComment.comment);

    const postReviewButton = screen.getByText('Post');

    expect(postReviewButton).toBeInTheDocument();

    expect(store.getActions()).toEqual([]);

    await userEvent.click(postReviewButton);

    const actions = store
      .getActions()
      .map(({ type }: { type: Action }) => type);

    expect(actions).toEqual([
      postCommentAction.pending.type,
      postCommentAction.fulfilled.type,
      redirectToRouteAction.type,
    ]);
  });

  it('should not dispatch action if textarea and radio is not entered', async () => {
    const store = mockStore(mockPreloadedState);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddReview />
        </HistoryRouter>
      </Provider>
    );

    const postReviewButton = screen.getByText('Post');

    expect(postReviewButton).toBeInTheDocument();

    await userEvent.click(postReviewButton);

    expect(store.getActions()).toEqual([]);
  });
});
