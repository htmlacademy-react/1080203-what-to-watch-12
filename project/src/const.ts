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

enum AuthStatus {
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

const MY_LIST_STATUSES = {
  ADD: '1',
  REMOVE: '0'
};

const PREVIEW_VIDEO_DELAY = 1000;

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

const SYMBOLS = {
  COMMA_AND_SPACE: ', ',
  COMMA: ',',
  EMPTY: '',
  HASH: '#',
  SLASH: '/'
};

const FILM_RATING = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

const FILM_TAB_HASHES = {
  OVERVIEW: '',
  DETAILS: '#details',
  REVIEWS: '#reviews'
};

const DATE_FORMATS = {
  REVIEW_DATE: 'MMMM D, YYYY',
  DATE_TIME_PARAM: 'YYYY-MM-DD'
};

const MORE_LIKE_THIS_MAX_COUNT = 4;

const GENRES = {
  ALL: {
    HASH: '',
    NAME: '',
    TITLE: 'All genres'
  }
};

const FILMS_COUNT_STEP = 8;

const TIMEOUT_SHOW_ERROR = 2000;

const AUTH_TOKEN_KEY_NAME = 'wtw-token';

const NOT_VALID_RATING = '0';

const REVIEW_LENGTH = {
  MIN: 50,
  MAX: 400
};

const MY_LIST_BUTTON_STATUSES = {
  ADD: '#add',
  IN_LIST: '#in-list'
};

export {
  AppRoutes,
  AuthStatus,
  APIRoutes,
  FILM_LEVELS,
  SYMBOLS,
  FILM_RATING,
  PREVIEW_VIDEO_DELAY,
  FILM_TAB_HASHES,
  DATE_FORMATS,
  MORE_LIKE_THIS_MAX_COUNT,
  GENRES,
  FILMS_COUNT_STEP,
  TIMEOUT_SHOW_ERROR,
  AUTH_TOKEN_KEY_NAME,
  MY_LIST_STATUSES,
  NOT_VALID_RATING,
  REVIEW_LENGTH,
  MY_LIST_BUTTON_STATUSES
};
