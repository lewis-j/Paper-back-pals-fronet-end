import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as status from "../../data/asyncStatus";
import * as friendsApi from "./friendsApi";
import { setExtraReducer } from "../../utilities/reduxUtil";

const sendFriendRequest = createAsyncThunk(
  "friends/sendFriendRequest",
  friendsApi.requestFriend
);

const sendFriendRequestFullfilled = (state, { payload: { reciever_id } }) => {
  state.friendRequestOutbox = [
    ...state.friendRequestOutbox,
    { recipient: { _id: reciever_id } },
  ];
};

const acceptFriendRequest = createAsyncThunk(
  "friends/acceptFriendRequest",
  friendsApi.addFriendFromRequest
);

const acceptFriendRequestFullfilled = (
  state,
  { payload: { friend, request_id } }
) => {
  console.table({ request_id, friend });

  state.friendsList.push(friend);
  state.friendRequestInbox = state.friendRequestInbox.filter(
    ({ _id }) => _id !== request_id
  );
};
const getUserData = createAsyncThunk(
  "friends/getUserData",
  friendsApi.getUserData
);

const getUserDataFullfilled = (state, { payload }) => {
  state.currentFriend = payload;
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
      state.currentFriend = action.payload;
    },
    addRequestToCurrentFriend: (state, { payload }) => {
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
      state.friendsList = action.payload.friends;
    },
    setFriendRequestInbox: (state, action) => {
      state.friendRequestInbox = action.payload.friendRequestInbox;
    },
    setFriendRequestOutbox: (state, action) => {
      state.friendRequestOutbox = action.payload.friendRequestOutbox;
    },
    updateFriendsBookRequests: (state, { payload }) => {
      console.log("updateFriendsBookRequests", payload);
      const {
        currentFriend: { ownedBooks },
      } = state;
      const { bookRequest, userBook_id } = payload;
      const bookIndex = ownedBooks.findIndex(
        (userBook) => userBook._id === userBook_id
      );
      const _userBook = ownedBooks[bookIndex];
      ownedBooks[bookIndex] = {
        ..._userBook,
        request: [
          ..._userBook.request,
          {
            _id: bookRequest.request.request_id,
            status: bookRequest.request.status,
            dueDate: bookRequest.dueDate,
            currentPage: bookRequest.currentPage,
            sender: { _id: bookRequest.request.sender },
          },
        ],
      };
    },
  },
  extraReducers: {
    ...setExtraReducer(sendFriendRequest, sendFriendRequestFullfilled),
    ...setExtraReducer(acceptFriendRequest, acceptFriendRequestFullfilled),
    ...setExtraReducer(getUserData, getUserDataFullfilled),
  },
});

export const getFriendsOwnedBookById = (book_id) => (state) =>
  state.friends.currentFriend.ownedBooks.find(({ _id }) => _id === book_id);

export const {
  setCurrentFriend,
  setFriends,
  setFriendRequestInbox,
  setFriendRequestOutbox,
  addRequestToCurrentFriend,
  updateFriendsBookRequests,
} = friendsSlice.actions;

export { sendFriendRequest, acceptFriendRequest, getUserData };

export default friendsSlice.reducer;
