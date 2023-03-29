import { createAction } from '@reduxjs/toolkit';

export const changeGenre = createAction<{ genre: string }>('changeGenre');

export const showMoreFilms = createAction('showMoreFilms');

export const resetFilmsCount = createAction('resetFilmsCount');
