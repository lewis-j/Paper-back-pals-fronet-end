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

const sendFriendRequest = createAsyncThunk(
  "friends/sendFriendRequest",
  friendsApi.requestFriend
);

const sendFriendRequestFullfilled = (state, { payload: { reciever_id } }) => {
  state.friendRequestOutbox = [
    ...state.friendRequestOutbox,
    { reciever: { _id: reciever_id } },
  ];
  state.status = status.SUCCEEDED;
  state.error = null;
};

const acceptFriendRequest = createAsyncThunk(
  "friends/acceptFriendRequest",
  friendsApi.addFriendFromRequest
);

const acceptFriendRequestFullfilled = (state, { payload: { friend } }) => {
  state.friendsList.push(friend);
  state.status = status.SUCCEEDED;
  state.error = null;
};
const getUserData = createAsyncThunk(
  "friends/getUserData",
  friendsApi.getUserData
);

const getUserDataFullfilled = (state, { payload }) => {
  state.currentFriend = payload;
  state.status = status.SUCCEEDED;
  state.error = null;
};

const initialState = {
  currentFriend: null,
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
    [acceptFriendRequest.fulfilled]: acceptFriendRequestFullfilled,
    [getUserData.pending]: pendingReducer,
    [getUserData.rejected]: rejectionReducer,
    [getUserData.fulfilled]: getUserDataFullfilled,
  },
});

export const {
  setCurrentFriend,
  setFriends,
  setFriendRequestInbox,
  setFriendRequestOutbox,
} = friendsSlice.actions;

export { sendFriendRequest, acceptFriendRequest, getUserData };

export default friendsSlice.reducer;
