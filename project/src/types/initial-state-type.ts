import { Films } from '../types/film-type';

export type InitialState = {
  genre: string;
  sourceFilms: Films;
  filteredFilms: Films;
  maxToShow: number;
  authorizationStatus: string;
  error: string | null;
};
