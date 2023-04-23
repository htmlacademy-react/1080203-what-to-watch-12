import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../const';
import { CommentsProcess } from '../../../types/state-type';
import {
  getFilmCommentsdAction,
  sendCommentAction
} from '../../api-actions';

const initialState: CommentsProcess = {
  comments: null,
  isCommentsLoading: true
};

export const commentsProcess = createSlice({
  name: NameSpace.Films,
  initialState,
  reducers: {
    resetIsCommentsLoading: (state) => {
      state.isCommentsLoading = true;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getFilmCommentsdAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isCommentsLoading = false;
      })
      .addCase(sendCommentAction.fulfilled, (state, action) => {
        state.comments = action.payload;
      });
  }
});

export const { resetIsCommentsLoading } = commentsProcess.actions;
