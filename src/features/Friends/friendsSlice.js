import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as status from "../../data/status";
import * as friendsApi from "./friendsApi";
import * as userBookService from "../library/userBookCalls";

const rejectionReducer = (state, action) => {
  console.log("failed action", action);
  state.status = status.FAILED;
  state.error = action.error.message;
};

const pendingReducer = (state) => {
  state.status = status.LOADING;
  state.error = null;
};

// const fulfilledReducer = (state, { payload: { user } }) => {
//   console.log("fulffilled user action: ", user);
//   state.status = status.SUCCEEDED;
//   state.error = null;
// };

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

const createBookRequest = createAsyncThunk(
  "userBooks/createRequest",
  userBookService.createBookRequest
);

const createBookRequestFulfilled = (state, { payload }) => {
  const {
    currentFriend: { ownedBooks },
  } = state;
  const { userRequest_id, userBook_id } = payload;
  const bookIndex = ownedBooks.findIndex(
    (userBook) => userBook._id === userBook_id
  );
  const _userBook = ownedBooks[bookIndex];
  ownedBooks[bookIndex] = {
    ..._userBook,
    request: [..._userBook.request, { _id: userRequest_id }],
  };
  state.status = status.SUCCEEDED;
};

const acceptFriendRequestFullfilled = (
  state,
  { payload: { friend, request_id } }
) => {
  console.table({ request_id, friend });

  state.friendsList.push(friend);
  state.friendRequestInbox = state.friendRequestInbox.filter(
    ({ _id }) => _id !== request_id
  );
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
    addRequestToCurrentFriend: (state, { payload }) => {
      console.log(
        "*****************************************",
        "payload",
        payload,
        "*****************************************"
      );

      const { userRequest_id, userBook_id } = payload;

      const newRequest = state.currentFriend?.ownedBooks.map((userBook) =>
        userBook._id === userBook_id
          ? { ...userBook, request: [...userBook.request, userRequest_id] }
          : userBook
      );
      state.currentFriend = {
        ...state.currentFriend,
        ownedBooks: [...newRequest],
      };
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
    [createBookRequest.pending]: pendingReducer,
    [createBookRequest.rejected]: rejectionReducer,
    [createBookRequest.fulfilled]: createBookRequestFulfilled,
  },
});

export const {
  setCurrentFriend,
  setFriends,
  setFriendRequestInbox,
  setFriendRequestOutbox,
  addRequestToCurrentFriend,
} = friendsSlice.actions;

export {
  sendFriendRequest,
  acceptFriendRequest,
  getUserData,
  createBookRequest,
};

export default friendsSlice.reducer;
