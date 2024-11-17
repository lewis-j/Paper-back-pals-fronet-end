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

  const markComplete = async (request_id, userBook_id, pageCount) => {
    await dispatch(
      updateCurrentPage({
        request_id,
        userBook_id,
        currentPage: pageCount,
      })
    ).unwrap();
  };

  return { handleUpdatePageCount, onConfirmBookRemoval, markComplete };
};
