import { useDispatch } from "react-redux";
import { updateCurrentPage } from "../../../features/library";
import {
  cancelBorrowRequest,
  createBookRequest,
  deleteUserBook,
  updateCurrentRead,
  removeBookRequest,
  updateBorrowRequestStatus,
  updateLendRequestStatus,
} from "../userBooksSlice";
import {
  markAsRead,
  selectNotificationByRequestRefIdCreator,
} from "../../Notifications/notificationsSlice";
import { useSelector } from "react-redux";

export const useBookActions = () => {
  const dispatch = useDispatch();
  const selectNotificationByRequestRefId = useSelector(
    selectNotificationByRequestRefIdCreator
  );

  // Helper function to handle dispatch operations
  const dispatchAction = async (action, errorMessage = null) => {
    try {
      console.log("dispatching action", action);
      await dispatch(action).unwrap();
      return true;
    } catch (error) {
      if (errorMessage) console.error(errorMessage, error);
      return false;
    }
  };

  // Library Management
  const deleteBookFromLibrary = (userBookId) =>
    dispatchAction(deleteUserBook(userBookId));

  const setCurrentRead = (userBookId) =>
    dispatchAction(updateCurrentRead(userBookId));

  // Reading Progress Actions
  const updateReadingProgress = (request_id, currentPage, userBook_id) =>
    dispatchAction(updateCurrentPage({ request_id, currentPage, userBook_id }));

  const completeBook = (request_id, userBook_id, pageCount) =>
    dispatchAction(
      updateCurrentPage({
        request_id,
        userBook_id,
        currentPage: pageCount,
      })
    );

  // Borrowing/Lending Actions
  const REQUEST_OWNER = {
    BORROWER: "borrower",
    LENDER: "lender",
  };
  const requestActionAndMarkNotificationAsRead = (
    request_id,
    requestOwner,
    errorMessage
  ) => {
    //get notification_id from request
    const notification_id = selectNotificationByRequestRefId(request_id);
    //mark notification as read
    const isNotificationMarkedAsRead = dispatchAction(
      markAsRead(notification_id),
      "error in mark notification as read"
    );
    if (isNotificationMarkedAsRead) {
      if (requestOwner === REQUEST_OWNER.BORROWER) {
        return dispatchAction(
          updateBorrowRequestStatus(request_id),
          errorMessage
        );
      } else if (requestOwner === REQUEST_OWNER.LENDER) {
        return dispatchAction(
          updateLendRequestStatus(request_id),
          errorMessage
        );
      } else {
        console.error("Invalid request owner", requestOwner);
        return false;
      }
    } else {
      return false;
    }
  };

  const createBorrowRequest = (userBookId) =>
    dispatchAction(createBookRequest(userBookId));

  const acceptBorrowRequest = (request_id) => {
    requestActionAndMarkNotificationAsRead(
      request_id,
      REQUEST_OWNER.BORROWER,
      "error in acceptBorrowRequest"
    );
  };
  const confirmLenderDropOff = (request_id) =>
    requestActionAndMarkNotificationAsRead(
      request_id,
      REQUEST_OWNER.LENDER,
      updateLendRequestStatus(request_id),
      "error in confirmLenderDropOff"
    );

  const confirmBorrowerPickup = (request_id) =>
    requestActionAndMarkNotificationAsRead(
      request_id,
      REQUEST_OWNER.BORROWER,
      "error in confirmBorrowerPickup"
    );

  const returnBorrowedBook = (request_id) =>
    requestActionAndMarkNotificationAsRead(
      request_id,
      REQUEST_OWNER.BORROWER,
      "error in returnBorrowedBook"
    );

  const confirmBorrowerDropOff = (request_id) =>
    requestActionAndMarkNotificationAsRead(
      request_id,
      REQUEST_OWNER.BORROWER,
      "error in confirmBorrowerDropOff"
    );

  const confirmLenderPickup = (request_id) =>
    requestActionAndMarkNotificationAsRead(
      request_id,
      REQUEST_OWNER.LENDER,
      "error in confirmLenderPickup"
    );

  const cancelPendingBorrowRequest = (request_id) =>
    dispatchAction(
      cancelBorrowRequest(request_id),
      "error in cancelPendingBorrowRequest"
    );

  return {
    // Library Management
    deleteBookFromLibrary,
    setCurrentRead,
    // Reading Progress
    updateReadingProgress,
    completeBook,
    // Borrowing/Lending
    createBorrowRequest,
    acceptBorrowRequest,
    confirmLenderDropOff,
    confirmBorrowerPickup,
    returnBorrowedBook,
    confirmBorrowerDropOff,
    confirmLenderPickup,
    cancelPendingBorrowRequest,
  };
};
