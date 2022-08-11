import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as status from "../../data/status";
import { setExtraReducer } from "../../utilities/reduxUtil";
import * as notificationsApi from "./notificationsApi";

const fetchNotifications = createAsyncThunk(
  "notifications/fetch",
  notificationsApi.fetchNotifications
);

const fetchNotificationsSuccess = (state, action) => {
  state.list = action.payload.notifications;
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    list: [],
    status: status.IDLE,
    error: null,
  },
  reducers: {
    setNotifications: (state, action) => {
      state.list = action.payload.notifications;
    },
    addNotification: (state, action) => {
      state.list.push(action.payload.notification);
    },
  },
  extraReducers: {
    ...setExtraReducer(fetchNotifications, fetchNotificationsSuccess),
  },
});

export { fetchNotifications };

export const { setNotifications, addNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
