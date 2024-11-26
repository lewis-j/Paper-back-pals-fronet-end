import { useDispatch } from "react-redux";
import { updateCurrentPage } from "../../../features/library";
import {
  cancelBorrowRequest,
  createBookRequest,
  deleteUserBook,
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

  const updateReadingProgress = (request_id, currentPage, userBook_id) =>
    dispatchAction(updateCurrentPage({ request_id, currentPage, userBook_id }));

  const deleteBookFromLibrary = (userBookId) =>
    dispatchAction(deleteUserBook(userBookId));

  const createBorrowRequest = (userBookId) =>
    dispatchAction(createBookRequest(userBookId));

  const acceptBorrowRequest = (request_id) =>
    dispatchAction(
      updateLendRequestStatus(request_id),
      "error in acceptBorrowRequest"
    );

  const completeBook = (request_id, userBook_id, pageCount) =>
    dispatchAction(
      updateCurrentPage({
        request_id,
        userBook_id,
        currentPage: pageCount,
      })
    );

  const returnBorrowedBook = (request_id) =>
    dispatchAction(
      updateBorrowRequestStatus(request_id),
      "error in returnBorrowedBook"
    );

  const cancelPendingBorrowRequest = (request_id) =>
    dispatchAction(
      cancelBorrowRequest(request_id),
      "error in cancelPendingBorrowRequest"
    );

  return {
    updateReadingProgress,
    deleteBookFromLibrary,
    createBorrowRequest,
    completeBook,
    returnBorrowedBook,
    acceptBorrowRequest,
    cancelPendingBorrowRequest,
  };
};
