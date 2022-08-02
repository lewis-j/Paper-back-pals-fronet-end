import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as userBookService from "./userBookCalls";
import * as status from "../../data/status";
import bookRequestStatus from "./data/bookRequestStatus";

const pendingReducer = (state) => {
  state.status = status.LOADING;
};

const rejectedReducer = (state, action) => {
  state.status = status.FAILED;
  state.error = action.error.message;
  console.error(action.error.message);
};

export const addBook = createAsyncThunk(
  "userBooks/addBooks",
  userBookService.addBook
);
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
    addBookRequest: (state, action) => {
      state.bookRequests.push({
        userBook: {
          _id: action.payload.userBook_id,
        },
        status: bookRequestStatus.REQUEST,
      });
    },
  },
  extraReducers: {
    [addBook.pending]: pendingReducer,
    [addBook.rejected]: rejectedReducer,
    [addBook.fulfilled]: (state, action) => {
      console.log("action for addbook ", action);
      state.status = status.SUCCEEDED;
      state.books.owned = [...state.books.owned, action.payload];
    },
  },
});

export const { setBooks, setBookRequests, addBookRequest } =
  userBooksSlice.actions;

export default userBooksSlice.reducer;
