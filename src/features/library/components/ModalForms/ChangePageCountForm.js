import { PageCountForm, UserBookCardLrg } from "../..";
import { useBookActions } from "../../../../Pages/Dashboard/hooks/useBookActions";

const ChangePageCountForm = ({ userBook }) => {
  const { handleUpdatePageCount } = useBookActions();
  if (!userBook) return null;
  const {
    _id: userBook_id,
    owner,
    book,
    dueDate,
    request,
    currentPage,
  } = userBook;

  const pageCountFormSubmit = (_currentPage) => {
    handleUpdatePageCount(request._id, _currentPage, userBook_id);
  };

  return (
    <>
      <UserBookCardLrg book={book} user={owner} dueDate={dueDate} />
      <PageCountForm currentPage={currentPage} onSubmit={pageCountFormSubmit} />
    </>
  );
};

export default ChangePageCountForm;
