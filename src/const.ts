export const REQUEST_TIMEOUT = 5000;

export const STARTING_FILMS_COUNT = 8;

export const ADDING_FILMS_COUNT = 8;

export enum Action {
  SetActiveGenre = 'main/setActiveGenre',
  FetchFilms = 'api/fetchFilms',
  FetchPromoFilm = 'api/fetchPromoFilm',
  FetchFilm = 'api/fetchFilm',
  FetchComments = 'api/fetchComments',
}

export enum ApiRoute {
  Films = '/films',
  PromoFilm = '/promo',
  Comments = '/comments',
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

export const FULL_FILM_NAVIGATIONS = Object.values(FullFilmNav);
