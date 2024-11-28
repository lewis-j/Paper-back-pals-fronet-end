import { useDispatch } from "react-redux";
import { MODAL_TYPES } from "../config/modals";
import { openChatWithFriend } from "../../Chat/chatSlice";

export const useModalActions = (openModal) => {
  const dispatch = useDispatch();

  const openChatModal = async (userId) => {
    dispatch(openChatWithFriend(userId));
  };

  return {
    openModal,
    // Reading Progress
    updatePageCount: (userBook) =>
      openModal(MODAL_TYPES.UPDATE_PAGE_COUNT, { userBook }),
    setCurrentRead: (userBook) =>
      openModal(MODAL_TYPES.SET_CURRENT_READ, { userBook }),
    markBookComplete: (userBook) =>
      openModal(MODAL_TYPES.COMPLETE_BOOK, { userBook }),
    viewBookDetails: (bookInfo) =>
      openModal(MODAL_TYPES.VIEW_BOOK_DETAILS, bookInfo),
    viewUserBookDetails: (userBook) =>
      openModal(MODAL_TYPES.VIEW_BOOK_DETAILS, { userBook }),
    viewReadingProgress: (userBook) =>
      openModal(MODAL_TYPES.VIEW_READING_PROGRESS, { userBook }),

    // Borrowing & Lending
    returnBorrowedBook: (userBook) =>
      openModal(MODAL_TYPES.RETURN_BORROWED_BOOK, { userBook }),
    requestBorrowExtension: (userBook) =>
      openModal(MODAL_TYPES.REQUEST_BORROW_EXTENSION, { userBook }),
    requestBookReturn: (userBook) =>
      openModal(MODAL_TYPES.REQUEST_BOOK_RETURN, { userBook }),

    // Request Management
    createBorrowRequest: (userBook) =>
      openModal(MODAL_TYPES.CREATE_BORROW_REQUEST, { userBook }),
    viewBorrowRequests: (userBook) =>
      openModal(MODAL_TYPES.VIEW_BORROW_REQUESTS, { userBook }),
    confirmBorrowRequest: (data) =>
      openModal(MODAL_TYPES.CONFIRM_BORROW_REQUEST, data),
    cancelBorrowRequest: (userBook) =>
      openModal(MODAL_TYPES.CANCEL_BORROW_REQUEST, { userBook }),
    lenderConfirmDropOff: (userBook) => {
      console.log("ownerConfirmDropOff", userBook);
      openModal(MODAL_TYPES.LENDER_CONFIRM_DROP_OFF, { userBook });
    },
    borrowerConfirmPickup: (userBook) =>
      openModal(MODAL_TYPES.BORROWER_CONFIRM_PICKUP, { userBook }),

    // Library Management
    removeFromLibrary: (userBook) =>
      openModal(MODAL_TYPES.REMOVE_FROM_LIBRARY, { userBook }),

    // Communication
    openChat: (userId) => {
      openChatModal(userId);
    },
  };
};
