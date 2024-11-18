import { MODAL_TYPES } from "./modalTypes";

export const MODAL_CONFIG = {
  // Book reading actions
  [MODAL_TYPES.PAGE_COUNT]: {
    title: "Update Progress",
    component: "ChangePageCountForm",
  },
  [MODAL_TYPES.CURRENT_READ]: {
    title: "Set Current Read",
    component: "CurrentReadForm",
  },
  [MODAL_TYPES.MARK_COMPLETE]: {
    title: "Mark as Complete",
    component: "MarkCompleteForm",
  },
  [MODAL_TYPES.USER_BOOK_DETAILS]: {
    title: "User Book Details",
    component: "UserBookDetails",
  },
  [MODAL_TYPES.VIEW_PROGRESS]: {
    title: "Reading Progress",
    component: "ViewProgressForm",
  },

  // Book lending actions
  [MODAL_TYPES.RETURN_BOOK]: {
    title: "Return Book",
    component: "ReturnBookForm",
  },
  [MODAL_TYPES.EXTEND_BORROW]: {
    title: "Request Extension",
    component: "ExtendBorrowForm",
  },
  [MODAL_TYPES.REQUEST_RETURN]: {
    title: "Request Return",
    component: "RequestReturnForm",
  },

  // Request management
  [MODAL_TYPES.VIEW_REQUESTS]: {
    title: "Book Requests",
    component: "UserBookRequest",
  },
  [MODAL_TYPES.CONFIRM_REQUEST]: {
    title: "Confirm Request",
    component: "ConfirmRequest",
  },

  // Book management
  [MODAL_TYPES.REMOVE_BOOK]: {
    title: "Remove Book",
    component: "RemoveBookForm",
  },

  // Communication
  [MODAL_TYPES.SEND_MESSAGE]: {
    title: "Send Message",
    component: "SendMessageForm",
  },
};
