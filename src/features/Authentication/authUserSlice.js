import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as asyncActions from "./userAuth";
import * as status from "../../data/asyncStatus";

const rejectionReducer = (state, action) => {
  state.status = status.FAILED;
  state.error = action.error.message;
};

const pendingReducer = (state) => {
  state.status = status.LOADING;
  state.error = null;
};

const fulfilledReducer = (state, { payload: { user } }) => {
  state.status = status.SUCCEEDED;
  state.error = null;
  state.currentUser = user;
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  asyncActions.fetchUser
);

export const registerUser = createAsyncThunk(
  "user/createUser",
  asyncActions.registerUser
);

export const loginGoogle = createAsyncThunk(
  "user/googleLogin",
  asyncActions.loginWithGoogle
);

export const loginWithForm = createAsyncThunk(
  "user/FormLogin",
  asyncActions.loginWithForm
);

export const logout = createAsyncThunk("user/logout", asyncActions.logout);

export const authUserSlice = createSlice({
  name: "authUser",
  initialState: {
    currentUser: null,
    status: status.IDLE,
    error: null,
  },
  reducers: {
    removeAuthUser: (state, action) => {
      state.currentUser = null;
    },
  },
  extraReducers: {
    [registerUser.pending]: pendingReducer,
    [registerUser.rejected]: rejectionReducer,
    [registerUser.fulfilled]: fulfilledReducer,
    [loginGoogle.pending]: pendingReducer,
    [loginGoogle.rejected]: rejectionReducer,
    [loginGoogle.fulfilled]: fulfilledReducer,
    [loginWithForm.pending]: pendingReducer,
    [loginWithForm.rejected]: rejectionReducer,
    [loginWithForm.fulfilled]: fulfilledReducer,
    [fetchUser.pending]: pendingReducer,
    [fetchUser.rejected]: (state) => {
      state.status = status.FAILED;
    },
    [fetchUser.fulfilled]: fulfilledReducer,
    [logout.pending]: pendingReducer,
    [logout.fulfilled]: (state) => {
      state.currentUser = null;
      state.status = status.SUCCEEDED;
    },
  },
});

export const { removeAuthUser } = authUserSlice.actions;

export default authUserSlice.reducer;
