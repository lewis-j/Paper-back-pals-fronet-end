import { BookInfo, MarkComplete } from "../../features/library/components";
import ChangePageCountForm from "../../features/library/components/ModalForms/ChangePageCountForm/ChangePageCountForm";
import RemoveBookConfirm from "../../features/library/components/ModalForms/RemoveBookConfirm/RemoveBookConfirm";
import ReturnBookForm from "../../features/library/components/ModalForms/ReturnBookForm/ReturnBookForm";
import UserBookRequest from "../../features/library/components/ModalForms/UserBookRequest/UserBookRequest";
import ViewProgress from "../../features/library/components/ModalForms/ViewProgress/ViewProgress";
import { MODAL_TYPES } from "../../features/library/config/modals/modalTypes";
import { useBookActions } from "../../features/library/hooks/useBookActions";

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
export const ModalContent = ({ modal, onClose }) => {
  const { onConfirmBookRemoval, handleUpdatePageCount, markComplete } =
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
      return <ReturnBookForm userBook={modal.data} onClose={onClose} />;
    case MODAL_TYPES.VIEW_REQUESTS:
      return <UserBookRequest userBook={modal.data} onClose={onClose} />;
    case MODAL_TYPES.BOOK_DETAILS:
      return <BookInfo userBook={modal.data} onClose={onClose} />;
    case MODAL_TYPES.CONFIRM_REQUEST:
      return <ConfirmRequest userBook={modal.data} onClose={onClose} />;
    case MODAL_TYPES.VIEW_PROGRESS:
      return <ViewProgress userBook={modal.data} onClose={onClose} />;
    case MODAL_TYPES.REMOVE_BOOK:
      return (
        <RemoveBookConfirm
          userBook={modal.data}
          onClose={onClose}
          onConfirm={onConfirmBookRemoval}
        />
      );
    default:
      return null;
  }
};
