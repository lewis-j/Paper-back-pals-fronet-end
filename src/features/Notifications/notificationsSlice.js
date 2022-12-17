import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as status from "../../data/asyncStatus";
import { setExtraReducer } from "../../utilities/reduxUtil";
import * as notificationsApi from "./notificationsApi";

const fetchNotifications = createAsyncThunk(
  "notifications/fetch",
  notificationsApi.fetchNotifications
);

const fetchNotificationsSuccess = (state, action) => {
  state.list = action.payload.notifications;
};

const markAsRead = createAsyncThunk(
  "notification/markAsRead",
  notificationsApi.markAsRead
);

const markAsReadSuccess = (state, action) => {
  const { notification } = action.payload;

  const notificationList = state.list;
  const idx = notificationList.findIndex(
    (_notification) => _notification._id === notification._id
  );

  state.list[idx] = notification;
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
      state.list.unshift(action.payload.notification);
    },
  },
  extraReducers: {
    ...setExtraReducer(fetchNotifications, fetchNotificationsSuccess),
    ...setExtraReducer(markAsRead, markAsReadSuccess),
  },
});

export { fetchNotifications, markAsRead };

export const { setNotifications, addNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
