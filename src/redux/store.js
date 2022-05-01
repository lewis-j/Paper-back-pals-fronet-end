import { configureStore } from "@reduxjs/toolkit";
import userBooksReducer from "./userBooksSlice";

export const store = configureStore({
  reducer: {
    userBooks: userBooksReducer,
  },
});
