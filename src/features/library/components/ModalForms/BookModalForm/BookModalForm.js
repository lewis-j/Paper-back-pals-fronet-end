import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as asyncStatus from "../../../../../data/asyncStatus";
import styles from "./BookModalForm.module.scss";
import { Loading } from "../../../../../components";
import { useModal } from "../../../../../context/ModalContext";
import { MODAL_TYPES } from "../../../config/modals";

const ReadingProgressView = ({ userBook, onClose }) => {
  const { book, currentPage } = userBook;
  const pagesRemaining = book.pageCount - currentPage;

  return (
    <>
      <div className={styles.statsGrid}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Pages Remaining</span>
          <span className={styles.statValue}>{pagesRemaining}</span>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button type="button" onClick={onClose} className={styles.cancelButton}>
          Close
        </button>
      </div>
    </>
  );
};

const UpdatePageForm = ({ userBook, onClose, onUpdateProgress }) => {
  const { _id: userBook_id, request, currentPage } = userBook;
  const [value, setValue] = useState(currentPage);

  if (!userBook) return null;

  const handleSubmit = () => {
    onUpdateProgress(request.request_id, value, userBook_id);
    onClose();
  };

  return (
    <>
      <input
        className={styles.pageInput}
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        min="0"
        max={userBook.book.pageCount}
      />
      <button
        className={styles.submitButton}
        type="submit"
        onClick={handleSubmit}
      >
        Update Progress
      </button>
    </>
  );
};

const CompleteBookForm = ({
  userBook,
  onClose,
  onComplete,
  isSubmitting,
  error,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onComplete(
      userBook.request.request_id,
      userBook._id,
      userBook.book.pageCount
    );
    if (success) {
      onClose();
    }
  };

  return (
    <>
      <p className={styles.confirmation}>
        This will update your progress to {userBook.book.pageCount} pages,
        marking the book as complete.
      </p>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <div className={styles.buttonContainer}>
        <button
          type="button"
          onClick={onClose}
          className={styles.cancelButton}
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? "Updating Progress..." : "Mark Complete"}
        </button>
      </div>
    </>
  );
};

const DeleteBookForm = ({
  userBook,
  onClose,
  onDelete,
  isSubmitting,
  error,
}) => {
  const handleRemove = async () => {
    const success = await onDelete(userBook._id);
    if (success) {
      onClose();
    }
  };

  return (
    <>
      <p className={styles.confirmation}>
        Are you sure you want to remove "{userBook.book.title}" from your
        library?
      </p>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <div className={styles.buttonContainer}>
        <button
          type="button"
          onClick={onClose}
          className={styles.cancelButton}
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
          onClick={handleRemove}
        >
          {isSubmitting ? "Removing..." : "Remove Book"}
        </button>
      </div>
    </>
  );
};

const ReturnBookForm = ({
  userBook,
  onClose,
  onReturn,
  isSubmitting,
  error,
}) => {
  const userBookAsyncStatus = useSelector((state) => state.userBooks.status);

  if (!userBook) return null;
  if (userBookAsyncStatus === asyncStatus.LOADING) return <Loading />;

  const handleReturnBook = async () => {
    const success = await onReturn(userBook.request.request_id);
    if (success) {
      onClose();
    }
  };

  return (
    <>
      <p className={styles.confirmation}>
        Do you want to return {userBook.book.title} to {userBook.owner.username}
        ?
      </p>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <div className={styles.buttonContainer}>
        <button
          type="button"
          onClick={onClose}
          className={styles.cancelButton}
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
          onClick={handleReturnBook}
        >
          {isSubmitting ? "Returning Book..." : "Return Book"}
        </button>
      </div>
    </>
  );
};

const BookDetailsView = ({ userBook, onClose }) => {
  const userBookAsyncStatus = useSelector((state) => state.userBooks.status);

  if (!userBook) return null;
  if (userBookAsyncStatus === asyncStatus.LOADING) return <Loading />;

  return (
    <>
      <p className={styles.description}>{userBook.book.description}</p>
      <div className={styles.buttonContainer}>
        <button type="button" onClick={onClose} className={styles.cancelButton}>
          Close
        </button>
      </div>
    </>
  );
};

const BorrowRequestsList = ({ userBook, onClose }) => {
  const { openModal } = useModal();
  const requests = userBook.request;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleRequestClick = (request) => {
    onClose();
    openModal(MODAL_TYPES.CONFIRM_REQUEST, {
      userBook,
      request,
    });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.requestList}>
          {requests.map((request) => (
            <div
              key={request._id}
              className={`${styles.requestCard} ${styles.clickable}`}
              onClick={() => handleRequestClick(request)}
            >
              <div className={styles.userInfo}>
                <img
                  src={request.sender.profilePic}
                  alt={request.sender.username}
                  className={styles.profilePic}
                />
                <h4>{request.sender.username}</h4>
                <span className={styles.date}>
                  {formatDate(request.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
        <button onClick={onClose} className={styles.closeButton}>
          Close
        </button>
      </div>
    </>
  );
};

const ConfirmBorrowRequestForm = ({
  userBook,
  requestData,
  onClose,
  onConfirmRequest,
  isSubmitting,
  error,
}) => {
  if (!userBook || !requestData) return null;

  const handleConfirm = async () => {
    const success = await onConfirmRequest(requestData._id);
    if (success) {
      onClose();
    }
  };

  return (
    <>
      <p className={styles.confirmation}>
        Do you want to lend "{userBook.book.title}" to{" "}
        {requestData.sender.username}?
      </p>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <div className={styles.buttonContainer}>
        <button
          type="button"
          onClick={onClose}
          className={styles.cancelButton}
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
          onClick={handleConfirm}
        >
          {isSubmitting ? "Confirming..." : "Confirm Request"}
        </button>
      </div>
    </>
  );
};

const CancelBorrowRequestForm = ({
  userBook,
  onClose,
  onCancel,
  isSubmitting,
  error,
}) => {
  const handleRemove = async () => {
    const success = await onCancel(userBook.request.request_id);
    if (success) {
      onClose();
    }
  };

  return (
    <>
      <p className={styles.confirmation}>
        Are you sure you want to cancel your request for "{userBook.book.title}
        "?
      </p>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <div className={styles.buttonContainer}>
        <button
          type="button"
          onClick={onClose}
          className={styles.cancelButton}
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
          onClick={handleRemove}
        >
          {isSubmitting ? "Canceling Request..." : "Cancel Request"}
        </button>
      </div>
    </>
  );
};

const ExtendBorrowForm = ({ userBook, onClose }) => {
  return <div>RequestExtension</div>;
};

const BookModalForm = {
  ReadingProgressView,
  UpdatePageForm,
  CompleteBookForm,
  DeleteBookForm,
  ReturnBookForm,
  BookDetailsView,
  BorrowRequestsList,
  ConfirmBorrowRequestForm,
  CancelBorrowRequestForm,
  ExtendBorrowForm,
};

export default BookModalForm;
