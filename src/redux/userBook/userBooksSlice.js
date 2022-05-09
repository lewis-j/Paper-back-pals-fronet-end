import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as userBookService from "../../network/userBookCalls";
import * as status from "../status";

export const fetchBooks = createAsyncThunk(
  "userBooks/fetchBooks",
  userBookService.fetchBooks
);

export const userBooksSlice = createSlice({
  name: "userBooks",
  initialState: {
    books: [],
    status: status.IDLE,
    error: null,
  },
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
  },
  extraReducers: {
    [fetchBooks.pending]: (state) => {
      state.status = status.LOADING;
    },
    [fetchBooks.fulfilled]: (state, action) => {
      console.log("action ", action);
      state.status = status.SUCCEEDED;
      state.books = action.payload;
    },
    [fetchBooks.rejected]: (state, action) => {
      state.status = status.FAILED;
      state.error = action.error.message;
      console.error(action.error.message);
    },
  },
});

export const { addBook } = userBooksSlice.actions;

export default userBooksSlice.reducer;
