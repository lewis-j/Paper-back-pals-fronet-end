class ModalType {
  constructor(value, title) {
    this.value = value;
    this.title = title;
  }
  toString() {
    return this.value;
  }
}

export const MODAL_TYPES = {
  // Book Reading Progress
  VIEW_BOOK_DETAILS: new ModalType("VIEW_BOOK_DETAILS", "Book Details"),
  VIEW_READING_PROGRESS: new ModalType(
    "VIEW_READING_PROGRESS",
    "Reading Progress"
  ),
  UPDATE_PAGE_COUNT: new ModalType("UPDATE_PAGE_COUNT", "Update Page Count"),
  SET_CURRENT_READ: new ModalType("SET_CURRENT_READ", "Set Current Read"),
  COMPLETE_BOOK: new ModalType("COMPLETE_BOOK", "Complete Book"),

  // Borrow Request Flow
  VIEW_BORROW_REQUESTS: new ModalType(
    "VIEW_BORROW_REQUESTS",
    "View Borrow Requests"
  ),
  CREATE_BORROW_REQUEST: new ModalType(
    "CREATE_BORROW_REQUEST",
    "Create Borrow Request"
  ),
  CONFIRM_BORROW_REQUEST: new ModalType(
    "CONFIRM_BORROW_REQUEST",
    "Confirm Borrow Request"
  ),
  DECLINE_LENDING_REQUEST: new ModalType(
    "DECLINE_LENDING_REQUEST",
    "Decline Lending Request"
  ),
  CANCEL_BORROW_REQUEST: new ModalType(
    "CANCEL_BORROW_REQUEST",
    "Cancel Borrow Request"
  ),

  // Book Handover Flow
  LENDER_CONFIRM_DROP_OFF: new ModalType(
    "LENDER_CONFIRM_DROP_OFF",
    "Lender Confirm Drop Off"
  ),
  BORROWER_CONFIRM_PICKUP: new ModalType(
    "BORROWER_CONFIRM_PICKUP",
    "Borrower Confirm Pickup"
  ),

  // Book Return Flow
  REQUEST_BORROW_EXTENSION: new ModalType(
    "REQUEST_BORROW_EXTENSION",
    "Request Extension"
  ),
  REQUEST_BOOK_RETURN: new ModalType("REQUEST_BOOK_RETURN", "Request Return"),
  INITIATE_BOOK_RETURN: new ModalType(
    "INITIATE_BOOK_RETURN",
    "Initiate Book Return"
  ),
  BORROWER_CONFIRM_RETURN: new ModalType(
    "BORROWER_CONFIRM_RETURN",
    "Borrower Confirm Return"
  ),
  LENDER_CONFIRM_RETURN: new ModalType(
    "LENDER_CONFIRM_RETURN",
    "Lender Confirm Return"
  ),

  // Library Management
  REMOVE_FROM_LIBRARY: new ModalType(
    "REMOVE_FROM_LIBRARY",
    "Remove from Library"
  ),

  // Communication
  OPEN_CHAT: new ModalType("OPEN_CHAT", "Open Chat"),
};
