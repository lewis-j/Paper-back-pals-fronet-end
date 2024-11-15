import { useSelector } from "react-redux";

import {
  categorizeBorrowedBooksByStatus,
  categorizeOwnedBooksByStatus,
} from "../../../features/library/utilities/bookFilterUtil";

export const useBookSelectors = () => {
  const {
    books: { borrowed, owned },
    currentRead,
  } = useSelector((state) => state.userBooks);

  // Process book categories
  const ownedBookCategories = categorizeOwnedBooksByStatus(owned);
  const borrowedBookCategories = categorizeBorrowedBooksByStatus(borrowed);
  console.log("borrowedBookCategories", borrowedBookCategories);

  const booksToFriends = ownedBookCategories.CHECKED_OUT || [];
  const booksFromFriends = borrowedBookCategories.CHECKED_OUT || [];

  // Get owned book requests
  const ownedBookRequests =
    ownedBookCategories.CHECKED_IN?.filter(
      (book) => book.request && book.request.length > 0
    ) || [];

  // Current read helpers
  const populateCurrentRead = (currentRead_id) => {
    if (!currentRead_id) return null;
    return booksFromFriends.find((book) => book._id === currentRead_id);
  };

  const filterOutCurrentRead = (books) => {
    if (!currentRead) return books;
    return books.filter((book) => book._id !== currentRead._id);
  };

  return {
    currentRead: populateCurrentRead(currentRead?._id),
    booksFromFriends: filterOutCurrentRead(booksFromFriends),
    booksToFriends,
    ownedBookRequests,
  };
};
