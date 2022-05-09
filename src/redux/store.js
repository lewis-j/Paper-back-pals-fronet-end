import { configureStore } from "@reduxjs/toolkit";
import userBooksReducer from "./userBook/userBooksSlice";
import userSlice from "./user/userSlice";

export const store = configureStore({
  reducer: {
    userBooks: userBooksReducer,
    user: userSlice,
  },
});
