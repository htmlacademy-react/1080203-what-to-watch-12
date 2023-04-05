import { createAction } from '@reduxjs/toolkit';
import { Films } from '../types/film-type';

// todo Вынести в типы
type AuthorizationStatus = string;

export const changeGenre = createAction<{ genre: string }>('changeGenre');

export const showMoreFilms = createAction('showMoreFilms');

export const resetFilmsCount = createAction<boolean>('resetFilmsCount');

export const getFilms = createAction<Films>('getFilms');

export const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');

export const setError = createAction<string | null>('setError');
