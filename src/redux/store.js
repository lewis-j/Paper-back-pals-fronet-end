import { configureStore } from "@reduxjs/toolkit";
import userBooksReducer from "../features/library/userBooksSlice";
import authUserSlice from "../features/Authentication/authUserSlice";
import friendsSlice from "../features/Friends/friendsSlice";
import searchResultsSlice from "../features/search/searchResultsSlice";
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
