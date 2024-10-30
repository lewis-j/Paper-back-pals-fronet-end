import React from "react";
import { Button, Modal } from "../../../components";
import { PageCountForm, UserBookCardLrg } from "../../../features/library";
const DashboardModal = ({ modal, onClose, booksFromFriends }) => {
  const ChangePageCountForm = ({ userBook }) => {
    if (booksFromFriends.length === 0) return null;
    if (!userBook) return null;
    const {
      _id: userBook_id,
      owner,
      book,
      dueDate,
      request,
      currentPage,
    } = userBook;
    const _book = { ...book, dueDate };
    const pageCountFormSubmit = (currentPage) => {
      //   handleUpdatePageCount(request._id, currentPage, userBook_id);
    };

    return (
      <>
        <UserBookCardLrg book={_book} user={owner} progress={false} />
        <PageCountForm
          currentPage={currentPage}
          onSubmit={pageCountFormSubmit}
        />
      </>
    );
  };

  const ReturnBookForm = ({ userBook }) => {
    if (!userBook) return null;
    const { owner, book, dueDate } = userBook;
    const _book = { ...book, dueDate };
    return (
      <>
        <UserBookCardLrg book={_book} user={owner} progress={false} />
        <div>
          <p>
            Do you want to return {book.title} to {owner.username}?
          </p>
          <Button varient="accept">Return Book</Button>
        </div>
      </>
    );
  };

  const getModalContent = () => {
    switch (modal.type) {
      case "pageCount":
        return <ChangePageCountForm userBook={modal.data} onClose={onClose} />;
      case "returnBook":
        return <ReturnBookForm userBook={modal.data} onClose={onClose} />;
      default:
        return null;
    }
  };

  return (
    <Modal isOpen={modal.isOpen} onClose={onClose} title={modal.title}>
      {getModalContent()}
    </Modal>
  );
};

export default DashboardModal;
