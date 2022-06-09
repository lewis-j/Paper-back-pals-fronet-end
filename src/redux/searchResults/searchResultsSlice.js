import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as searchApi from "./searchApi";
import * as status from "../status";

export const searchBooks = createAsyncThunk(
  "searchResults/searchBooks",
  ({ query }) => {
    searchApi.searchBooks(query);
  }
);

export const searchResultSlice = createSlice({
  name: "searchResults",
  initialState: {
    booksResults: [],
    userResults: [],
    status: status.IDLE,
    error: null,
  },
  reducers: {},
  extraReducers: {},
});

export { status as condition };

export default searchResultSlice.reducer;
