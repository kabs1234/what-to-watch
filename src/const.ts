export const REQUEST_TIMEOUT = 5000;

export enum Action {
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
