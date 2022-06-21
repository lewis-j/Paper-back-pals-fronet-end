import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as status from "../status";
import * as friendsApi from "./friendsApi";

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
  console.log("fulffilled user action: ", user);
  state.status = status.SUCCEEDED;
  state.error = null;
};

const sendFriendRequestFullfilled = (state, { payload: { reciever_id } }) => {
  console.log("fulffilled reciever_id action: ", reciever_id);
  state.friendRequestOutbox = [
    ...state.friendRequestOutbox,
    { reciever: { _id: reciever_id } },
  ];
  state.status = status.SUCCEEDED;
  state.error = null;
};

export const sendFriendRequest = createAsyncThunk(
  "friends/sendFriendRequest",
  friendsApi.requestFriend
);

export const acceptFriendRequest = createAsyncThunk(
  "friends/acceptFriendRequest",
  friendsApi.addFriendFromRequest
);

const initialState = {
  currentFriend: "",
  friendsList: [],
  friendRequestOutbox: [],
  friendRequestInbox: [],
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
      state.friendsList = action.payload.friends;
    },
    setFriendRequestInbox: (state, action) => {
      state.friendRequestInbox = action.payload.friendRequestInbox;
    },
    setFriendRequestOutbox: (state, action) => {
      state.friendRequestOutbox = action.payload.friendRequestOutbox;
    },
  },
  extraReducers: {
    [sendFriendRequest.pending]: pendingReducer,
    [sendFriendRequest.rejected]: rejectionReducer,
    [sendFriendRequest.fulfilled]: sendFriendRequestFullfilled,
    [acceptFriendRequest.pending]: pendingReducer,
    [acceptFriendRequest.rejected]: rejectionReducer,
    [acceptFriendRequest.fulfilled]: fulfilledReducer,
  },
});

export const {
  setCurrentFriend,
  setFriends,
  setFriendRequestInbox,
  setFriendRequestOutbox,
} = friendsSlice.actions;

export default friendsSlice.reducer;
