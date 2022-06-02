import { configureStore } from "@reduxjs/toolkit";
import userBooksReducer from "./userBook/userBooksSlice";
import userSlice from "./user/userSlice";
import friendsSlice from "./friends/friendsSlice";
import { logger } from "redux-logger";

export const store = configureStore({
  reducer: {
    userBooks: userBooksReducer,
    user: userSlice,
    friends: friendsSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
