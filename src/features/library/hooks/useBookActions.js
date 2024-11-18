import { useDispatch } from "react-redux";
import { updateCurrentPage } from "../../../features/library";
import { deleteUserBook } from "../userBooksSlice";
import { nextBookRequestStatus } from "../userBookCalls";

export const useBookActions = () => {
  const dispatch = useDispatch();

  const handleUpdatePageCount = (request_id, currentPage, userBook_id) => {
    dispatch(updateCurrentPage({ request_id, currentPage, userBook_id }));
  };

  const removeBook = (userBookId) => {
    dispatch(deleteUserBook(userBookId));
  };

  const markComplete = async (request_id, userBook_id, pageCount) => {
    await dispatch(
      updateCurrentPage({
        request_id,
        userBook_id,
        currentPage: pageCount,
      })
    ).unwrap();
  };

  const returnBook = async (request_id) => {
    try {
      await nextBookRequestStatus(request_id);
    } catch (error) {
      console.error("error in returnBook", error);
    }
  };

  return {
    handleUpdatePageCount,
    removeBook,
    markComplete,
    returnBook,
  };
};
