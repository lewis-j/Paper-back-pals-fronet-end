import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as searchApi from "./searchApi";
import * as status from "../../data/status";

const rejectionReducer = (state, action) => {
  state.status = status.FAILED;
  state.error = action.error.message;
  console.error(action.error.message);
};

const pendingReducer = (state) => {
  state.status = status.LOADING;
};

const searchBooksFulfilledReducer = (state, { payload }) => {
  state.status = status.SUCCEEDED;
  state.bookResults = payload?.bookResults;
};

const getMoreBooksFulfilledReducer = (state, { payload }) => {
  state.status = status.SUCCEEDED;
  state.bookResults = [...state.bookResults, ...payload.bookResults];
};

const searchUsersFulfilledReducer = (state, { payload }) => {
  state.status = status.SUCCEEDED;
  state.userResults = payload;
};

const searchUsersrejectionReducer = (state, action) => {
  state.status = status.FAILED;
  if (action.payload) {
    state.error = action.payload;
  } else {
    state.error = action.error.message;
  }
  console.error(action.error.message);
};

export const searchBooks = createAsyncThunk(
  "searchResults/searchBooks",
  ({ query }) => {
    return searchApi.searchBooks(query);
  }
);

export const getMoreBooks = createAsyncThunk(
  "searchResults/getBooks",
  async ({ startIndex }, { getState }) => {
    const state = getState();
    const query = state.searchResults.query;
    try {
      return await searchApi.searchBooks(query, startIndex);
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const searchUsers = createAsyncThunk(
  "searchResults/searchUsers",
  async ({ query }, { rejectWithValue }) => {
    try {
      const search = await searchApi.searchUsers(query);
      return search;
    } catch (error) {
      if (error?.response?.data)
        return rejectWithValue({ ...error.response.data });
      return Promise.reject(error);
    }
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
      state.query = action.payload;
    },
  },
  extraReducers: {
    [searchBooks.pending]: pendingReducer,
    [searchBooks.fulfilled]: searchBooksFulfilledReducer,
    [searchBooks.rejected]: rejectionReducer,
    [getMoreBooks.pending]: pendingReducer,
    [getMoreBooks.fulfilled]: getMoreBooksFulfilledReducer,
    [getMoreBooks.rejected]: rejectionReducer,
    [searchUsers.pending]: pendingReducer,
    [searchUsers.fulfilled]: searchUsersFulfilledReducer,
    [searchUsers.rejected]: searchUsersrejectionReducer,
  },
});

export { status as condition };
export const { setQuery } = searchResultSlice.actions;

export default searchResultSlice.reducer;
