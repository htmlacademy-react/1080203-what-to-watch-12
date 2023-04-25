import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../const';
import { CommentsProcess } from '../../../types/state-type';
import {
  getFilmCommentsdAction,
  sendCommentAction
} from '../../api-actions';

const initialState: CommentsProcess = {
  comments: null,
  isCommentsLoading: true,
  isCommentSending: false
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
      .addCase(sendCommentAction.pending, (state) => {
        state.isCommentSending = true;
      })
      .addCase(sendCommentAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isCommentSending = false;
      })
      .addCase(sendCommentAction.rejected, (state) => {
        state.comments = null;
        state.isCommentSending = false;
      });
  }
});

export const { resetIsCommentsLoading } = commentsProcess.actions;
