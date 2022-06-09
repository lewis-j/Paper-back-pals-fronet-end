import { configureStore } from "@reduxjs/toolkit";
import userBooksReducer from "./userBook/userBooksSlice";
import authUserSlice from "./authUser/authUserSlice";
import friendsSlice from "./friends/friendsSlice";
import searchResultsSlice from "./searchResults/searchResultsSlice";
import { logger } from "redux-logger";

export const store = configureStore({
  reducer: {
    userBooks: userBooksReducer,
    authUser: authUserSlice,
    friends: friendsSlice,
    searchResults: searchResultsSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
