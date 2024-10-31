import ChangePageCountForm from "../../features/library/components/ModalForms/ChangePageCountForm";
import ReturnBookForm from "../../features/library/components/ModalForms/ReturnBookForm";

// Constants
const MODAL_TYPES = {
  PAGE_COUNT: "pageCount",
  RETURN_BOOK: "returnBook",
  CURRENT_READ: "currentRead",
};

// Menu configurations for different sections
export const getMenuItems = (book_id) => (openModal) => ({
  booksFromFriends: (getUserBookById) => [
    {
      text: "Current Read",
      clickHandler: () => {
        openModal(
          MODAL_TYPES.CURRENT_READ,
          "Change Current Read",
          getUserBookById(book_id)
        );
      },
    },
    {
      text: "Update Page Count",
      clickHandler: () => {
        openModal(
          MODAL_TYPES.PAGE_COUNT,
          "Update Page Count",
          getUserBookById(book_id)
        );
      },
    },
    {
      text: "Return Book",
      clickHandler: () => {
        openModal(
          MODAL_TYPES.RETURN_BOOK,
          "Confirm Book Return",
          getUserBookById(book_id)
        );
      },
    },
  ],

  currentRead: (currentRead) => [
    {
      text: "Update Page Count",
      clickHandler: () => {
        openModal(MODAL_TYPES.PAGE_COUNT, "Update Page Count", currentRead);
      },
    },
    {
      text: "Return Book",
      clickHandler: () => {
        openModal(MODAL_TYPES.RETURN_BOOK, "Return Book", currentRead);
      },
    },
  ],

  booksToFriends: (getUserBookById) => [
    {
      text: "Message Friend",
      clickHandler: () => {
        // TODO: Implement messaging functionality
        alert(
          "Message functionality to be implemented",
          getUserBookById(book_id)
        );
      },
    },
    {
      text: "View Details",
      clickHandler: () => {
        // TODO: Implement view details functionality
        alert(
          "View details functionality to be implemented",
          getUserBookById(book_id)
        );
      },
    },
  ],
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
