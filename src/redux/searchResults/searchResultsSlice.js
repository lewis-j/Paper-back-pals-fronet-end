import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as searchApi from "./searchApi";
import * as status from "../status";

const rejectionReducer = (state, action) => {
  state.status = status.FAILED;
  state.error = action.error.message;
  console.error(action.error.message);
};

const pendingReducer = (state) => {
  state.status = status.LOADING;
};

export const searchBooks = createAsyncThunk(
  "searchResults/searchBooks",
  ({ query }) => {
    return searchApi.searchBooks(query);
  }
);

export const getMoreBooks = createAsyncThunk(
  "searchResults/getBooks",
  ({ startIndex }, { getState }) => {
    const state = getState();
    console.log("State", state);
    const query = state.searchResults.query;
    console.log("query", query);
    return searchApi.searchBooks(query, startIndex);
  }
);

export const searchUsers = createAsyncThunk(
  "searchResults/searchUsers",
  ({ query }) => {
    return searchApi.searchUsers(query);
  }
);

export const searchResultSlice = createSlice({
  name: "searchResults",
  initialState: {
    query: "",
    bookResults: [],
    userResults: [],
    status: status.IDLE,
    error: null,
  },
  reducers: {
    setQuery: (state, action) => {
      console.log("action.payload", action);
      state.query = action.payload;
    },
  },
  extraReducers: {
    [searchBooks.pending]: pendingReducer,
    [searchBooks.fulfilled]: (state, { payload }) => {
      console.log("action for searchbooks ", payload);
      state.status = status.SUCCEEDED;
      state.bookResults = payload?.bookResults;
    },
    [searchBooks.rejected]: rejectionReducer,
    [getMoreBooks.pending]: pendingReducer,
    [getMoreBooks.fulfilled]: (state, { payload }) => {
      console.log("action for getMoreBooks ", payload);
      state.status = status.SUCCEEDED;
      state.bookResults = [...state.bookResults, ...payload.bookResults];
    },
    [getMoreBooks.rejected]: rejectionReducer,
    [searchUsers.pending]: pendingReducer,
    [searchUsers.fulfilled]: (state, { payload }) => {
      console.log("action for getMoreBooks ", payload);
      state.status = status.SUCCEEDED;
      state.userResults = payload;
    },
    [searchUsers.rejected]: rejectionReducer,
  },
});

export { status as condition };
export const { setQuery } = searchResultSlice.actions;

export default searchResultSlice.reducer;
