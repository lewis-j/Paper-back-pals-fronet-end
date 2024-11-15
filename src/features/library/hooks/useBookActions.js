import { useDispatch } from "react-redux";
import { updateCurrentPage } from "../../../features/library";

export const useBookActions = () => {
  const dispatch = useDispatch();

  const handleUpdatePageCount = (requestId, currentPage, userBookId) => {
    dispatch(updateCurrentPage({ requestId, currentPage, userBookId }));
  };

  return { handleUpdatePageCount };
};
