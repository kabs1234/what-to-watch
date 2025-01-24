export const REQUEST_TIMEOUT = 5000;

export const STARTING_FILMS_COUNT = 8;

export const ADDING_FILMS_COUNT = 8;

export enum Action {
  SetActiveGenre = 'main/setGenre',
  FetchFilms = 'api/films',
  FetchPromoFilm = 'api/promoFilm',
}

export enum ApiRoute {
  Films = '/films',
  PromoFilm = '/promo',
}

export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Player = '/player',
  Films = '/films',
}
