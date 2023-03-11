import { Film } from './types/film-type';
import { mockFilms } from './mocks/films';


function getFilmById(filmId: string|undefined): Film|undefined {
  return mockFilms.find((film) => filmId !== undefined ? film.id === +filmId : undefined);
}

export { getFilmById };
