import { faRProject } from "@fortawesome/free-brands-svg-icons";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as firebase from "../../network/firebase";
import * as status from "../status";

const rejectionReducer = (state, action) => {
  console.log("failed action", action);
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

export const fetchUser = createAsyncThunk("user/fetchUser", firebase.fetchUser);

export const registerUser = createAsyncThunk(
  "user/createUser",
  firebase.registerWithEmailAndPassword
);

export const loginGoogle = createAsyncThunk(
  "user/googleLogin",
  firebase.loginGoogle
);

export const loginWithForm = createAsyncThunk(
  "user/FormLogin",
  firebase.loginWithForm
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    status: status.IDLE,
    error: null,
  },
  reducers: {
    resetStatus: (state) => {
      state.status = status.IDLE;
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
    [fetchUser.rejected]: rejectionReducer,
    [fetchUser.fulfilled]: fulfilledReducer,
  },
});

export const { resetStatus } = userSlice.actions;

export default userSlice.reducer;
