import { useSelector } from "react-redux";
import BookModalForm from "../../components/ModalForms/BookModalForm/BookModalForm";
import FormContainer from "../../components/ModalForms/Shared/FormContainer/FormContainer";
import { useBookActions } from "../../hooks/useBookActions";
import { MODAL_TYPES } from "./modalTypes";
import * as asyncStatus from "../../../../data/asyncStatus";
import { useMemo } from "react";

const createBookFinder = (book_id) => (userBooks) => {
  return userBooks.find((book) => book._id === book_id);
};

// Menu configurations for different sections
export const getMenuItems = (modalActions, book_id) => {
  const getUserBookById = createBookFinder(book_id);
  return {
    booksInLibrary: (userBooks) => {
      const userBook = getUserBookById(userBooks);

      return [
        {
          text: "Book Details",
          clickHandler: () => modalActions.viewUserBookDetails(userBook),
        },
        {
          text: "Remove Book",
          clickHandler: () => modalActions.removeFromLibrary(userBook),
        },
      ];
    },
    booksFromFriends: (userBooks) => {
      const userBook = getUserBookById(userBooks);

      return [
        {
          text: "Start Reading",
          clickHandler: () => modalActions.setCurrentRead(userBook),
        },
        {
          text: "Update Page",
          clickHandler: () => modalActions.updatePageCount(userBook),
        },
        {
          text: "Request Extension",
          clickHandler: () => modalActions.requestBorrowExtension(userBook),
        },
        {
          text: "Message Owner",
          clickHandler: () => modalActions.openChat(userBook.owner._id),
        },
        {
          text: "Return Book",
          clickHandler: () => modalActions.returnBorrowedBook(userBook),
        },
      ];
    },

    currentRead: (currentRead) => [
      {
        text: "Update Progress",
        clickHandler: () => modalActions.updatePageCount(currentRead),
      },
      {
        text: "Mark as Complete",
        clickHandler: () => modalActions.markBookComplete(currentRead),
      },
      {
        text: "Book Details",
        clickHandler: () => modalActions.viewUserBookDetails(currentRead),
      },
      {
        text: "Return Book",
        clickHandler: () => modalActions.returnBorrowedBook(currentRead),
      },
    ],

    booksToFriends: (userBooks) => {
      const userBook = getUserBookById(userBooks);
      return [
        {
          text: "View Progress",
          clickHandler: () => {
            modalActions.viewReadingProgress(userBook);
          },
        },
        {
          text: "Message Borrower",
          clickHandler: () => modalActions.openChat(userBook.sender._id),
        },
        {
          text: "Request Return",
          clickHandler: () => modalActions.requestBookReturn(userBook),
        },
        {
          text: "Book Details",
          clickHandler: () => modalActions.viewUserBookDetails(userBook),
        },
      ];
    },
    borrowedBookRequests: (userBooks) => {
      const userBook = getUserBookById(userBooks);
      return [
        {
          text: "Book Details",
          clickHandler: () => modalActions.viewUserBookDetails(userBook),
        },
        {
          text: "Message Owner",
          clickHandler: () => modalActions.openChat(userBook.owner._id),
        },
        {
          text: "Remove Request",
          clickHandler: () => modalActions.cancelBorrowRequest(userBook),
        },
      ];
    },
    friendsBooks: (userBooks) => {
      const userBook = getUserBookById(userBooks);
      console.log("userBook", userBook);
      return [
        {
          text: "Book Details",
          clickHandler: () => modalActions.viewUserBookDetails(userBook),
        },
        {
          text: "Message Owner",
          clickHandler: () => modalActions.openChat(userBook.owner._id),
        },
        {
          text: "Request Book",
          clickHandler: () => modalActions.createBorrowRequest(userBook),
        },
      ];
    },

    bookRequests: (userBooks) => {
      const userBook = getUserBookById(userBooks);

      return [
        {
          text: "View Requests",
          clickHandler: () => modalActions.viewBorrowRequests(userBook),
        },
        {
          text: "Remove from Library",
          clickHandler: () => modalActions.removeFromLibrary(userBook),
        },
      ];
    },
  };
};

const modalConfig = (modalData, actions, isSubmitting, error, onClose) => {
  return {
    [MODAL_TYPES.UPDATE_PAGE_COUNT.value]: {
      label: "Update current page",
      component: (
        <BookModalForm.UpdatePageForm
          userBook={modalData.userBook}
          onClose={onClose}
          onUpdateProgress={actions.updateReadingProgress}
          isSubmitting={isSubmitting}
          error={error}
        />
      ),
    },
    [MODAL_TYPES.COMPLETE_BOOK.value]: {
      label: "Mark book as complete",
      component: (
        <BookModalForm.CompleteBookForm
          userBook={modalData.userBook}
          onClose={onClose}
          onComplete={actions.completeBook}
          isSubmitting={isSubmitting}
          error={error}
        />
      ),
    },
    [MODAL_TYPES.RETURN_BORROWED_BOOK.value]: {
      label: "Return Book",
      component: (
        <BookModalForm.ReturnBookForm
          userBook={modalData.userBook}
          onClose={onClose}
          onReturn={actions.returnBorrowedBook}
          isSubmitting={isSubmitting}
          error={error}
        />
      ),
    },
    [MODAL_TYPES.VIEW_BORROW_REQUESTS.value]: {
      label: "View Requests",
      component: (
        <BookModalForm.BorrowRequestsList
          userBook={modalData.userBook}
          onClose={onClose}
        />
      ),
    },
    [MODAL_TYPES.VIEW_BOOK_DETAILS.value]: {
      label: "Book Description",
      component: (
        <BookModalForm.BookDetailsView
          userBook={modalData.userBook}
          onClose={onClose}
        />
      ),
    },
    [MODAL_TYPES.CONFIRM_BORROW_REQUEST.value]: {
      label: "Confirm Request",
      component: (
        <BookModalForm.ConfirmBorrowRequestForm
          requestData={modalData.request}
          userBook={modalData.userBook}
          onClose={onClose}
          onConfirmRequest={actions.acceptBorrowRequest}
          isSubmitting={isSubmitting}
          error={error}
        />
      ),
    },
    [MODAL_TYPES.VIEW_READING_PROGRESS.value]: {
      label: "Reading Progress",
      component: (
        <BookModalForm.ReadingProgressView
          userBook={modalData.userBook}
          onClose={onClose}
        />
      ),
    },
    [MODAL_TYPES.REMOVE_FROM_LIBRARY.value]: {
      label: "Remove Book",
      component: (
        <BookModalForm.DeleteBookForm
          userBook={modalData.userBook}
          onClose={onClose}
          onDelete={actions.deleteBookFromLibrary}
          isSubmitting={isSubmitting}
          error={error}
        />
      ),
    },
    [MODAL_TYPES.CREATE_BORROW_REQUEST.value]: {
      label: "Create Borrow Request",
      component: (
        <BookModalForm.CreateBorrowRequestForm
          userBook={modalData.userBook}
          onClose={onClose}
          onSubmit={actions.createBorrowRequest}
          isSubmitting={isSubmitting}
          error={error}
        />
      ),
    },
    [MODAL_TYPES.CANCEL_BORROW_REQUEST.value]: {
      label: "Remove Request",
      component: (
        <BookModalForm.CancelBorrowRequestForm
          userBook={modalData.userBook}
          onClose={onClose}
          onCancel={actions.cancelPendingBorrowRequest}
          isSubmitting={isSubmitting}
          error={error}
        />
      ),
    },
    [MODAL_TYPES.REQUEST_BORROW_EXTENSION.value]: {
      label: "Extend Borrow",
      component: (
        <BookModalForm.ExtendBorrowForm
          userBook={modalData.userBook}
          onClose={onClose}
          onRequestExtension={actions.requestExtension}
          isSubmitting={isSubmitting}
          error={error}
        />
      ),
    },
  };
};

// Modal content components
export const ModalContent = ({ modal, onClose }) => {
  const actions = useBookActions();
  const status = useSelector((state) => state.userBooks.status);
  const error = useSelector((state) => state.userBooks.error);
  const isSubmitting = status === asyncStatus.LOADING;

  const config = modalConfig(modal.data, actions, isSubmitting, error, onClose)[
    modal.type
  ];

  // Defensive rendering
  if (!config) {
    return null;
  }

  const label = config.label || modal.title || "";

  return (
    <FormContainer bookData={modal.data.userBook} label={label}>
      {config.component}
    </FormContainer>
  );
};
