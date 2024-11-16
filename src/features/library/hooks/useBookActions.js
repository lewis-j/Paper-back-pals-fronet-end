import { useDispatch } from "react-redux";
import { updateCurrentPage } from "../../../features/library";
import { deleteUserBook } from "../userBooksSlice";

export const useBookActions = () => {
  const dispatch = useDispatch();

  const handleUpdatePageCount = (requestId, currentPage, userBookId) => {
    dispatch(updateCurrentPage({ requestId, currentPage, userBookId }));
  };

  const onConfirmBookRemoval = (userBookId) => {
    dispatch(deleteUserBook(userBookId));
  };

  return { handleUpdatePageCount, onConfirmBookRemoval };
};
