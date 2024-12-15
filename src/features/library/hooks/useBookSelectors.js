import {
  categorizeBorrowedBooksByStatus,
  categorizeOwnedBooksByStatus,
} from "../../../features/library/utilities/bookFilterUtil";

export const useBookSelectors = (userBooks) => {
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
  booksToFriends.push(...(ownedBookCategories.RETURN_REQUESTED || []));
  const booksFromFriends = borrowedBookCategories.CHECKED_OUT || [];
  booksFromFriends.push(...(borrowedBookCategories.RETURN_REQUESTED || []));
  const booksInLibrary = ownedBookCategories.CHECKED_IN || [];
  const borrowedBookRequests = borrowedBookCategories.CHECKED_IN || [];

  const getBooksInTransition = (bookCategories) => {
    const TRANSITION_STATUSES = ["SENDING", "RETURNING", "ACCEPTED", "IS_DUE"];

    const booksInTransition = TRANSITION_STATUSES.map(
      (status) => bookCategories[status]
    )
      .filter(Boolean)
      .flat();
    return booksInTransition;
  };

  const ownedbooksInTransition = getBooksInTransition(ownedBookCategories);
  const borrowedbooksInTransition = getBooksInTransition(
    borrowedBookCategories
  );

  console.log("booksInTransition", ownedbooksInTransition);
  // ... existing code ...
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
    ownedbooksInTransition,
    borrowedbooksInTransition,
    ownedBookRequests,
    borrowedBookRequests,
  };
};
