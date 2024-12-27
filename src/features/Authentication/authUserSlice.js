import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as asyncActions from "./userAuth";
import * as status from "../../data/asyncStatus";
import { setExtraReducer } from "../../utilities/reduxUtil";

// Initial state
const initialState = {
  currentUser: null,
  status: status.IDLE,
  error: null,
};

// Common reducers
const fulfilledReducer = (state, { payload: { user } }) => {
  state.status = status.SUCCEEDED;
  state.error = null;
  state.currentUser = user;
};

// Async thunks and their reducers
// 1. Fetch User
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  asyncActions.fetchUser
);

const fetchUserReducer = setExtraReducer(fetchUser, fulfilledReducer);

// 2. Register User
export const registerUser = createAsyncThunk(
  "user/createUser",
  asyncActions.registerUser
);
const registerUserReducer = setExtraReducer(registerUser, fulfilledReducer);

// 3. Google Login
export const loginGoogle = createAsyncThunk(
  "user/googleLogin",
  asyncActions.loginWithGoogle
);
const loginGoogleReducer = setExtraReducer(loginGoogle, fulfilledReducer);

// 4. Form Login
export const loginWithForm = createAsyncThunk(
  "user/FormLogin",
  asyncActions.loginWithForm
);
const loginWithFormReducer = setExtraReducer(loginWithForm, fulfilledReducer);

// 5. Logout
export const logout = createAsyncThunk("user/logout", asyncActions.logout);
const logoutReducer = setExtraReducer(logout, (state) => {
  state.currentUser = null;
  state.status = status.SUCCEEDED;
});

// Slice definition
export const authUserSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    removeAuthUser: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: {
    ...registerUserReducer,
    ...loginGoogleReducer,
    ...loginWithFormReducer,
    ...logoutReducer,
    ...fetchUserReducer,
  },
});

// Exports
export const { removeAuthUser } = authUserSlice.actions;
export default authUserSlice.reducer;
