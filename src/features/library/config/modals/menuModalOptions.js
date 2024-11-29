import { useSelector } from "react-redux";
import { BaseForm } from "../../components/ModalForms/BookModalForm/BookModalForm";
import BookModalForm from "../../components/ModalForms/BookModalForm/BookModalForm";
import FormContainer from "../../components/ModalForms/Shared/FormContainer/FormContainer";
import { useBookActions } from "../../hooks/useBookActions";
import { MODAL_TYPES } from "./modalTypes";
import * as asyncStatus from "../../../../data/asyncStatus";

const createFormModal = (label, Component, props) => ({
  label,
  component: <Component {...props} />,
});

const getModalConfig = (
  type,
  modalData,
  actions,
  isSubmitting,
  error,
  onClose
) => {
  const { userBook } = modalData;
  const commonProps = {
    userBook,
    onClose,
    isSubmitting,
    error,
  };

  switch (type) {
    case MODAL_TYPES.SET_CURRENT_READ.value:
      return createFormModal("Set Current Read", BaseForm, {
        ...commonProps,
        confirmationMsg: `Set current read to ${userBook.book.title}?`,
        buttonText: "Set Current Read",
        loadingText: "Setting Current Read...",
        onConfirm: () => actions.setCurrentRead(userBook._id),
      });
    case MODAL_TYPES.COMPLETE_BOOK.value:
      return createFormModal("Mark book as complete", BaseForm, {
        ...commonProps,
        confirmationMsg: `This will update your progress to ${userBook.book.pageCount} pages, marking the book as complete.`,
        buttonText: "Mark Complete",
        loadingText: "Updating Progress...",
        onConfirm: () =>
          actions.completeBook(
            userBook.request.request_id,
            userBook._id,
            userBook.book.pageCount
          ),
      });

    case MODAL_TYPES.REMOVE_FROM_LIBRARY.value:
      return createFormModal("Remove Book", BaseForm, {
        ...commonProps,
        confirmationMsg: `Are you sure you want to remove "${userBook.book.title}" from your library?`,
        buttonText: "Remove Book",
        loadingText: "Removing...",
        onConfirm: () => actions.deleteBookFromLibrary(userBook._id),
      });

    case MODAL_TYPES.CREATE_BORROW_REQUEST.value:
      return createFormModal("Create Borrow Request", BaseForm, {
        ...commonProps,
        confirmationMsg: `Would you like to request to borrow "${userBook.book.title}" from ${userBook.owner.username}?`,
        buttonText: "Send Borrow Request",
        loadingText: "Sending Request...",
        onConfirm: () => actions.createBorrowRequest(userBook._id),
      });

    case MODAL_TYPES.UPDATE_PAGE_COUNT.value:
      return createFormModal(
        "Update current page",
        BookModalForm.UpdatePageForm,
        {
          ...commonProps,
          onUpdateProgress: actions.updateReadingProgress,
        }
      );

    case MODAL_TYPES.VIEW_BOOK_DETAILS.value:
      return createFormModal(
        "Book Description",
        BookModalForm.BookDetailsView,
        {
          userBook,
          onClose,
        }
      );

    case MODAL_TYPES.VIEW_BORROW_REQUESTS.value:
      return createFormModal(
        "Borrow Requests",
        BookModalForm.BorrowRequestsList,
        {
          ...commonProps,
        }
      );

    case MODAL_TYPES.CONFIRM_BORROW_REQUEST.value:
      return createFormModal("Confirm Borrow Request", BaseForm, {
        ...commonProps,
        confirmationMsg: `Do you want to lend "${userBook.book.title}" to ${userBook.sender.username}?`,
        buttonText: "Confirm Request",
        loadingText: "Confirming...",
        onConfirm: () => actions.confirmBorrowRequest(userBook.request.id),
      });

    case MODAL_TYPES.CANCEL_BORROW_REQUEST.value:
      return createFormModal("Cancel Borrow Request", BaseForm, {
        ...commonProps,
        confirmationMsg: `Are you sure you want to cancel your request for "${userBook.book.title}"?`,
        buttonText: "Cancel Request",
        loadingText: "Canceling Request...",
        onConfirm: () => actions.cancelBorrowRequest(userBook.request.id),
      });

    case MODAL_TYPES.RETURN_BORROWED_BOOK.value:
      return createFormModal("Return Book", BaseForm, {
        ...commonProps,
        confirmationMsg: `Do you want to return ${userBook.book.title} to ${userBook.owner.username}?`,
        buttonText: "Return Book",
        loadingText: "Returning Book...",
        onConfirm: () => actions.returnBook(userBook.request.id),
      });

    case MODAL_TYPES.REQUEST_BORROW_EXTENSION.value:
      return createFormModal("Extend Borrow", BaseForm, {
        ...commonProps,
        confirmationMsg: `Would you like to request a loan extension for "${userBook.book.title}" from ${userBook.owner.username}?`,
        buttonText: "Request Extension",
        loadingText: "Requesting Extension...",
        onConfirm: () => actions.extendBorrow(userBook.request.id),
      });
    case MODAL_TYPES.LENDER_CONFIRM_DROP_OFF.value:
      return createFormModal("Lender Confirm Drop Off", BaseForm, {
        ...commonProps,
        confirmationMsg: `Confirm drop off of "${userBook.book.title}" to ${userBook.sender.username}?`,
        buttonText: "Confirm Drop Off",
        loadingText: "Confirming Drop Off...",
        onConfirm: () => actions.confirmLenderDropOff(userBook.request.id),
      });
    case MODAL_TYPES.BORROWER_CONFIRM_PICKUP.value:
      return createFormModal("Borrower Confirm Pickup", BaseForm, {
        ...commonProps,
        confirmationMsg: `Confirm pickup of "${userBook.book.title}" from ${userBook.owner.username}?`,
        buttonText: "Confirm Pickup",
        loadingText: "Confirming Pickup...",
        onConfirm: () => actions.confirmBorrowerPickup(userBook.request.id),
      });

    default:
      return null;
  }
};

// Modal content component
export const BookModalContent = ({ modal, onClose }) => {
  const actions = useBookActions();
  const status = useSelector((state) => state.userBooks.status);
  const error = useSelector((state) => state.userBooks.error);
  const isSubmitting = status === asyncStatus.LOADING;

  const config = getModalConfig(
    modal.type,
    modal.data,
    actions,
    isSubmitting,
    error,
    onClose
  );

  // Defensive rendering
  if (!config) {
    return null;
  }

  const label = config.label || modal.title || "";

  return (
    <FormContainer bookData={modal.data.userBook} label={label}>
      {config.component}
    </FormContainer>
  );
};
