import { AxiosInstance } from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { InitialState } from '../types/initial-state-type';
import { AppDispatch } from '../types/state-type';
import { Films, Film } from '../types/films-type';
import { APIRoutes, AppRoutes, FilmTabHashes } from '../const';
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
  redirectToRoute,
  sendComment,
  getMyListFilms
} from './actions';
import { Comments } from '../types/comments-type';
import { FilmNewReview } from '../types/film-new-review-type';

export const getFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: InitialState;
  extra: AxiosInstance;
}
>
(
  'getFilmsAction',
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
  'getFilmByIdAction',
  async (id, { dispatch, extra: api }) => {
    try {
      const result = await api.get<Film>(generatePath(APIRoutes.Film, { id }));
      dispatch(getSingleFilm(result.data));
    } catch (error) {
      dispatch(redirectToRoute(AppRoutes.NotFound));
    }
  }
);

export const getPromoFilmAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: InitialState;
  extra: AxiosInstance;
}
>
(
  'getPromoFilmAction',
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
  'getSimilarFilmsAction',
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
  'clearErrorAction',
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
  'checkAuthAction',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get(APIRoutes.Login);

      dispatch(requireAuthorization(AuthStatus.Auth));
      dispatch(getMyListFilmsAction());
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
  'loginAction',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data: { token } } = await api.post<UserData>(APIRoutes.Login, { email, password });

    saveToken(token);

    dispatch(requireAuthorization(AuthStatus.Auth));
    dispatch(getMyListFilmsAction());
  }
);

export const sendCommentAction = createAsyncThunk<void, FilmNewReview, {
  dispatch: AppDispatch;
  state: InitialState;
  extra: AxiosInstance;
}
>
(
  'sendCommentAction',
  async ({ id, rating, comment }, { dispatch, extra: api }) => {

    if (id) {
      const { data } = await api.post<Comments>(generatePath(APIRoutes.Comments, { id }), { rating, comment });

      dispatch(redirectToRoute(generatePath(AppRoutes.Tabs, { id, tabhash: FilmTabHashes.Reviews })));
      dispatch(sendComment(data));
    }
  }
);

export const getMyListFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: InitialState;
  extra: AxiosInstance;
}
>
(
  'getMyListFilmsAction',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Films>(APIRoutes.Favorite);

    dispatch(getMyListFilms(data));
  }
);

export const addFilmInMyListAction = createAsyncThunk<void, { id: string | undefined; status: string }, {
  dispatch: AppDispatch;
  state: InitialState;
  extra: AxiosInstance;
}
>
(
  'addFilmInMyListAction',
  async ({ id, status }, { dispatch, extra: api }) => {

    if (id) {
      await api.post<Films>(generatePath(APIRoutes.AddToFavorite, { id, status }));

      dispatch(getMyListFilmsAction());
    }
  }
);
