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
  initiateBookReturnRequest,
  cancelBookReturnRequest,
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
      await dispatch(action).unwrap();
      return true;
    } catch (error) {
      if (errorMessage) console.error(errorMessage, error);
      return false;
    }
  };
  //TODO: add this back in
  // const confirmBorrowRequestAndMarkNotificationAsRead = async (
  //   request_id,
  //   isPictureRequired
  // ) => {
  //   if (isPictureRequired) {
  //     //mark
  //   } else {
  //     requestActionAndMarkNotificationAsRead(
  //       request_id,
  //       REQUEST_OWNER.BORROWER,
  //       REQUEST_STATUS.ACCEPTED,
  //       "error in confirmBorrowRequest"
  //     );
  //   }
  // };

  const requestBookReturn = async (request_id) => {
    return await dispatchAction(
      initiateBookReturnRequest({
        request_id,
        status: REQUEST_STATUS.CHECKED_OUT,
      }),
      "error in requestBookReturn"
    );
  };

  const cancelBookReturn = async (request_id) => {
    return await dispatchAction(
      cancelBookReturnRequest(request_id),
      "error in cancelBookReturn"
    );
  };

  // Main request handling function
  const requestActionAndMarkNotificationAsRead = async (
    request_id,
    requestOwner,
    currentStatus,
    nextStatus,
    errorMessage,
    isPictureRequired = false
  ) => {
    try {
      // Handle the request update
      let requestUpdateSuccess = false;
      if (requestOwner === REQUEST_OWNER.BORROWER) {
        if (isPictureRequired) {
          // Handle the logic when a picture is required
          // For example, you might want to perform additional actions here
        }
        requestUpdateSuccess = await dispatchAction(
          updateBorrowRequestStatus({ request_id, status: nextStatus }),
          errorMessage
        );
      } else if (requestOwner === REQUEST_OWNER.LENDER) {
        requestUpdateSuccess = await dispatchAction(
          updateLendRequestStatus({ request_id, status: nextStatus }),
          errorMessage
        );
      } else {
        console.error("Invalid request owner", requestOwner);
        return false;
      }

      // Only mark notification as read if request update was successful
      if (requestUpdateSuccess) {
        const notification = selectNotificationByRequestRefId(
          request_id,
          currentStatus
        );
        if (notification && !notification.isRead) {
          return await dispatchAction(
            markAsRead(notification._id),
            "error in mark notification as read"
          );
        }
        console.warn("notification not found");
        return true;
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

  const confirmBorrowRequest = (request_id, isPictureRequired) =>
    requestActionAndMarkNotificationAsRead(
      request_id,
      REQUEST_OWNER.LENDER,
      REQUEST_STATUS.CHECKED_IN,
      REQUEST_STATUS.ACCEPTED,
      "error in confirmBorrowRequest",
      isPictureRequired
    );

  const confirmLenderDropOff = (request_id) =>
    requestActionAndMarkNotificationAsRead(
      request_id,
      REQUEST_OWNER.LENDER,
      REQUEST_STATUS.ACCEPTED,
      REQUEST_STATUS.SENDING,
      "error in confirmLenderDropOff"
    );

  const confirmBorrowerPickup = (request_id) =>
    requestActionAndMarkNotificationAsRead(
      request_id,
      REQUEST_OWNER.BORROWER,
      REQUEST_STATUS.SENDING,
      REQUEST_STATUS.CHECKED_OUT,
      "error in confirmBorrowerPickup"
    );

  const confirmBorrowerReturn = (request_id) =>
    requestActionAndMarkNotificationAsRead(
      request_id,
      REQUEST_OWNER.BORROWER,
      REQUEST_STATUS.IS_DUE,
      REQUEST_STATUS.RETURNING,
      "error in confirmBorrowerReturn"
    );

  const confirmLenderReturn = (request_id) =>
    requestActionAndMarkNotificationAsRead(
      request_id,
      REQUEST_OWNER.LENDER,
      REQUEST_STATUS.RETURNING,
      REQUEST_STATUS.RETURNED,
      "error in confirmLenderReturn"
    );

  const initiateBookReturn = (request_id) =>
    requestActionAndMarkNotificationAsRead(
      request_id,
      REQUEST_OWNER.BORROWER,
      REQUEST_STATUS.CHECKED_OUT,
      REQUEST_STATUS.IS_DUE,
      "error in initiateBookReturn"
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
    initiateBookReturn,
    confirmBorrowerReturn,
    confirmLenderReturn,
    extendBorrow,
    requestBookReturn,
    cancelBookReturn,
    //remove request Borrower/Lender
    cancelBorrowRequest,
    declineLendingRequest,
  };
};
