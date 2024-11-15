import { BookInfo } from "../../features/library/components";
import ChangePageCountForm from "../../features/library/components/ModalForms/ChangePageCountForm";
import ReturnBookForm from "../../features/library/components/ModalForms/ReturnBookForm";
import UserBookRequest from "../../features/library/components/ModalForms/UserBookRequest/UserBookRequest";
import ViewProgress from "../../features/library/components/ModalForms/ViewProgress/ViewProgress";
import { MODAL_TYPES } from "../../features/library/config/modals/modalTypes";

// Menu configurations for different sections
export const getMenuItems = (modalActions, book_id) => ({
  booksFromFriends: (getUserBookById) => {
    const userBook = getUserBookById(book_id);

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
      clickHandler: () => modalActions.viewBookDetails(currentRead),
    },
    {
      text: "Return Book",
      clickHandler: () => modalActions.returnBook(currentRead),
    },
  ],

  booksToFriends: (getUserBookById) => {
    const userBook = getUserBookById(book_id);
    return [
      {
        text: "View Progress",
        clickHandler: () => modalActions.viewProgress(userBook),
      },
      {
        text: "Message Borrower",
        clickHandler: () => modalActions.sendMessage(userBook),
      },
      {
        text: "Request Return",
        clickHandler: () => modalActions.requestReturn(userBook),
      },
    ];
  },

  bookRequests: (getUserBookById) => {
    const userBook = getUserBookById(book_id);
    return [
      {
        text: "View Requests",
        clickHandler: () => modalActions.viewRequests(userBook),
      },
      {
        text: "Message Requesters",
        clickHandler: () => modalActions.sendMessage(userBook),
      },
      {
        text: "Remove from Library",
        clickHandler: () => modalActions.removeBook(userBook),
      },
    ];
  },
});

const ConfirmRequest = ({ userBook, onClose }) => {
  return <div>ConfirmRequest</div>;
};

// Modal content components
export const getModalContent = (modal, onClose) => {
  console.log("modal", modal);
  switch (modal.type) {
    case MODAL_TYPES.PAGE_COUNT:
      return <ChangePageCountForm userBook={modal.data} onClose={onClose} />;
    case MODAL_TYPES.RETURN_BOOK:
      return <ReturnBookForm userBook={modal.data} onClose={onClose} />;
    case MODAL_TYPES.VIEW_REQUESTS:
      return <UserBookRequest userBook={modal.data} onClose={onClose} />;
    case MODAL_TYPES.BOOK_DETAILS:
      return <BookInfo userBook={modal.data} onClose={onClose} />;
    case MODAL_TYPES.CONFIRM_REQUEST:
      return <ConfirmRequest userBook={modal.data} onClose={onClose} />;
    case MODAL_TYPES.VIEW_PROGRESS:
      return <ViewProgress userBook={modal.data} onClose={onClose} />;
    default:
      return null;
  }
};
