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
    // Book reading actions
    updateProgress: (userBook) => openModal(MODAL_TYPES.PAGE_COUNT, userBook),
    setCurrentRead: (userBook) => openModal(MODAL_TYPES.CURRENT_READ, userBook),
    markComplete: (userBook) => openModal(MODAL_TYPES.MARK_COMPLETE, userBook),
    viewBookDetails: (bookInfo) =>
      openModal(MODAL_TYPES.BOOK_DETAILS, bookInfo),
    viewUserBookDetails: (userBook) =>
      openModal(MODAL_TYPES.USER_BOOK_DETAILS, userBook),

    // Book lending actions
    returnBook: (userBook) => openModal(MODAL_TYPES.RETURN_BOOK, userBook),
    requestExtension: (userBook) =>
      openModal(MODAL_TYPES.EXTEND_BORROW, userBook),
    requestReturn: (userBook) =>
      openModal(MODAL_TYPES.REQUEST_RETURN, userBook),

    // Request management
    viewRequests: (userBook) => openModal(MODAL_TYPES.VIEW_REQUESTS, userBook),
    confirmRequest: (data) => openModal(MODAL_TYPES.CONFIRM_REQUEST, data),
    removeRequest: (userBook) =>
      openModal(MODAL_TYPES.REMOVE_REQUEST, userBook),

    // Book management
    removeBook: (userBook) => openModal(MODAL_TYPES.REMOVE_BOOK, userBook),
    viewProgress: (userBook) => {
      openModal(MODAL_TYPES.VIEW_PROGRESS, userBook);
    },

    // Communication
    sendMessage: (userId) => {
      openChatModal(userId);
    },
  };
};
