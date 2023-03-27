import { createReducer } from '@reduxjs/toolkit';
import { changeGenre } from './actions';
import { mockFilms } from '../mocks/films';
import { FilterFilmsByGenreType } from '../types/filter-films-by-genre-type';
import { GENRES } from '../const';

const initialState = {
  genre: GENRES.ALL.NAME,
  films: mockFilms
};

const filterFilmsByGenre = ({ films, genre }: FilterFilmsByGenreType) => films.filter((film) => genre ? film.genre === genre : film);

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      const currentGenre = action.payload.genre;

      state.genre = currentGenre;
      state.films = filterFilmsByGenre({ films: mockFilms, genre: currentGenre });
    });
});

export { reducer };
