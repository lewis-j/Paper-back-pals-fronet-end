import React from "react";
import { Button, Modal } from "../../../components";
import { PageCountForm, UserBookCardLrg } from "../../../features/library";
const DashboardModal = ({ modal, onClose, booksFromFriends }) => {
  const getUserBook = (bookData) => {
    return booksFromFriends.find((item) => item._id === bookData);
  };

  const ChangePageCountForm = ({ bookData }) => {
    console.log("bookData", bookData);
    if (booksFromFriends.length === 0) return null;
    const _userBook = booksFromFriends.find((item) => item._id === bookData);
    console.log("_userBook", _userBook);
    if (!_userBook) return null;
    const {
      _id: userBook_id,
      owner,
      book,
      dueDate,
      request,
      currentPage,
    } = _userBook;
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

  const ReturnBookForm = ({ bookData }) => {
    const _userBook = booksFromFriends.find((item) => item._id === bookData);
    if (!_userBook) return null;
    const { owner, book, dueDate } = _userBook;
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
    const userBook = getUserBook(modal.data);

    switch (modal.type) {
      case "pageCount":
        return <ChangePageCountForm userBook={userBook} onClose={onClose} />;
      case "returnBook":
        return <ReturnBookForm userBook={userBook} onClose={onClose} />;
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
