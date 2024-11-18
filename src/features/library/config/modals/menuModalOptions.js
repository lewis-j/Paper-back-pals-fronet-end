import {
  ChangePageCountForm,
  MarkComplete,
  UserBookRequest,
  ViewProgress,
  RemoveBookConfirm,
  ReturnBookForm,
  UserBookDetails,
} from "../../components";
import BookDetails from "../../components/BookDetails/BookDetails";
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

const ConfirmRequest = ({ userBook, onClose }) => {
  return <div>ConfirmRequest</div>;
};

// Modal content components
export const ModalContent = ({ modal, onClose }) => {
  console.log("modal in ModalContent: ", modal);
  const { removeBook, handleUpdatePageCount, markComplete, returnBook } =
    useBookActions();

  switch (modal.type) {
    case MODAL_TYPES.PAGE_COUNT:
      console.log("modal.data", modal.data);
      return (
        <ChangePageCountForm
          userBook={modal.data}
          onClose={onClose}
          onUpdatePages={handleUpdatePageCount}
        />
      );
    case MODAL_TYPES.MARK_COMPLETE:
      return (
        <MarkComplete
          userBook={modal.data}
          onClose={onClose}
          onMarkComplete={markComplete}
        />
      );
    case MODAL_TYPES.RETURN_BOOK:
      return (
        <ReturnBookForm
          userBook={modal.data}
          onClose={onClose}
          onReturnBook={returnBook}
        />
      );
    case MODAL_TYPES.VIEW_REQUESTS:
      return <UserBookRequest userBook={modal.data} onClose={onClose} />;
    case MODAL_TYPES.USER_BOOK_DETAILS:
      return <UserBookDetails userBook={modal.data} onClose={onClose} />;
    case MODAL_TYPES.CONFIRM_REQUEST:
      return <ConfirmRequest userBook={modal.data} onClose={onClose} />;
    case MODAL_TYPES.BOOK_DETAILS:
      return <UserBookDetails book={modal.data} onClose={onClose} />;
    case MODAL_TYPES.VIEW_PROGRESS:
      return <ViewProgress userBook={modal.data} onClose={onClose} />;
    case MODAL_TYPES.REMOVE_BOOK:
      return (
        <RemoveBookConfirm
          userBook={modal.data}
          onClose={onClose}
          onConfirm={removeBook}
        />
      );
    default:
      return null;
  }
};
