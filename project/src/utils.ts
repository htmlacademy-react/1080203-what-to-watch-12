import { Film } from './types/films-type';
import { GetFilmByIdType } from './types/get-film-by-id-type';
import { CONTAINS_DIGIT_REGEXP, CONTAINS_LETTER_REGEXP, EMAIL_REGEXP, Symbols, TimeInSeconds } from './const';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { FilterFilmsByGenreType } from './types/filter-films-by-genre-type';

dayjs.extend(duration);

function getFilmById({ films, filmId }: GetFilmByIdType): Film|undefined {
  return films.find((film) => filmId ? film.id === +filmId : undefined);
}

function convertMinutesToHouersAndMinutes(minutes: number | undefined) {
  const h = minutes !== undefined ? Math.floor(minutes / 60) : 0;
  const m = minutes !== undefined ? Math.floor(minutes % 60) : 0;

  const hDisplay = h > 0 ? `${h}h` : Symbols.Empty;
  const mDisplay = m > 0 ? `${m}m` : Symbols.Empty;

  return hDisplay + mDisplay;
}

function isOdd(number: number) {
  return number % 2 === 0;
}

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function removeLastSlash(string: string | undefined) {
  if (string && string.charAt(string.length - 1) === Symbols.Slash) {
    string = string.slice(0, string.length - 1);
  }

  return string;
}

function convertSecondsToTime(time: number | null) {
  if (!time) {
    time = 0;
  }

  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  let filmDuration = '';

  switch (true) {
    case (time >= TimeInSeconds.Hour):
      hours = Math.trunc(time / TimeInSeconds.Hour);
      minutes = Math.trunc((time - hours * TimeInSeconds.Hour) / TimeInSeconds.Minute);
      seconds = time - (minutes * TimeInSeconds.Minute) - (hours * TimeInSeconds.Hour);

      filmDuration = dayjs.duration({ seconds, minutes, hours }).format('HH:mm:ss');
      break;
    case (time < TimeInSeconds.Hour):
      minutes = Math.trunc(time / TimeInSeconds.Minute);
      seconds = time - (minutes * TimeInSeconds.Minute) - (hours * TimeInSeconds.Hour);

      filmDuration = dayjs.duration({ seconds, minutes }).format('mm:ss');
      break;
  }

  return filmDuration;
}

function filterFilmsByGenre({ films, genre }: FilterFilmsByGenreType) {
  return films.filter((film) => genre ? film.genre === genre : film);
}

function isEmail(email: string | undefined | null) {
  if (!email) {
    return;
  }

  return EMAIL_REGEXP.test(email.toLowerCase());
}

function isPassword(password: string | undefined | null) {
  if (!password) {
    return;
  }

  return (CONTAINS_DIGIT_REGEXP.test(password) && CONTAINS_LETTER_REGEXP.test(password));
}

export {
  getFilmById,
  convertMinutesToHouersAndMinutes,
  isOdd,
  capitalizeFirstLetter,
  removeLastSlash,
  convertSecondsToTime,
  filterFilmsByGenre,
  isEmail,
  isPassword
};
