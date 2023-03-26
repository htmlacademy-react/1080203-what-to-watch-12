import { Film } from './types/film-type';
import { mockFilms } from './mocks/films';

function getFilmById(filmId: string|undefined): Film|undefined {
  return mockFilms.find((film) => filmId !== undefined ? film.id === +filmId : undefined);
}

function convertMinutesToHouersAndMinutes(minutes: number | undefined) {
  const h = minutes !== undefined ? Math.floor(minutes / 60) : '';
  const m = minutes !== undefined ? Math.floor(minutes % 60) : '';

  const hDisplay = h > 0 ? `${h}h` : '';
  const mDisplay = m > 0 ? `${m}m` : '';

  return hDisplay + mDisplay;
}

function isOdd(number: number) {
  return number % 2 === 0;
}

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export {
  getFilmById,
  convertMinutesToHouersAndMinutes,
  isOdd,
  capitalizeFirstLetter
};
