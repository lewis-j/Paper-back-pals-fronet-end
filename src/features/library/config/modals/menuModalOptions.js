import {
  ChangePageCountForm,
  MarkComplete,
  UserBookRequest,
  ViewProgress,
  RemoveBookConfirm,
  ReturnBookForm,
  UserBookDetails,
} from "../../components";
import BookModalForm from "../../components/ModalForms/BookModalForm/BookModalForm";
import FormContainer from "../../components/ModalForms/Shared/FormContainer/FormContainer";
import { useBookActions } from "../../hooks/useBookActions";
import { MODAL_TYPES } from "./modalTypes";

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
          text: "Remove from Library",
          clickHandler: () => modalActions.removeBook(userBook),
        },
      ];
    },
    booksFromFriends: (userBooks) => {
      const userBook = getUserBookById(userBooks);

      return [
        {
          text: "Set as Current Read",
          clickHandler: () => modalActions.setCurrentRead(userBook),
        },
        {
          text: "Update Progress",
          clickHandler: () => modalActions.updateProgress(userBook),
        },
        {
          text: "Request Extension",
          clickHandler: () => modalActions.requestExtension(userBook),
        },
        {
          text: "Message Owner",
          clickHandler: () => modalActions.sendMessage(userBook),
        },
        {
          text: "Return Book",
          clickHandler: () => modalActions.returnBook(userBook),
        },
      ];
    },

    currentRead: (currentRead) => [
      {
        text: "Update Progress",
        clickHandler: () => modalActions.updateProgress(currentRead),
      },
      {
        text: "Mark as Complete",
        clickHandler: () => modalActions.markComplete(currentRead),
      },
      {
        text: "Book Details",
        clickHandler: () => modalActions.viewUserBookDetails(currentRead),
      },
      {
        text: "Return Book",
        clickHandler: () => modalActions.returnBook(currentRead),
      },
    ],

    booksToFriends: (userBooks) => {
      const userBook = getUserBookById(userBooks);
      return [
        {
          text: "View Progress",
          clickHandler: () => {
            modalActions.viewProgress(userBook);
          },
        },
        {
          text: "Message Borrower",
          clickHandler: () => modalActions.sendMessage(userBook.sender._id),
        },
        {
          text: "Request Return",
          clickHandler: () => modalActions.requestReturn(userBook),
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
          clickHandler: () => modalActions.sendMessage(userBook),
        },
        {
          text: "Remove Request",
          clickHandler: () => modalActions.removeRequest(userBook),
        },
      ];
    },

    bookRequests: (userBooks) => {
      const userBook = getUserBookById(userBooks);

      return [
        {
          text: "View Requests",
          clickHandler: () => modalActions.viewRequests(userBook),
        },
        {
          text: "Remove from Library",
          clickHandler: () => modalActions.removeBook(userBook),
        },
      ];
    },
  };
};

const MODAL_CONFIG = {
  [MODAL_TYPES.PAGE_COUNT]: {
    label: "Update current page",
    component: ({ modalData: userBook, onClose, actions }) => (
      <BookModalForm.ChangePageCount
        userBook={userBook}
        onClose={onClose}
        onUpdatePages={actions.handleUpdatePageCount}
      />
    ),
  },
  [MODAL_TYPES.MARK_COMPLETE]: {
    label: "Mark book as complete",
    component: ({ modalData: userBook, onClose, actions }) => (
      <BookModalForm.MarkComplete
        userBook={userBook}
        onClose={onClose}
        onMarkComplete={actions.markComplete}
      />
    ),
  },
  [MODAL_TYPES.RETURN_BOOK]: {
    label: "Return Book",
    component: ({ modalData: userBook, onClose, actions }) => (
      <BookModalForm.ReturnBook
        userBook={userBook}
        onClose={onClose}
        onReturnBook={actions.returnBook}
      />
    ),
  },
  [MODAL_TYPES.VIEW_REQUESTS]: {
    label: "View Requests",
    component: ({ modalData: userBook, onClose }) => (
      <BookModalForm.UserBookRequest userBook={userBook} onClose={onClose} />
    ),
  },
  [MODAL_TYPES.USER_BOOK_DETAILS]: {
    label: "Book Description",
    component: ({ modalData: userBook, onClose }) => (
      <BookModalForm.UserBookDetails userBook={userBook} onClose={onClose} />
    ),
  },
  [MODAL_TYPES.CONFIRM_REQUEST]: {
    label: "Confirm Request",
    component: ({ modalData: userBook, onClose }) => (
      <BookModalForm.ConfirmRequest userBook={userBook} onClose={onClose} />
    ),
  },
  [MODAL_TYPES.BOOK_DETAILS]: {
    label: "Book Description",
    component: ({ modalData: book, onClose }) => (
      <BookModalForm.UserBookDetails book={book} onClose={onClose} />
    ),
  },
  [MODAL_TYPES.VIEW_PROGRESS]: {
    label: "Reading Progress",
    component: ({ modalData: userBook, onClose }) => (
      <BookModalForm.ViewProgress userBook={userBook} onClose={onClose} />
    ),
  },
  [MODAL_TYPES.REMOVE_BOOK]: {
    label: "Remove Book",
    component: ({ modalData: userBook, onClose, actions }) => (
      <BookModalForm.RemoveBookConfirm
        userBook={userBook}
        onClose={onClose}
        onConfirm={actions.removeBook}
      />
    ),
  },
  [MODAL_TYPES.REMOVE_REQUEST]: {
    label: "Remove Request",
    component: ({ modalData: userBook, onClose }) => (
      <BookModalForm.RemoveRequest userBook={userBook} onClose={onClose} />
    ),
  },
};

const BookModal = ({ modalType, modalData, onClose }) => {
  const actions = useBookActions();
  const config = MODAL_CONFIG[modalType];

  if (!config) return null;

  return config.component({ modalData, onClose, actions });
};

// Modal content components
export const ModalContent = ({ modal, onClose }) => {
  const config = MODAL_CONFIG[modal.type];
  const label = config?.label || modal.title || "";

  return (
    <FormContainer bookData={modal.data} label={label}>
      <BookModal
        modalType={modal.type}
        modalData={modal.data}
        onClose={onClose}
      />
    </FormContainer>
  );
};
