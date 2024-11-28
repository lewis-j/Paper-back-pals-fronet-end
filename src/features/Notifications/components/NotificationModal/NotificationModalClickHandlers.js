import { MODAL_TYPES } from "../../../library/config/modals";
import requestStatus from "../../../../data/requestStatus";
export const runBookRequestAction = (modalActions, userBook) => {
  console.log("userBook", userBook);

  if (userBook.isOwned) {
    switch (userBook.request.status) {
      case requestStatus.ACCEPTED:
        console.log("opening accept modal");
        modalActions.lenderConfirmDropOff(userBook);
        break;
      default:
        return;
    }
  } else {
    switch (userBook.request.status) {
      case requestStatus.SENDING:
        console.log("opening sending modal");
        modalActions.borrowerConfirmPickup(userBook);
        break;
      default:
        return;
    }
  }
};
