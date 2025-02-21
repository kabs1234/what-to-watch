import { AuthorizationStatus } from '../../const';
import { userMock } from '../../mocks/stub';
import { signInCheckAction, signInAction, signOutAction } from './user-thunks';
import { userSlice } from './user.slice';

const reducer = userSlice.reducer;
describe('Reducer slice: User', () => {
  it('should setup logged settings on signInCheckAction success', () => {
    const user = userMock;

    const state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
    };

    expect(
      reducer(state, { type: signInCheckAction.fulfilled.type, payload: user })
    ).toEqual({
      authorizationStatus: AuthorizationStatus.Authorized,
      user: user,
    });
  });
  it('should set not authorized settings on signInCheckAction fail', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
    };

    expect(reducer(state, { type: signInCheckAction.rejected.type })).toEqual({
      authorizationStatus: AuthorizationStatus.NotAuthorized,
      user: null,
    });
  });
  it('should setup logged settings on signInAction success', () => {
    const user = userMock;

    const state = {
      authorizationStatus: AuthorizationStatus.NotAuthorized,
      user: null,
    };

    expect(
      reducer(state, { type: signInAction.fulfilled.type, payload: user })
    ).toEqual({
      authorizationStatus: AuthorizationStatus.Authorized,
      user: user,
    });
  });
  it('should setup logged out settings on signOutAction success', () => {
    const user = userMock;

    const state = {
      authorizationStatus: AuthorizationStatus.Authorized,
      user: user,
    };

    expect(reducer(state, { type: signOutAction.fulfilled.type })).toEqual({
      authorizationStatus: AuthorizationStatus.NotAuthorized,
      user: null,
    });
  });
});
