import ChangePageCountForm from "../../features/library/components/ModalForms/ChangePageCountForm";
import ReturnBookForm from "../../features/library/components/ModalForms/ReturnBookForm";

// Constants
const MODAL_TYPES = {
  PAGE_COUNT: "pageCount",
  RETURN_BOOK: "returnBook",
  CURRENT_READ: "currentRead",
  BOOK_DETAILS: "bookDetails",
  SEND_MESSAGE: "sendMessage",
  EXTEND_BORROW: "extendBorrow",
  MARK_COMPLETE: "markComplete",
};

// Menu configurations for different sections
export const getMenuItems = (book_id) => (openModal) => ({
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
        alert("Book details functionality to be implemented");
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
});

// Modal content components
export const getModalContent = (modal, onClose) => {
  console.log("modal", modal);
  switch (modal.type) {
    case MODAL_TYPES.PAGE_COUNT:
      return <ChangePageCountForm userBook={modal.data} onClose={onClose} />;
    case MODAL_TYPES.RETURN_BOOK:
      return <ReturnBookForm userBook={modal.data} onClose={onClose} />;
    default:
      return null;
  }
};
