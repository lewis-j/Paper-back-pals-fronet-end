import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as userBookService from "./userBookCalls";
import * as status from "../../data/status";

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
    status: status.IDLE,
    error: null,
  },
  reducers: {
    setBooks: (state, action) => {
      console.log("action.payload", action.payload);
      state.books = action.payload;
    },
  },
  extraReducers: {
    [addBook.pending]: (state) => {
      state.status = status.LOADING;
    },
    [addBook.fulfilled]: (state, action) => {
      console.log("action for addbook ", action);
      state.status = status.SUCCEEDED;
      state.books.owned = [...state.books.owned, action.payload];
    },
    [addBook.rejected]: (state, action) => {
      state.status = status.FAILED;
      state.error = action.error.message;
      console.error(action.error.message);
    },
  },
});

export const { setBooks } = userBooksSlice.actions;

export default userBooksSlice.reducer;
