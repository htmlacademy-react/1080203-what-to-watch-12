import { AxiosInstance } from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { State } from '../types/state-type';
import { AppDispatch } from '../types/state-type';
import { Films, Film } from '../types/films-type';
import { APIRoutes, AppRoutes, FilmTabHashes } from '../const';
import { AuthData } from '../types/auth-data-type';
import { UserData } from '../types/user-data-type';
import { Token } from '../types/token-type';
import { generatePath } from 'react-router-dom';
import { Comments } from '../types/comments-type';
import { FilmNewReview } from '../types/film-new-review-type';
import { redirectToRoute } from './actions';

export const getFilmsAction = createAsyncThunk<Films, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>
(
  'getFilmsAction',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Films>(APIRoutes.Films);

    return data;
  }
);

export const getSingleFilmAction = createAsyncThunk<Film, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>
(
  'getSingleFilmAction',
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.get<Film>(generatePath(APIRoutes.Film, { id }));

    return data;
  }
);

export const getPromoFilmAction = createAsyncThunk<Film, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>
(
  'getPromoFilmAction',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Film>(APIRoutes.Promo);

    return data;
  }
);

export const getSimilarFilmsAction = createAsyncThunk<Films, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>
(
  'getSimilarFilmsAction',
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.get<Films>(generatePath(APIRoutes.Similar, { id }));

    return data;
  }
);

export const getFilmCommentsdAction = createAsyncThunk<Comments, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>
(
  'getFilmCommentsdAction',
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.get<Comments>(generatePath(APIRoutes.Comments, { id }));

    return data;
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>
(
  'checkAuthAction',
  async (_arg, { dispatch, extra: api }) => {
    await api.get(APIRoutes.Login);
  }
);

export const loginAction = createAsyncThunk<Token, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>
(
  'loginAction',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data: { token } } = await api.post<UserData>(APIRoutes.Login, { email, password });

    return token;
  }
);

export const sendCommentAction = createAsyncThunk<Comments, FilmNewReview, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>
(
  'sendCommentAction',
  async ({ id, rating, comment }, { dispatch, extra: api }) => {
    if (id) {
      const { data } = await api.post<Comments>(generatePath(APIRoutes.Comments, { id }), { rating, comment });

      dispatch(redirectToRoute(generatePath(AppRoutes.Tabs, { id, tabhash: FilmTabHashes.Reviews })));

      return data;
    }

    return [];
  }
);

export const getMyListFilmsAction = createAsyncThunk<Films, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>
(
  'getMyListFilmsAction',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Films>(APIRoutes.Favorite);

    return data;
  }
);

export const addFilmInMyListAction = createAsyncThunk<Films, { id: string | undefined; status: string }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>
(
  'addFilmInMyListAction',
  async ({ id, status }, { dispatch, extra: api }) => {
    if (id) {
      await api.post<Film>(generatePath(APIRoutes.AddToFavorite, { id, status }));

      const { data } = await api.get<Films>(APIRoutes.Favorite);

      return data;
    }

    return [];
  }
);
