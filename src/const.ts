export const REQUEST_TIMEOUT = 5000;

export enum Genre {
  All = 'All genres',
  Comedies = 'Comedies',
  Crime = 'Crime',
  Documentary = 'Documentary',
  Drama = 'Dramas',
  Horror = 'Horror',
  KidsAndFamily = 'Kids & Family',
  Romance = 'Romance',
  ScienceFiction = 'Sci-Fi',
  Thriller = 'Thrillers',
}

export const GENRES = Object.values(Genre);

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
  Film = '/films',
}
