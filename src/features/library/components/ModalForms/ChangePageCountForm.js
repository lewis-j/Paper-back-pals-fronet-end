import { PageCountForm, UserBookCardLrg } from "../..";

const ChangePageCountForm = ({ userBook, onConfirm }) => {
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
    onConfirm(request.request_id, _currentPage, userBook_id);
  };

  return (
    <>
      <UserBookCardLrg book={book} user={owner} dueDate={dueDate} />
      <PageCountForm currentPage={currentPage} onSubmit={pageCountFormSubmit} />
    </>
  );
};

export default ChangePageCountForm;
