import { useSelector } from "react-redux";

import {
  categorizeBorrowedBooksByStatus,
  categorizeOwnedBooksByStatus,
} from "../../../features/library/utilities/bookFilterUtil";

export const useBookSelectors = (userBooks) => {
  console.log("userBooks", userBooks);
  // const {
  //   books: { borrowed, owned },
  //   currentRead,
  // } = userBooks

  // Process book categories
  if (
    !userBooks?.books?.owned &&
    !userBooks?.books?.borrowed &&
    !userBooks?.currentRead
  )
    return {};

  const ownedBookCategories = userBooks?.books?.owned
    ? categorizeOwnedBooksByStatus(userBooks.books.owned)
    : [];
  console.log("ownedBookCategories", ownedBookCategories);
  const borrowedBookCategories = userBooks?.books?.borrowed
    ? categorizeBorrowedBooksByStatus(userBooks.books.borrowed)
    : [];
  console.log("borrowedBookCategories", borrowedBookCategories);

  const booksToFriends = ownedBookCategories.CHECKED_OUT || [];
  const booksFromFriends = borrowedBookCategories.CHECKED_OUT || [];
  const booksInLibrary = ownedBookCategories.CHECKED_IN || [];
  const borrowedBookRequests = borrowedBookCategories.CHECKED_IN || [];

  // const booksInTransition = borrowedBookCategories.filter((book) =>
  //   ["SENDING", "RETURNING", "ACCEPTED", "IS_DUE"].includes(
  //     book.request?.status
  //   )
  // );
  const booksInTransition = [];

  // Get owned book requests
  const ownedBookRequests =
    ownedBookCategories.CHECKED_IN?.filter(
      (book) => book.requests && book.requests.length > 0
    ) || [];

  // Current read helpers
  const populateCurrentRead = (currentRead_id) => {
    if (!currentRead_id) return null;
    return booksFromFriends.find((book) => book._id === currentRead_id);
  };

  const filterOutCurrentRead = (books) => {
    if (!userBooks?.currentRead) return books;
    return books.filter((book) => book._id !== userBooks.currentRead._id);
  };

  return {
    currentRead: populateCurrentRead(userBooks.currentRead?._id),
    booksFromFriends: filterOutCurrentRead(booksFromFriends),
    allBooksFromFriends: booksFromFriends,
    booksToFriends,
    booksInLibrary,
    booksInTransition,
    ownedBookRequests,
    borrowedBookRequests,
  };
};
