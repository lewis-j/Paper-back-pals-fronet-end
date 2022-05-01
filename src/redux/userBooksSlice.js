import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
});

export const { addBook } = userBooksSlice.actions;

export default userBooksSlice.reducer;
