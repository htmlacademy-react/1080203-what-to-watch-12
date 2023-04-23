const FILM_RATINGS = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
const PREVIEW_VIDEO_DELAY = 1000;
const MORE_LIKE_THIS_MAX_COUNT = 4;
const FILMS_COUNT_STEP = 8;
const AUTH_TOKEN_KEY_NAME = 'wtw-token';
const NOT_VALID_RATING = '0';

enum AppRoutes {
  Main = '/',
  Genre = '/:genre',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
  Tabs = '/films/:id/:tabhash',
  Login = '/login',
  NotFound = '/404'
}

enum AuthStatuses {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

enum APIRoutes {
  Films = '/films',
  Login = '/login',
  Film = '/films/:id',
  Similar = '/films/:id/similar',
  Promo = '/promo',
  Comments = '/comments/:id',
  Favorite = '/favorite',
  AddToFavorite = '/favorite/:id/:status'
}

enum MyListStatuses {
  Add = '1',
  Remove = '0'
}

enum Symbols {
  CommaAndSpace = ', ',
  Comma = ',',
  Empty = '',
  Hash = '#',
  Slash = '/'
}

enum FilmTabHashes {
  Overview = '',
  Details = '#details',
  Reviews = '#reviews'
}

enum DateFormats {
  ReviewDate = 'MMMM D, YYYY',
  DateTimeParam = 'YYYY-MM-DD'
}

enum ReviewLength {
  Min = 50,
  Max = 400
}

enum MyListButtonStatuses {
  Add = '#add',
  InList = '#in-list'
}

enum Messages {
  EmptyFilmList = 'Список фильмов пуст'
}

enum NameSpace {
  User = 'user',
  Films = 'films',
  Comments = 'comments'
}

const FILM_LEVELS = {
  BAD: {
    NAME: 'Bad',
    MIN: 0,
    MAX: 2
  },
  NORMAL: {
    NAME: 'Normal',
    MIN: 3,
    MAX: 4
  },
  GOOD: {
    NAME: 'Good',
    MIN: 5,
    MAX: 7
  },
  VERY_GOOD: {
    NAME: 'Very good',
    MIN: 8,
    MAX: 9
  },
  AWESOME: {
    NAME: 'Awesome',
    MIN: 10,
    MAX: 10
  }
};

const GENRES = {
  ALL: {
    HASH: '',
    NAME: '',
    TITLE: 'All genres'
  }
};

export {
  AppRoutes,
  AuthStatuses,
  APIRoutes,
  Symbols,
  FilmTabHashes,
  DateFormats,
  MyListStatuses,
  ReviewLength,
  MyListButtonStatuses,
  Messages,
  NameSpace,
  FILM_LEVELS,
  FILM_RATINGS,
  PREVIEW_VIDEO_DELAY,
  MORE_LIKE_THIS_MAX_COUNT,
  GENRES,
  FILMS_COUNT_STEP,
  AUTH_TOKEN_KEY_NAME,
  NOT_VALID_RATING
};
