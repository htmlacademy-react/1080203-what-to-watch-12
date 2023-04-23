import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { filmsProcess } from './processes/films-process/films-process';
import { commentsProcess } from './processes/comments-process/comments-process';
import { userProcess } from './processes/user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Films]: filmsProcess.reducer,
  [NameSpace.Comments]: commentsProcess.reducer
});
