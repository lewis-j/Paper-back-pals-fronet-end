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
  // Reading Progress
  UPDATE_PAGE_COUNT: new ModalType("UPDATE_PAGE_COUNT", "Update Page Count"),
  SET_CURRENT_READ: new ModalType("SET_CURRENT_READ", "Set Current Read"),
  COMPLETE_BOOK: new ModalType("COMPLETE_BOOK", "Complete Book"),
  VIEW_BOOK_DETAILS: new ModalType("VIEW_BOOK_DETAILS", "Book Details"),
  VIEW_READING_PROGRESS: new ModalType(
    "VIEW_READING_PROGRESS",
    "Reading Progress"
  ),

  // Borrowing & Lending
  CREATE_BORROW_REQUEST: new ModalType(
    "CREATE_BORROW_REQUEST",
    "Create Borrow Request"
  ),
  RETURN_BORROWED_BOOK: new ModalType("RETURN_BORROWED_BOOK", "Return Book"),
  REQUEST_BORROW_EXTENSION: new ModalType(
    "REQUEST_BORROW_EXTENSION",
    "Request Extension"
  ),
  REQUEST_BOOK_RETURN: new ModalType("REQUEST_BOOK_RETURN", "Request Return"),

  // Request Management
  VIEW_BORROW_REQUESTS: new ModalType(
    "VIEW_BORROW_REQUESTS",
    "View Borrow Requests"
  ),
  CONFIRM_BORROW_REQUEST: new ModalType(
    "CONFIRM_BORROW_REQUEST",
    "Confirm Borrow Request"
  ),
  CANCEL_BORROW_REQUEST: new ModalType(
    "CANCEL_BORROW_REQUEST",
    "Cancel Borrow Request"
  ),
  LENDER_CONFIRM_DROP_OFF: new ModalType(
    "LENDER_CONFIRM_DROP_OFF",
    "Lender Confirm Drop Off"
  ),
  BORROWER_CONFIRM_PICKUP: new ModalType(
    "BORROWER_CONFIRM_PICKUP",
    "Borrower Confirm Pickup"
  ),

  // Library Management
  REMOVE_FROM_LIBRARY: new ModalType(
    "REMOVE_FROM_LIBRARY",
    "Remove from Library"
  ),

  // Communication
  OPEN_CHAT: new ModalType("OPEN_CHAT", "Open Chat"),
};
