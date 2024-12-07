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
    onUpdateProgress(request._id, value, userBook_id);
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

  console.log("requests in BorrowRequestsList", requests);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleRequestClick = (request) => {
    console.log("userBook in handleRequestClick", {
      ...userBook,
      request,
      sender: request.sender,
    });
    onClose();
    openModal(MODAL_TYPES.CONFIRM_BORROW_REQUEST, {
      userBook: { ...userBook, request, sender: request.sender },
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
  confirmationMsg,
  buttonText,
  loadingText,
  secondaryButtonText,
  onSecondaryAction,
  secondaryLoadingText,
  onConfirm,
  onClose,
  isSubmitting,
  error,
  successMessage = "Request accepted successfully!",
  secondarySuccessMessage = "Request declined successfully!",
}) => {
  const [status, setStatus] = useState({
    message: "",
    type: "",
  });

  const handleSubmit = async () => {
    try {
      const success = await onConfirm();
      if (success) {
        setStatus({
          message: successMessage,
          type: "success",
        });
      }
    } catch (err) {
      setStatus({
        message: err.message || "Failed to accept request",
        type: "error",
      });
    }
  };

  const handleSecondaryAction = async () => {
    try {
      const success = await onSecondaryAction();
      if (success) {
        setStatus({
          message: secondarySuccessMessage,
          type: "success",
        });
      }
    } catch (err) {
      setStatus({
        message: err.message || "Failed to decline request",
        type: "error",
      });
    }
  };

  return (
    <div className={styles.formContainer}>
      {!status.message ? (
        <>
          <p className={styles.confirmation}>{confirmationMsg}</p>
          {error && (
            <p className={styles.errorMessage}>
              <FontAwesomeIcon
                icon="exclamation-circle"
                className={styles.icon}
              />{" "}
              {error}
            </p>
          )}
          <div className={styles.buttonContainer}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
              disabled={isSubmitting}
            >
              Close
            </button>
            {secondaryButtonText && onSecondaryAction && (
              <button
                type="button"
                onClick={handleSecondaryAction}
                className={styles.secondaryButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin />{" "}
                    {secondaryLoadingText}
                  </>
                ) : (
                  secondaryButtonText
                )}
              </button>
            )}
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin /> {loadingText}
                </>
              ) : (
                buttonText
              )}
            </button>
          </div>
        </>
      ) : (
        <div className={styles.resultContainer}>
          <p className={`${styles.statusMessage} ${styles[status.type]}`}>
            <FontAwesomeIcon
              icon={
                status.type === "success"
                  ? "check-circle"
                  : "exclamation-circle"
              }
              className={styles.icon}
            />{" "}
            {status.message}
          </p>
          <button
            type="button"
            onClick={onClose}
            className={styles.closeButton}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

const BookModalForm = {
  ReadingProgressView,
  UpdatePageForm,
  BookDetailsView,
  BorrowRequestsList,
};

export default BookModalForm;
