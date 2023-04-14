import { Comments } from './comments-type';
import { Films, Film } from './films-type';

export type InitialState = {
  genre: string;
  sourceFilms: Films;
  promoFilm: Film | null;
  filteredFilms: Films;
  singleFilm: Film | null;
  isSingleFilmLoading: boolean;
  similarFilms: Films;
  comments: Comments | null;
  isCommentsLoading: boolean;
  maxToShow: number;
  authorizationStatus: string;
  error: string | null;
  myListFilms: Films;
};
