import { Film } from './types/films-type';
import { GetFilmByIdType } from './types/get-film-by-id-type';
import { SYMBOLS } from './const';

function getFilmById({ films, filmId }: GetFilmByIdType): Film|undefined {
  return films.find((film) => filmId ? film.id === +filmId : undefined);
}

function convertMinutesToHouersAndMinutes(minutes: number | undefined) {
  const h = minutes !== undefined ? Math.floor(minutes / 60) : 0;
  const m = minutes !== undefined ? Math.floor(minutes % 60) : 0;

  const hDisplay = h > 0 ? `${h}h` : SYMBOLS.EMPTY;
  const mDisplay = m > 0 ? `${m}m` : SYMBOLS.EMPTY;

  return hDisplay + mDisplay;
}

function isOdd(number: number) {
  return number % 2 === 0;
}

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function removeLastSlash(string: string | undefined) {
  if (string && string.charAt(string.length - 1) === SYMBOLS.SLASH) {
    string = string.slice(0, string.length - 1);
  }

  return string;
}

export {
  getFilmById,
  convertMinutesToHouersAndMinutes,
  isOdd,
  capitalizeFirstLetter,
  removeLastSlash
};
