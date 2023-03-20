enum AppRoutes {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
  Tabs = '/films/:id/:tabhash'
}

enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

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
  EMPTY: ''
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

export {
  AppRoutes,
  AuthStatus,
  FILM_LEVELS,
  SYMBOLS,
  FILM_RATING,
  PREVIEW_VIDEO_DELAY,
  FILM_TAB_HASHES,
  DATE_FORMATS,
  MORE_LIKE_THIS_MAX_COUNT
};
