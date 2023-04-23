import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, AuthStatuses } from '../../../const';
import { UserProcess } from '../../../types/state-type';
import { checkAuthAction, loginAction } from '../../api-actions';
import { dropToken, saveToken } from '../../../services/token';

const initialState: UserProcess = {
  authorizationStatus: AuthStatuses.Unknown
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    logout: (state) => {
      state.authorizationStatus = AuthStatuses.NoAuth;
      dropToken();
    }
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authorizationStatus = AuthStatuses.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthStatuses.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthStatuses.Auth;

        saveToken(action.payload);
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthStatuses.NoAuth;
      });
  }
});

export const { logout } = userProcess.actions;
