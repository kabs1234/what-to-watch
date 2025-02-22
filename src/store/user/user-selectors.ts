import { NameSpace } from '../../const';
import { State } from '../../types/store';

export const getAuthorizationStatus = (state: State) =>
  state[NameSpace.User].authorizationStatus;

export const getUser = (state: State) => state[NameSpace.User].user;
