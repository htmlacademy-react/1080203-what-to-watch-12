import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace, GENRES, FILMS_COUNT_STEP } from '../../../const';
import { FilmsProcess } from '../../../types/state-type';
import { filterFilmsByGenre } from '../../../utils';
import {
  getFilmsAction,
  getPromoFilmAction,
  getSingleFilmAction,
  getSimilarFilmsAction,
  getMyListFilmsAction,
  addFilmInMyListAction
} from '../../api-actions';

const initialState: FilmsProcess = {
  genre: GENRES.ALL.NAME,
  sourceFilms: [],
  promoFilm: null,
  filteredFilms: [],
  singleFilm: null,
  isSingleFilmLoading: true,
  similarFilms: [],
  myListFilms: [],
  isMyListFilmsLoading: true,
  maxToShow: FILMS_COUNT_STEP
};

export const filmsProcess = createSlice({
  name: NameSpace.Films,
  initialState,
  reducers: {
    changeGenre: (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
      state.filteredFilms = filterFilmsByGenre({ films: [...state.sourceFilms], genre: action.payload });
    },
    showMoreFilms: (state) => {
      state.maxToShow += FILMS_COUNT_STEP;
    },
    resetIsSingleFilmLoading: (state) => {
      state.isSingleFilmLoading = true;
    },
    resetFilmsCount: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        state.maxToShow = FILMS_COUNT_STEP;
      }
    },
    resetMyListFilms: (state) => {
      state.myListFilms = [];
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getFilmsAction.fulfilled, (state, action) => {
        state.sourceFilms = action.payload;
        state.filteredFilms = [...action.payload];
      })
      .addCase(getPromoFilmAction.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
      })
      .addCase(getSingleFilmAction.fulfilled, (state, action) => {
        state.singleFilm = action.payload;
        state.isSingleFilmLoading = false;
      })
      .addCase(getSingleFilmAction.rejected, (state) => {
        state.isSingleFilmLoading = false;
      })
      .addCase(getSimilarFilmsAction.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
      })
      .addCase(getMyListFilmsAction.fulfilled, (state, action) => {
        state.myListFilms = action.payload;
        state.isMyListFilmsLoading = false;
      })
      .addCase(addFilmInMyListAction.fulfilled, (state, action) => {
        state.myListFilms = action.payload;
        state.isMyListFilmsLoading = false;
      });
  }
});

export const {
  changeGenre,
  showMoreFilms,
  resetIsSingleFilmLoading,
  resetFilmsCount,
  resetMyListFilms
} = filmsProcess.actions;
