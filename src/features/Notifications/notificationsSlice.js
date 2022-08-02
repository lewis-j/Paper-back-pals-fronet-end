import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as status from "../../data/status";
import * as notificationsApi from "./notificationsApi";

const rejectionReducer = (state, action) => {
  state.status = status.FAILED;
  state.error = action.error.message;
  console.error(action.error.message);
};

const pendingReducer = (state) => {
  state.status = status.LOADING;
};

const setSuccessState = (state) => {
  state.status = status.SUCCEEDED;
  state.error = null;
};

const setExtraReducer = (asyncThunk, fulfilledReducer) => {
  return {
    [asyncThunk.fulfilled]: fulfilledReducer,
    [asyncThunk.rejected]: rejectionReducer,
    [asyncThunk.pending]: pendingReducer,
  };
};

const createNotificationsSuccess = (state, action) => {
  state.list.push(action.payload.notification);
  setSuccessState(state);
};

const createNotifications = createAsyncThunk(
  "notifications/createNotifications",
  notificationsApi.createNotifications
);

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    list: null,
    status: status.IDLE,
    error: null,
  },
  reducers: {
    setNotifications: (state, action) => {
      state.list = action.payload.notifications;
    },
  },
  extraReducers: {
    ...setExtraReducer(createNotifications, createNotificationsSuccess),
  },
});

export { createNotifications };
export const { setNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;
