import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBooks = createAsyncThunk(
  "userBooks/fetchBooks",
  async (id) => {
    const response = await axios.get(
      process.env.REACT_APP_NEST_URI + "/user-books"
    );
    return response.data;
  }
);

export const userBooksSlice = createSlice({
  name: "userBooks",
  initialState: {
    books: [],
    status: "idle",
  },
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addBook } = userBooksSlice.actions;

export default userBooksSlice.reducer;
