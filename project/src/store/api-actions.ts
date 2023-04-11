import { AxiosInstance } from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { InitialState } from '../types/initial-state-type';
import { AppDispatch } from '../types/state-type';
import { Films, Film } from '../types/films-type';
import { APIRoutes, AppRoutes } from '../const';
import { store } from './';
import { TIMEOUT_SHOW_ERROR } from '../const';
import { AuthStatus } from '../const';
import { AuthData } from '../types/auth-data-type';
import { UserData } from '../types/user-data-type';
import { saveToken } from '../services/token';
import { generatePath } from 'react-router-dom';
import {
  getFilms,
  setError,
  requireAuthorization,
  getSingleFilm,
  getSimilarFilms,
  getPromoFilm,
  getFilmComments,
  redirectToRoute
} from './actions';
import { Comments } from '../types/comments-type';

export const fetchGetFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: InitialState;
  extra: AxiosInstance;
}
>
(
  'getFilms',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Films>(APIRoutes.Films);
    dispatch(getFilms(data));
  }
);

export const getFilmByIdAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: InitialState;
  extra: AxiosInstance;
}
>
(
  'getFilmById',
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.get<Film>(generatePath(APIRoutes.Film, { id }));

    dispatch(getSingleFilm(data));
    dispatch(redirectToRoute(AppRoutes.NotFound));
  }
);

export const getPromoFilmAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: InitialState;
  extra: AxiosInstance;
}
>
(
  'getPromoFilmAction', // todo Переделать все названия
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Film>(APIRoutes.Promo);

    dispatch(getPromoFilm(data));
  }
);

export const getSimilarFilmsdAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: InitialState;
  extra: AxiosInstance;
}
>
(
  'getSimilarFilms',
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.get<Films>(generatePath(APIRoutes.Similar, { id }));

    dispatch(getSimilarFilms(data));
  }
);

export const getFilmCommentsdAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: InitialState;
  extra: AxiosInstance;
}
>
(
  'getFilmCommentsdAction',
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.get<Comments>(generatePath(APIRoutes.Comments, { id }));

    dispatch(getFilmComments(data));
  }
);

export const clearErrorAction = createAsyncThunk(
  'clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: InitialState;
  extra: AxiosInstance;
}
>
(
  'checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get(APIRoutes.Login);

      dispatch(requireAuthorization(AuthStatus.Auth));
    } catch(err) {
      dispatch(requireAuthorization(AuthStatus.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: InitialState;
  extra: AxiosInstance;
}
>
(
  'login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data: { token } } = await api.post<UserData>(APIRoutes.Login, { email, password });

    saveToken(token);

    dispatch(requireAuthorization(AuthStatus.Auth));
  }
);
