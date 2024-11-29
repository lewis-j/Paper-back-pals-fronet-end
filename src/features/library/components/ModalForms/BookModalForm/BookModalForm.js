import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as asyncStatus from "../../../../../data/asyncStatus";
import styles from "./BookModalForm.module.scss";
import { Loading } from "../../../../../components";
import { useModal } from "../../../../../context/ModalContext";
import { MODAL_TYPES } from "../../../config/modals";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

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
    onUpdateProgress(request.id, value, userBook_id);
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

const BookDetailsView = ({ userBook, onClose }) => {
  console.log("userBook in BookDetailsView", userBook);
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
  const requests = userBook.requests;

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
    openModal(MODAL_TYPES.CONFIRM_BORROW_REQUEST, {
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

export const BaseForm = ({
  userBook,
  confirmationMsg,
  buttonText,
  loadingText,
  onClose,
  onConfirm,
  isSubmitting,
  error,
}) => {
  const handleSubmit = async () => {
    const success = await onConfirm();
    console.log("Base Form was result", success);
    if (success) {
      onClose();
    }
  };

  return (
    <>
      <p className={styles.confirmation}>{confirmationMsg}</p>
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
          {isSubmitting ? loadingText : buttonText}
        </button>
      </div>
    </>
  );
};

const BookModalForm = {
  ReadingProgressView,
  UpdatePageForm,
  BookDetailsView,
  BorrowRequestsList,
};

export default BookModalForm;
