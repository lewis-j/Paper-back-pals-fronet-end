import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentFriend: "",
  friendsList: [],
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
