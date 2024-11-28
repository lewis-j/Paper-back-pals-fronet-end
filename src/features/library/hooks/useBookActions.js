import { useDispatch } from "react-redux";
import { updateCurrentPage } from "../../../features/library";
import {
  cancelBorrowRequest,
  createBookRequest,
  deleteUserBook,
  updateCurrentRead,
  removeBookRequest,
  updateBorrowRequestStatus,
  updateLendRequestStatus,
} from "../userBooksSlice";

export const useBookActions = () => {
  const dispatch = useDispatch();

  // Helper function to handle dispatch operations
  const dispatchAction = async (action, errorMessage = null) => {
    try {
      console.log("dispatching action", action);
      await dispatch(action).unwrap();
      return true;
    } catch (error) {
      if (errorMessage) console.error(errorMessage, error);
      return false;
    }
  };

  // Library Management
  const deleteBookFromLibrary = (userBookId) =>
    dispatchAction(deleteUserBook(userBookId));

  const setCurrentRead = (userBookId) =>
    dispatchAction(updateCurrentRead(userBookId));

  // Reading Progress Actions
  const updateReadingProgress = (request_id, currentPage, userBook_id) =>
    dispatchAction(updateCurrentPage({ request_id, currentPage, userBook_id }));

  const completeBook = (request_id, userBook_id, pageCount) =>
    dispatchAction(
      updateCurrentPage({
        request_id,
        userBook_id,
        currentPage: pageCount,
      })
    );

  // Borrowing/Lending Actions
  const createBorrowRequest = (userBookId) =>
    dispatchAction(createBookRequest(userBookId));

  const acceptBorrowRequest = (request_id) =>
    dispatchAction(
      updateLendRequestStatus(request_id),
      "error in acceptBorrowRequest"
    );

  const confirmLenderDropOff = (request_id) =>
    dispatchAction(
      updateLendRequestStatus(request_id),
      "error in confirmLenderDropOff"
    );

  const confirmBorrowerPickup = (request_id) =>
    dispatchAction(
      updateBorrowRequestStatus(request_id),
      "error in confirmBorrowerPickup"
    );

  const returnBorrowedBook = (request_id) =>
    dispatchAction(
      updateBorrowRequestStatus(request_id),
      "error in returnBorrowedBook"
    );

  const confirmBorrowerDropOff = (request_id) =>
    dispatchAction(
      updateBorrowRequestStatus(request_id),
      "error in confirmBorrowerDropOff"
    );

  const confirmLenderPickup = (request_id) =>
    dispatchAction(
      updateLendRequestStatus(request_id),
      "error in confirmLenderPickup"
    );

  const cancelPendingBorrowRequest = (request_id) =>
    dispatchAction(
      cancelBorrowRequest(request_id),
      "error in cancelPendingBorrowRequest"
    );

  return {
    // Library Management
    deleteBookFromLibrary,
    setCurrentRead,
    // Reading Progress
    updateReadingProgress,
    completeBook,
    // Borrowing/Lending
    createBorrowRequest,
    acceptBorrowRequest,
    confirmLenderDropOff,
    confirmBorrowerPickup,
    returnBorrowedBook,
    confirmBorrowerDropOff,
    confirmLenderPickup,
    cancelPendingBorrowRequest,
  };
};
