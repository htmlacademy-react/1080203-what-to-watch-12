import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, showMoreFilms, resetFilmsCount, getFilms, requireAuthorization, setError } from './actions';
import { FilterFilmsByGenreType } from '../types/filter-films-by-genre-type';
import { GENRES, FILMS_COUNT_STEP, AuthStatus } from '../const';
import { InitialState } from '../types/initial-state-type';

const initialState: InitialState = {
  genre: GENRES.ALL.NAME,
  sourceFilms: [],
  filteredFilms: [],
  maxToShow: FILMS_COUNT_STEP,
  authorizationStatus: AuthStatus.Auth,
  error: null
};

const filterFilmsByGenre = ({ films, genre }: FilterFilmsByGenreType) => films.filter((film) => genre ? film.genre === genre : film);

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      const currentGenre = action.payload.genre;

      state.genre = currentGenre;
      state.filteredFilms = filterFilmsByGenre({ films: [...state.sourceFilms], genre: currentGenre });
    })
    .addCase(showMoreFilms, (state) => {
      state.maxToShow += FILMS_COUNT_STEP;
    })
    .addCase(resetFilmsCount, (state, action) => {
      if (action.payload) {
        state.maxToShow = FILMS_COUNT_STEP;
      }
    })
    .addCase(getFilms, (state, action) => {
      if (action.payload) {
        state.sourceFilms = action.payload;
        state.filteredFilms = [...action.payload];
      }
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export { reducer };
