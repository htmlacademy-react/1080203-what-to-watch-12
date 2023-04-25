import { store } from '../store/index.js';
import { AuthStatuses } from '../const';
import { Film, Films } from './films-type.js';
import { Comments } from './comments-type.js';

export type UserProcess = {
  authorizationStatus: AuthStatuses;
};

export type FilmsProcess = {
  genre: string;
  sourceFilms: Films;
  promoFilm: Film | null;
  filteredFilms: Films;
  singleFilm: Film | null;
  isSingleFilmLoading: boolean;
  similarFilms: Films;
  myListFilms: Films;
  isMyListFilmsLoading: boolean;
  maxToShow: number;
};

export type CommentsProcess = {
  comments: Comments | null;
  isCommentsLoading: boolean;
  isCommentSending: boolean;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
