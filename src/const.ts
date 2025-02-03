export const REQUEST_TIMEOUT = 5000;

export const STARTING_FILMS_COUNT = 8;

export const ADDING_FILMS_COUNT = 8;

export const MAX_GENRES_COUNT = 9;

export const RATING_STARS_COUNT = 10;

export enum Action {
  SetActiveGenre = 'main/setActiveGenre',
  RedirectToRoute = 'middleware/redirectToRoute',
  FetchFilms = 'api/fetchFilms',
  FetchPromoFilm = 'api/fetchPromoFilm',
  FetchFilm = 'api/fetchFilm',
  FetchComments = 'api/fetchComments',
  FetchFavoriteFilms = 'api/fetchFavoriteFilms',
  SignIn = 'api/signIn',
  SignInCheck = 'api/signInCheck',
  SignOut = 'api/signOut',
  ChageFilmStatus = 'api/chageFilmStatus',
  PostComment = 'api/postComment',
}

export enum ApiRoute {
  Films = '/films',
  PromoFilm = '/promo',
  Comments = '/comments',
  SignIn = '/login',
  SignOut = '/logout',
  FavoriteFilms = '/favorite',
}

export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Player = '/player',
  Films = '/films',
}

export enum FilmLevel {
  Bad = 'Bad',
  Normal = 'Normal',
  Good = 'Good',
  VeryGood = 'VeryGood',
  Awesome = 'Awesome',
}

export enum FullFilmNav {
  Overview = 'Overview',
  Details = 'Details',
  Reviews = 'Reviews',
}

export enum AuthorizationStatus {
  Unknown = 'Unknown',
  Authorized = 'Authorized',
  NotAuthorized = 'Not authorized',
}

export const isAuthorized = (
  authorizationStatus: AuthorizationStatus
): boolean => authorizationStatus === AuthorizationStatus.Authorized;

export const FULL_FILM_NAVIGATIONS = Object.values(FullFilmNav);
