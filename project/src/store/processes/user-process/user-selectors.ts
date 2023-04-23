import { AuthStatuses, NameSpace } from '../../../const';
import { State } from '../../../types/state-type';

export const getAuthorizationStatus = (state: State): AuthStatuses => state[NameSpace.User].authorizationStatus;
