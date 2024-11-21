import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as userBookApi from "./userBookCalls";
import * as status from "../../data/asyncStatus";
import bookRequestStatus from "./data/bookRequestStatus";
import { setExtraReducer } from "../../utilities/reduxUtil";

export const addBook = createAsyncThunk(
  "userBooks/addBooks",
  userBookApi.addBook
);

export const deleteUserBook = createAsyncThunk(
  "userBooks/deleteUserBook",
  userBookApi.deleteUserBook
);

export const createBookRequest = createAsyncThunk(
  "userBooks/createRequest",
  userBookApi.createBookRequest
);

export const removeBookRequest = createAsyncThunk(
  "userBooks/removeRequest",
  userBookApi.removeBookRequest
);

export const updateCurrentRead = createAsyncThunk(
  "useBooks/updateCurrentRead",
  userBookApi.updateCurrentRead
);

export const updateCurrentPage = createAsyncThunk(
  "userBooks/updateCurrentPage",
  userBookApi.updateCurrentPage
);

export const nextBookRequestStatus = createAsyncThunk(
  "userBooks/nextBookRequestStatus",
  userBookApi.nextBookRequestStatus
);

export const cancelBorrowRequest = createAsyncThunk(
  "userBooks/cancelBorrowRequest",
  userBookApi.removeBookRequest
);

export const denyLendRequest = createAsyncThunk(
  "userBooks/denyLendRequest",
  userBookApi.removeBookRequest
);

const nextBookRequestStatusFulfilled = (state, action) => {
  console.log("action", action);
  const request_id = action.payload.bookRequest.request_id;
  // TODO: update the status of the book in the borrowed array instead of the notification array
  const bookIdx = state.books.borrowed.findIndex(
    ({ request }) => request.request_id === request_id
  );
  state.books.borrowed[bookIdx].status = action.payload.bookRequest.status;
};

const removeBookRequestFulfilled = (state, action) => {
  state.books.borrowed = state.books.borrowed.filter(
    ({ request }) => request.request_id !== action.payload.request_id
  );
};

const updateCurrentReadFulfilled = (state, action) => {
  const new_id = action.payload.userBook_id;
  state.currentRead = state.books.borrowed.find(({ _id }) => _id === new_id);
};

const updateCurrentPageFulfilled = (state, action) => {
  const book_id = action.payload.userBook_id;
  const bookIdx = state.books.borrowed.findIndex(({ _id }) => _id === book_id);
  state.books.borrowed[bookIdx].currentPage = action.payload.currentPage;
};

const createBookRequestFullfilled = (state, action) => {
  state.bookRequests.push({
    userBook: {
      _id: action.payload.userBook_id,
    },
    status: bookRequestStatus.CHECKED_IN,
  });
};

const addBookFullfilled = (state, action) => {
  state.books.owned = [...state.books.owned, action.payload];
};

const deleteUserBookFulfilled = (state, action) => {
  state.books.owned = state.books.owned.filter(
    (book) => book._id !== action.payload.userBook_id
  );
};

const cancelBorrowRequestFulfilled = (state, action) => {
  state.books.borrowed = state.books.borrowed.filter(
    ({ request }) => request.request_id !== action.payload.request_id
  );
};

const denyLendRequestFulfilled = (state, action) => {
  // Update the owned books' requests array
  // Implementation depends on how requests are stored in your owned books
  state.books.owned.forEach((book) => {
    book.requests = book.requests.filter(
      (request) => request.request_id !== action.payload.request_id
    );
  });
};

export const userBooksSlice = createSlice({
  name: "userBooks",

  initialState: {
    currentRead: null,
    books: {
      borrowed: [],
      owned: [],
    },
    status: status.IDLE,
    error: null,
  },
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    setCurrentRead: (state, action) => {
      state.currentRead = action.payload.currentRead;
    },
  },
  extraReducers: {
    ...setExtraReducer(addBook, addBookFullfilled),
    ...setExtraReducer(deleteUserBook, deleteUserBookFulfilled),
    ...setExtraReducer(createBookRequest, createBookRequestFullfilled),
    ...setExtraReducer(updateCurrentRead, updateCurrentReadFulfilled),
    ...setExtraReducer(updateCurrentPage, updateCurrentPageFulfilled),
    ...setExtraReducer(nextBookRequestStatus, nextBookRequestStatusFulfilled),
    ...setExtraReducer(removeBookRequest, removeBookRequestFulfilled),
    ...setExtraReducer(cancelBorrowRequest, cancelBorrowRequestFulfilled),
    ...setExtraReducer(denyLendRequest, denyLendRequestFulfilled),
  },
});

export const { setBooks, setCurrentRead } = userBooksSlice.actions;

export default userBooksSlice.reducer;
