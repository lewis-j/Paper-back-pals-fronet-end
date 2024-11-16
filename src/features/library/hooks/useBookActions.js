import { useDispatch } from "react-redux";
import { updateCurrentPage } from "../../../features/library";
import { deleteUserBook } from "../userBooksSlice";

export const useBookActions = () => {
  const dispatch = useDispatch();

  const handleUpdatePageCount = (request_id, currentPage, userBook_id) => {
    dispatch(updateCurrentPage({ request_id, currentPage, userBook_id }));
  };

  const onConfirmBookRemoval = (userBookId) => {
    dispatch(deleteUserBook(userBookId));
  };

  return { handleUpdatePageCount, onConfirmBookRemoval };
};
