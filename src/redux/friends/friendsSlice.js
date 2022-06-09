import { createSlice } from "@reduxjs/toolkit";
import * as status from "../status";

const initialState = {
  currentFriend: "",
  friendsList: [],
  status: status.IDLE,
  error: null,
};

const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    setCurrentFriend: (state, action) => {
      console.log("action.payload", action.payload);
      state.currentFriend = action.payload;
    },
    setFriends: (state, action) => {
      console.log("action.payload", action.payload);
      state.friendsList = action.payload;
    },
  },
});

export const { setCurrentFriend, setFriends } = friendsSlice.actions;

export default friendsSlice.reducer;
