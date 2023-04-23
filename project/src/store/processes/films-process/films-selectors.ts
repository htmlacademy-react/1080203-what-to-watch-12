import { NameSpace } from '../../../const';
import { Films, Film } from '../../../types/films-type';
import { State } from '../../../types/state-type';

export const getCurrentFilms = (state: State): Films => state[NameSpace.Films].sourceFilms;
export const getCurrentFilm = (state: State): Film | null => state[NameSpace.Films].singleFilm;
export const getPromoFilm = (state: State): Film | null => state[NameSpace.Films].promoFilm;
export const getSimilarFilms = (state: State): Films => state[NameSpace.Films].similarFilms;
export const getIsSingleFilmLoading = (state: State): boolean => state[NameSpace.Films].isSingleFilmLoading;
export const getMaxToShow = (state: State): number => state[NameSpace.Films].maxToShow;
export const getIsMyListFilmsLoading = (state: State): boolean => state[NameSpace.Films].isMyListFilmsLoading;
export const getCurrentGenre = (state: State): string => state[NameSpace.Films].genre;
export const getMyListFilms = (state: State): Films => state[NameSpace.Films].myListFilms;
export const getFilteredFilms = (state: State): Films => state[NameSpace.Films].filteredFilms;
export const getFilteredFilmsLength = (state: State): number => state[NameSpace.Films].filteredFilms.length;
