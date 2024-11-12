import { BookInfo } from "../../features/library/components";
import ChangePageCountForm from "../../features/library/components/ModalForms/ChangePageCountForm";
import ReturnBookForm from "../../features/library/components/ModalForms/ReturnBookForm";
import UserBookRequest from "../../features/library/components/ModalForms/UserBookRequest/UserBookRequest";

// Constants
export const MODAL_TYPES = {
  PAGE_COUNT: "pageCount",
  RETURN_BOOK: "returnBook",
  CURRENT_READ: "currentRead",
  BOOK_DETAILS: "bookDetails",
  SEND_MESSAGE: "sendMessage",
  EXTEND_BORROW: "extendBorrow",
  MARK_COMPLETE: "markComplete",
  VIEW_REQUESTS: "viewRequests",
  CONFIRM_REQUEST: "confirmRequest",
};

// Menu configurations for different sections
export const getMenuItems = (openModal, book_id) => ({
  booksFromFriends: (getUserBookById) => {
    const userBook = getUserBookById(book_id);

    return [
      {
        text: "Set as Current Read",
        clickHandler: () => {
          openModal(MODAL_TYPES.CURRENT_READ, "Change Current Read", userBook);
        },
      },
      {
        text: "Update Progress",
        clickHandler: () => {
          openModal(MODAL_TYPES.PAGE_COUNT, "Update Progress", userBook);
        },
      },
      {
        text: "Request Extension",
        clickHandler: () => {
          // TODO: Implement extension functionality
          alert("Extension request functionality to be implemented");
        },
      },
      {
        text: "Message Owner",
        clickHandler: () => {
          // TODO: Implement messaging functionality
          alert("Message functionality to be implemented");
        },
      },
      {
        text: "Return Book",
        clickHandler: () => {
          openModal(MODAL_TYPES.RETURN_BOOK, "Return Book", userBook);
        },
      },
    ];
  },

  currentRead: (currentRead) => [
    {
      text: "Update Progress",
      clickHandler: () => {
        openModal(MODAL_TYPES.PAGE_COUNT, "Update Progress", currentRead);
      },
    },
    {
      text: "Mark as Complete",
      clickHandler: () => {
        // TODO: Implement mark complete functionality
        alert("Mark as complete functionality to be implemented");
      },
    },
    {
      text: "Book Details",
      clickHandler: () => {
        // TODO: Implement book details functionality
        openModal(MODAL_TYPES.BOOK_DETAILS, "Book Details", currentRead);
      },
    },
    {
      text: "Return Book",
      clickHandler: () => {
        openModal(MODAL_TYPES.RETURN_BOOK, "Return Book", currentRead);
      },
    },
  ],

  booksToFriends: (getUserBookById) => {
    const userBook = getUserBookById(book_id);
    return [
      {
        text: "View Progress",
        clickHandler: () => {
          // TODO: Implement view progress functionality
          alert("View progress functionality to be implemented");
        },
      },
      {
        text: "Message Borrower",
        clickHandler: () => {
          // TODO: Implement messaging functionality
          alert("Message functionality to be implemented");
        },
      },
      {
        text: "Request Return",
        clickHandler: () => {
          // TODO: Implement request return functionality
          alert("Request return functionality to be implemented");
        },
      },
    ];
  },

  bookRequests: (getUserBookById) => {
    const userBook = getUserBookById(book_id);
    return [
      {
        text: "View Requests",
        clickHandler: () => {
          openModal(MODAL_TYPES.VIEW_REQUESTS, "Book Requests", userBook);
        },
      },
      {
        text: "Message Requesters",
        clickHandler: () => {
          // TODO: Implement messaging functionality
          alert("Message functionality to be implemented");
        },
      },
      {
        text: "Remove from Library",
        clickHandler: () => {
          // TODO: Implement remove book functionality
          alert("Remove book functionality to be implemented");
        },
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
    default:
      return null;
  }
};
