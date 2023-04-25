import { NameSpace } from '../../../const';
import { Comments } from '../../../types/comments-type';
import { State } from '../../../types/state-type';

export const getComments = (state: State): Comments | null => state[NameSpace.Comments].comments;
export const getIsCommentsLoading = (state: State): boolean => state[NameSpace.Comments].isCommentsLoading;
export const getIsCommentSending = (state: State): boolean => state[NameSpace.Comments].isCommentSending;
