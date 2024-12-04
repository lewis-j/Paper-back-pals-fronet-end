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

export const updateCurrentRead = createAsyncThunk(
  "useBooks/updateCurrentRead",
  userBookApi.updateCurrentRead
);

export const updateCurrentPage = createAsyncThunk(
  "userBooks/updateCurrentPage",
  userBookApi.updateCurrentPage
);

export const updateLendRequestStatus = createAsyncThunk(
  "userBooks/updateLendRequestStatus",
  userBookApi.nextBookRequestStatus
);

export const updateBorrowRequestStatus = createAsyncThunk(
  "userBooks/updateBorrowRequestStatus",
  userBookApi.nextBookRequestStatus
);

export const cancelBorrowRequest = createAsyncThunk(
  "userBooks/cancelBorrowRequest",
  userBookApi.cancelBorrowRequest
);

export const declineLendingRequest = createAsyncThunk(
  "userBooks/declineLendingRequest",
  userBookApi.declineLendingRequest
);

const updateLendRequestStatusFulfilled = (state, action) => {
  const request_id = action.payload.bookRequest._id;
  // Update the request status in the owned books array
  const bookIdx = state.books.owned.findIndex((book) =>
    book.requests?.some((request) => request._id === request_id)
  );
  if (bookIdx !== -1) {
    const requestIdx = state.books.owned[bookIdx].requests.findIndex(
      (request) => request._id === request_id
    );
    state.books.owned[bookIdx].requests[requestIdx].status =
      action.payload.bookRequest.status;
  }
};

const updateBorrowRequestStatusFulfilled = (state, action) => {
  console.log("action in updateBorrowRequestStatusFulfilled", action);
  const request_id = action.payload.bookRequest._id;
  // Update the request status in the borrowed books array
  const bookIdx = state.books.borrowed.findIndex(
    ({ request }) => request._id === request_id
  );
  if (bookIdx !== -1) {
    state.books.borrowed[bookIdx].status = action.payload.bookRequest.status;
  }
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
  state.books.borrowed.push(action.payload.bookRequest);
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
  state.books.borrowed = state.books.borrowed.map(({ request, ...rest }) =>
    request._id !== action.payload.request._id
      ? { request, ...rest }
      : { action }
  );
};

const declineLendingRequestFulfilled = (state, action) => {
  state.books.owned.forEach((book) => {
    book.requests = book.requests.filter(
      (request) => request._id !== action.payload.request._id
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
    ...setExtraReducer(
      updateLendRequestStatus,
      updateLendRequestStatusFulfilled
    ),
    ...setExtraReducer(
      updateBorrowRequestStatus,
      updateBorrowRequestStatusFulfilled
    ),
    ...setExtraReducer(cancelBorrowRequest, cancelBorrowRequestFulfilled),
    ...setExtraReducer(declineLendingRequest, declineLendingRequestFulfilled),
  },
});
export const createBookFromRequestFinder = (state) => (request_id) => {
  const bookFromOwned = state.userBooks.books.owned.find((book) =>
    book.requests?.some((request) => request._id === request_id)
  );
  const bookFromBorrowed = state.userBooks.books.borrowed.find(
    (book) => book.request._id === request_id
  );

  if (bookFromOwned) {
    const request = bookFromOwned.requests.find(
      (req) => req._id === request_id
    );
    console.log("bookFromOwned request", request);
    return {
      ...bookFromOwned,
      isOwned: true,
      sender: request.sender,
      request: { status: request.status, _id: request._id },
    };
  }
  if (bookFromBorrowed) {
    console.log("bookFromBorrowed", bookFromBorrowed);
    return {
      ...bookFromBorrowed,
      isOwned: false,
      sender: bookFromBorrowed.request.sender,
      request: {
        status: bookFromBorrowed.request.status,
        _id: bookFromBorrowed.request._id,
      },
    };
  }
};

export const { setBooks, setCurrentRead } = userBooksSlice.actions;

export default userBooksSlice.reducer;
