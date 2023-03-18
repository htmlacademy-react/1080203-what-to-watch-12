enum AppRoutes {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id'
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
  COMMA_AND_SPACE: ', '
};

const FILM_RATING = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

export { AppRoutes, AuthStatus, FILM_LEVELS, SYMBOLS, FILM_RATING, PREVIEW_VIDEO_DELAY };
