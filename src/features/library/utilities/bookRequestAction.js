import requestStatus from "../../../data/requestStatus";

export const runBookRequestAction = (modalActions, userBook) => {
  console.log("userBook", userBook);

  if (userBook.isOwned) {
    switch (userBook.request.status) {
      case requestStatus.CHECKED_IN:
        console.log("opening checked in modal");
        modalActions.confirmBorrowRequest(userBook);
        break;
      case requestStatus.ACCEPTED:
        console.log("opening accept modal");
        modalActions.lenderConfirmDropOff(userBook);
        break;
      case requestStatus.RETURNING:
        console.log("opening returning modal");
        modalActions.lenderConfirmReturn(userBook);
        break;
      default:
        return null;
    }
  } else {
    switch (userBook.request.status) {
      case requestStatus.SENDING:
        console.log("opening sending modal");
        modalActions.borrowerConfirmPickup(userBook);
        break;
      case requestStatus.IS_DUE:
        console.log("opening is due modal");
        modalActions.borrowerConfirmReturn(userBook);
        break;
      default:
        return null;
    }
  }
};
