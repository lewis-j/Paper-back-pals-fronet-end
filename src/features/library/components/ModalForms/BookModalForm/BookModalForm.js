import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as asyncStatus from "../../../../../data/asyncStatus";
import formStyles from "../Shared/FormContainer/FormContainer.module.scss";
import styles from "./BookModalForm.module.scss";
import { Loading } from "../../../../../components";
import { useModal } from "../../../../../context/ModalContext";
import { MODAL_TYPES } from "../../../config/modals";

const ViewProgress = ({ userBook, onClose }) => {
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
      <div className={formStyles.buttonContainer}>
        <button
          type="button"
          onClick={onClose}
          className={formStyles.cancelButton}
        >
          Close
        </button>
      </div>
    </>
  );
};

const ChangePageCount = ({ userBook, onClose, onUpdatePages }) => {
  const { _id: userBook_id, request, currentPage } = userBook;
  const [value, setValue] = useState(currentPage);

  if (!userBook) return null;

  const handleSubmit = () => {
    onUpdatePages(request.request_id, value, userBook_id);
    onClose();
  };

  return (
    <>
      <input
        className={formStyles.pageInput}
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        min="0"
        max={userBook.book.pageCount}
      />
      <button
        className={formStyles.submitButton}
        type="submit"
        onClick={handleSubmit}
      >
        Update Progress
      </button>
    </>
  );
};

const MarkComplete = ({ userBook, onClose, onMarkComplete }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onMarkComplete(
        userBook.request.request_id,
        userBook._id,
        userBook.book.pageCount
      );
      onClose();
    } catch (error) {
      console.error("Error updating reading progress:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <p className={formStyles.confirmation}>
        This will update your progress to {userBook.book.pageCount} pages,
        marking the book as complete.
      </p>
      <div className={formStyles.buttonContainer}>
        <button
          type="button"
          onClick={onClose}
          className={formStyles.cancelButton}
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={formStyles.submitButton}
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? "Updating Progress..." : "Mark Complete"}
        </button>
      </div>
    </>
  );
};

const RemoveBook = ({ userBook, onClose, onConfirm }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRemove = async () => {
    setIsSubmitting(true);
    try {
      await onConfirm(userBook._id);
      onClose();
    } catch (error) {
      console.error("Error removing book:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <p className={formStyles.confirmation}>
        Are you sure you want to remove "{userBook.book.title}" from your
        library?
      </p>
      <div className={formStyles.buttonContainer}>
        <button
          type="button"
          onClick={onClose}
          className={formStyles.cancelButton}
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={formStyles.submitButton}
          disabled={isSubmitting}
          onClick={handleRemove}
        >
          {isSubmitting ? "Removing..." : "Remove Book"}
        </button>
      </div>
    </>
  );
};

const ReturnBook = ({ userBook, onClose, onReturnBook }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userBookAsyncStatus = useSelector((state) => state.userBooks.status);

  if (!userBook) return null;
  if (userBookAsyncStatus === asyncStatus.LOADING) return <Loading />;

  const handleReturnBook = async () => {
    setIsSubmitting(true);
    try {
      await onReturnBook(userBook.request.request_id);
      onClose();
    } catch (error) {
      console.error("Error returning book:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <p className={formStyles.confirmation}>
        Do you want to return {userBook.book.title} to {userBook.owner.username}
        ?
      </p>
      <div className={formStyles.buttonContainer}>
        <button
          type="button"
          onClick={onClose}
          className={formStyles.cancelButton}
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={formStyles.submitButton}
          disabled={isSubmitting}
          onClick={handleReturnBook}
        >
          {isSubmitting ? "Returning Book..." : "Return Book"}
        </button>
      </div>
    </>
  );
};

const UserBookDetails = ({ userBook, onClose }) => {
  const userBookAsyncStatus = useSelector((state) => state.userBooks.status);

  if (!userBook) return null;
  if (userBookAsyncStatus === asyncStatus.LOADING) return <Loading />;

  return (
    <>
      <p className={formStyles.description}>{userBook.book.description}</p>
      <div className={formStyles.buttonContainer}>
        <button
          type="button"
          onClick={onClose}
          className={formStyles.cancelButton}
        >
          Close
        </button>
      </div>
    </>
  );
};

const UserBookRequest = ({ userBook, onClose }) => {
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
    openModal(MODAL_TYPES.CONFIRM_REQUEST, "Confirm Request", {
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

const ConfirmRequest = ({ userBook, request, onClose }) => {
  return <div>ConfirmRequest</div>;
};

const RemoveRequest = ({ userBook, onClose }) => {
  return <div>RemoveRequest</div>;
};

const BookModalForm = {
  ViewProgress,
  ChangePageCount,
  MarkComplete,
  RemoveBook,
  ReturnBook,
  UserBookDetails,
  UserBookRequest,
  ConfirmRequest,
  RemoveRequest,
};

export default BookModalForm;
