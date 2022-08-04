import { createSlice } from "@reduxjs/toolkit";
import * as status from "../../data/status";

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
    addNotification: (state, action) => {
      state.list.push(action.payload.notification);
    },
  },
});

export const { setNotifications, addNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
