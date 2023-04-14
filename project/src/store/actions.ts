import { createAction } from '@reduxjs/toolkit';
import { Films, Film } from '../types/films-type';
import { AuthorizationStatus } from '../types/authorization-status-type';
import { Comments } from '../types/comments-type';
import { AppRoutes } from '../const';

export const changeGenre = createAction<{ genre: string }>('changeGenre');

export const showMoreFilms = createAction('showMoreFilms');

export const resetFilmsCount = createAction<boolean>('resetFilmsCount');

export const getFilms = createAction<Films>('getFilms');

export const getSingleFilm = createAction<Film>('getSingleFilm');

export const getSimilarFilms = createAction<Films>('getSimilarFilms');

export const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');

export const setError = createAction<string | null>('setError');

export const logout = createAction('logout');

export const resetIsSingleFilmLoading = createAction('resetIsSingleFilmLoading');

export const getPromoFilm = createAction<Film>('getPromoFilm');

export const getFilmComments = createAction<Comments>('getFilmComments');

export const resetIsCommentsLoading = createAction('resetIsCommentsLoading');

export const redirectToRoute = createAction<AppRoutes | string>('redirectToRoute');

export const sendReview = createAction<Comments>('sendReview');

export const getMyListFilms = createAction<Films>('getMyListFilms');
