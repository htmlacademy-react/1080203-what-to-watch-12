import { AxiosInstance } from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { InitialState } from '../types/initial-state-type';
import { AppDispatch } from '../types/state-type';
import { Films } from '../types/film-type';
import { getFilms, setError } from './actions';
import { APIRoutes } from '../const';
import { store } from './';
import { TIMEOUT_SHOW_ERROR } from '../const';
import { AuthStatus } from '../const';
import { requireAuthorization } from './actions';
import { AuthData } from '../types/auth-data-type';
import { UserData } from '../types/user-data-type';
import { saveToken } from '../services/token';

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
