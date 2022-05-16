import { configureStore } from "@reduxjs/toolkit";
import userBooksReducer from "./userBook/userBooksSlice";
import userSlice from "./user/userSlice";
import { logger } from 'redux-logger';

export const store = configureStore({
  reducer: {
    userBooks: userBooksReducer,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});
