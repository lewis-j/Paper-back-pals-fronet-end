import { useDispatch } from "react-redux";
import { updateCurrentPage } from "../../../features/library";
import { deleteUserBook } from "../userBooksSlice";
import { nextBookRequestStatus } from "../userBookCalls";

export const useBookActions = () => {
  const dispatch = useDispatch();

  // Helper function to handle dispatch operations
  const dispatchAction = async (action, errorMessage = null) => {
    try {
      await dispatch(action).unwrap();
      return true;
    } catch (error) {
      if (errorMessage) console.error(errorMessage, error);
      return false;
    }
  };

  const handleUpdatePageCount = (request_id, currentPage, userBook_id) =>
    dispatchAction(updateCurrentPage({ request_id, currentPage, userBook_id }));

  const removeBook = (userBookId) => dispatchAction(deleteUserBook(userBookId));

  const confirmRequest = (request_id) =>
    dispatchAction(nextBookRequestStatus(request_id));

  const markComplete = (request_id, userBook_id, pageCount) =>
    dispatchAction(
      updateCurrentPage({
        request_id,
        userBook_id,
        currentPage: pageCount,
      })
    );

  const returnBook = (request_id) =>
    dispatchAction(nextBookRequestStatus(request_id), "error in returnBook");

  return {
    handleUpdatePageCount,
    removeBook,
    markComplete,
    returnBook,
    confirmRequest,
  };
};
