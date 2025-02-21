import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import { User } from '../../types/general';
import { signInCheckAction, signInAction, signOutAction } from './user-thunks';

type UserSlice = {
  authorizationStatus: AuthorizationStatus;
  user: User | null;
};

const initialState: UserSlice = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(
        signInCheckAction.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.authorizationStatus = AuthorizationStatus.Authorized;
          state.user = action.payload;
        }
      )
      .addCase(signInCheckAction.rejected, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.NotAuthorized;
        state.user = null;
      })
      .addCase(signInAction.fulfilled, (state, action: PayloadAction<User>) => {
        state.authorizationStatus = AuthorizationStatus.Authorized;
        state.user = action.payload;
      })
      .addCase(signOutAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.NotAuthorized;
        state.user = null;
      });
  },
});
