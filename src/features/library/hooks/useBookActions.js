import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPage } from "../../../features/library";
import {
  cancelBorrowRequest as cancelBorrowRequestAction,
  declineLendingRequest as declineLendingRequestAction,
  createBookRequest,
  deleteUserBook,
  updateCurrentRead,
  updateBorrowRequestStatus,
  updateLendRequestStatus,
  selectRequestById,
} from "../userBooksSlice";
import {
  markAsRead,
  selectNotificationByRequestRefIdCreator,
} from "../../Notifications/notificationsSlice";
import REQUEST_STATUS from "../../../data/requestStatus";
// Constants
const REQUEST_OWNER = {
  BORROWER: "borrower",
  LENDER: "lender",
};

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

  // Main request handling function
  const requestActionAndMarkNotificationAsRead = async (
    request_id,
    requestOwner,
    newStatus,
    errorMessage
  ) => {
    try {
      // Handle the request update
      let requestUpdateSuccess = false;
      if (requestOwner === REQUEST_OWNER.BORROWER) {
        requestUpdateSuccess = await dispatchAction(
          updateBorrowRequestStatus({ request_id, status: newStatus }),
          errorMessage
        );
      } else if (requestOwner === REQUEST_OWNER.LENDER) {
        requestUpdateSuccess = await dispatchAction(
          updateLendRequestStatus({ request_id, status: newStatus }),
          errorMessage
        );
      } else {
        console.error("Invalid request owner", requestOwner);
        return false;
      }

      // Only mark notification as read if request update was successful
      if (requestUpdateSuccess) {
        const notification_id = selectNotificationByRequestRefId(request_id);
        console.log("notification_id", notification_id);
        return await dispatchAction(
          markAsRead(notification_id),
          "error in mark notification as read"
        );
      }

      return false;
    } catch (error) {
      console.error(errorMessage, error);
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
  const createBorrowRequest = (userBookId) =>
    dispatchAction(createBookRequest(userBookId));

  const confirmBorrowRequest = (request_id) =>
    requestActionAndMarkNotificationAsRead(
      request_id,
      REQUEST_OWNER.BORROWER,
      REQUEST_STATUS.ACCEPTED,
      "error in confirmBorrowRequest"
    );

  const confirmLenderDropOff = (request_id) =>
    requestActionAndMarkNotificationAsRead(
      request_id,
      REQUEST_OWNER.LENDER,
      REQUEST_STATUS.SENDING,
      "error in confirmLenderDropOff"
    );

  const confirmBorrowerPickup = (request_id) =>
    requestActionAndMarkNotificationAsRead(
      request_id,
      REQUEST_OWNER.BORROWER,
      REQUEST_STATUS.CHECKED_OUT,
      "error in confirmBorrowerPickup"
    );

  const confirmBorrowerDropOff = (request_id) =>
    requestActionAndMarkNotificationAsRead(
      request_id,
      REQUEST_OWNER.BORROWER,
      REQUEST_STATUS.RETURNING,
      "error in confirmBorrowerDropOff"
    );

  const confirmLenderPickup = (request_id) =>
    requestActionAndMarkNotificationAsRead(
      request_id,
      REQUEST_OWNER.LENDER,
      REQUEST_STATUS.RETURNED,
      "error in confirmLenderPickup"
    );

  const markBookAsDue = (request_id) =>
    requestActionAndMarkNotificationAsRead(
      request_id,
      REQUEST_OWNER.LENDER,
      REQUEST_STATUS.IS_DUE,
      "error in markBookAsDue"
    );

  const cancelBorrowRequest = (request_id) =>
    dispatchAction(
      cancelBorrowRequestAction(request_id),
      "error in cancelPendingBorrowRequest"
    );

  const declineLendingRequest = (request_id) =>
    dispatchAction(
      declineLendingRequestAction(request_id),
      "error in declineLendingRequest"
    );

  const extendBorrow = (request_id) => alert("feature on the way");
  // dispatchAction(extendBorrowRequest(request_id), "error in extendBorrow");

  return {
    // Library Management
    deleteBookFromLibrary,
    setCurrentRead,
    // Reading Progress
    updateReadingProgress,
    completeBook,
    // Borrowing/Lending
    confirmBorrowRequest,
    createBorrowRequest,
    confirmLenderDropOff,
    confirmBorrowerPickup,
    confirmBorrowerDropOff,
    confirmLenderPickup,
    markBookAsDue,
    extendBorrow,
    //remove request Borrower/Lender
    cancelBorrowRequest,
    declineLendingRequest,
  };
};
