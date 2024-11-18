import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as userBookApi from "./userBookCalls";
import * as status from "../../data/asyncStatus";
import bookRequestStatus from "./data/bookRequestStatus";
import { setExtraReducer } from "../../utilities/reduxUtil";

export const addBook = createAsyncThunk(
  "userBooks/addBooks",
  userBookApi.addBook
);

export const deleteUserBook = createAsyncThunk(
  "userBooks/deleteUserBook",
  userBookApi.deleteUserBook
);

export const createBookRequest = createAsyncThunk(
  "userBooks/createRequest",
  userBookApi.createBookRequest
);

export const updateCurrentRead = createAsyncThunk(
  "useBooks/updateCurrentRead",
  userBookApi.updateCurrentRead
);

export const updateCurrentPage = createAsyncThunk(
  "userBooks/updateCurrentPage",
  userBookApi.updateCurrentPage
);

export const nextBookRequestStatus = createAsyncThunk(
  "userBooks/nextBookRequestStatus",
  userBookApi.nextBookRequestStatus
);

const nextBookRequestStatusFulfilled = (state, action) => {
  const request_id = action.payload.request_id;
  // TODO: update the status of the book in the borrowed array instead of the notification array
  // const bookIdx = state.books.borrowed.findIndex(
  //   ({ request }) => request.request_id === request_id
  // );
  // state.books.borrowed[bookIdx].status = action.payload.status;
};

const updateCurrentReadFulfilled = (state, action) => {
  const new_id = action.payload.userBook_id;
  state.currentRead = state.books.borrowed.find(({ _id }) => _id === new_id);
};

const updateCurrentPageFulfilled = (state, action) => {
  const book_id = action.payload.userBook_id;
  const bookIdx = state.books.borrowed.findIndex(({ _id }) => _id === book_id);
  state.books.borrowed[bookIdx].currentPage = action.payload.currentPage;
};

const createBookRequestFullfilled = (state, action) => {
  state.bookRequests.push({
    userBook: {
      _id: action.payload.userBook_id,
    },
    status: bookRequestStatus.CHECKED_IN,
  });
};

const addBookFullfilled = (state, action) => {
  state.books.owned = [...state.books.owned, action.payload];
};

const deleteUserBookFulfilled = (state, action) => {
  state.books.owned = state.books.owned.filter(
    (book) => book._id !== action.payload.userBook_id
  );
};

export const userBooksSlice = createSlice({
  name: "userBooks",

  initialState: {
    currentRead: null,
    books: {
      borrowed: [],
      owned: [],
    },
    status: status.IDLE,
    error: null,
  },
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    setCurrentRead: (state, action) => {
      state.currentRead = action.payload.currentRead;
    },
  },
  extraReducers: {
    ...setExtraReducer(addBook, addBookFullfilled),
    ...setExtraReducer(deleteUserBook, deleteUserBookFulfilled),
    ...setExtraReducer(createBookRequest, createBookRequestFullfilled),
    ...setExtraReducer(updateCurrentRead, updateCurrentReadFulfilled),
    ...setExtraReducer(updateCurrentPage, updateCurrentPageFulfilled),
    ...setExtraReducer(nextBookRequestStatus, nextBookRequestStatusFulfilled),
  },
});

export const { setBooks, setCurrentRead } = userBooksSlice.actions;

export default userBooksSlice.reducer;
