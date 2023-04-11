import { createReducer } from '@reduxjs/toolkit';
import { FilterFilmsByGenreType } from '../types/filter-films-by-genre-type';
import { GENRES, FILMS_COUNT_STEP, AuthStatus } from '../const';
import { InitialState } from '../types/initial-state-type';
import { dropToken } from '../services/token';
import {
  changeGenre,
  showMoreFilms,
  resetFilmsCount,
  getFilms,
  requireAuthorization,
  setError,
  logout,
  getSingleFilm,
  resetIsSingleFilmLoading,
  getSimilarFilms,
  getPromoFilm,
  getFilmComments,
  resetIsCommentsLoading
} from './actions';

const initialState: InitialState = {
  genre: GENRES.ALL.NAME,
  sourceFilms: [],
  promoFilm: null,
  filteredFilms: [],
  singleFilm: null,
  isSingleFilmLoading: true,
  similarFilms: [],
  comments: null,
  isCommentsLoading: true,
  maxToShow: FILMS_COUNT_STEP,
  authorizationStatus: AuthStatus.Unknown,
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
    })
    .addCase(logout, (state) => {
      dropToken();
      state.authorizationStatus = AuthStatus.NoAuth;
    })
    .addCase(getSingleFilm, (state, action) => {
      if (action.payload) {
        state.singleFilm = action.payload;
        state.isSingleFilmLoading = false;
      }
    })
    .addCase(resetIsSingleFilmLoading, (state) => {
      state.isSingleFilmLoading = true;
    })
    .addCase(getSimilarFilms, (state, action) => {
      state.similarFilms = action.payload;
    })
    .addCase(getPromoFilm, (state, action) => {
      state.promoFilm = action.payload;
    })
    .addCase(getFilmComments, (state, action) => {
      state.comments = action.payload;
      state.isCommentsLoading = false;
    })
    .addCase(resetIsCommentsLoading, (state) => {
      state.isCommentsLoading = true;
    });
});

export { reducer };
