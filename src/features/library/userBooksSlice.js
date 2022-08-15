import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as userBookApi from "./userBookCalls";
import * as status from "../../data/asyncStatus";
import bookRequestStatus from "./data/bookRequestStatus";
import { setExtraReducer } from "../../utilities/reduxUtil";

export const addBook = createAsyncThunk(
  "userBooks/addBooks",
  userBookApi.addBook
);

export const createBookRequest = createAsyncThunk(
  "userBooks/createRequest",
  userBookApi.createBookRequest
);

const createBookRequestFullfilled = (state, action) => {
  state.bookRequests.push({
    userBook: {
      _id: action.payload.userBook_id,
    },
    status: bookRequestStatus.CHECKED_IN,
  });
};

const addBookFullfilled = (state, action) => {
  console.log("action for addbook ", action);
  state.books.owned = [...state.books.owned, action.payload];
};

export const userBooksSlice = createSlice({
  name: "userBooks",
  initialState: {
    books: {
      borrowed: [],
      owned: [],
    },
    bookRequests: [],
    status: status.IDLE,
    error: null,
  },
  reducers: {
    setBooks: (state, action) => {
      console.log("action.payload", action.payload);
      state.books = action.payload;
    },
    setBookRequests: (state, action) => {
      console.log("action.payload", action.payload);
      state.bookRequests = action.payload.bookRequest;
    },
    setOwnedBookCurrentRequest: (state, action) => {
      const { userBook_id, request_id } = action.payload;
      const idx = state.books.owned.findIndex(({ _id }) => _id === userBook_id);
      state.books.owned[idx] = request_id;
    },
  },
  extraReducers: {
    ...setExtraReducer(addBook, addBookFullfilled),
    ...setExtraReducer(createBookRequest, createBookRequestFullfilled),
  },
});

export const { setBooks, setBookRequests, setOwnedBookCurrentRequest } =
  userBooksSlice.actions;

export default userBooksSlice.reducer;
