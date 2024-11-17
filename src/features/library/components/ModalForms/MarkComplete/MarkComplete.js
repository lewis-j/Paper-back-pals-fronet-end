import React, { useState } from "react";
import styles from "./MarkComplete.module.scss";

const MarkComplete = ({ bookData, onClose, onMarkComplete }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log(
        "onMarkComplete",
        bookData.request.request_id,
        bookData._id,
        bookData.book.pageCount
      );
      await onMarkComplete(
        bookData.request.request_id,
        bookData._id,
        bookData.book.pageCount
      );
      onClose();
    } catch (error) {
      console.error("Error updating reading progress:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPercentage = Math.round(
    (bookData.currentPage / bookData.book.pageCount) * 100
  );

  return (
    <div className={styles.container}>
      <h2>Mark Book as Complete</h2>
      <div className={styles.bookInfo}>
        <img
          src={bookData.book.coverImg}
          alt={bookData.book.title}
          className={styles.coverImage}
        />
        <div className={styles.details}>
          <h3>{bookData.book.title}</h3>
          <p>By: {bookData.book.authors.join(", ")}</p>
          <div className={styles.progress}>
            <p>Current Progress: {progressPercentage}%</p>
            <p>
              Page {bookData.currentPage} of {bookData.book.pageCount}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <p className={styles.confirmation}>
          This will update your progress to {bookData.book.pageCount} pages,
          marking the book as complete.
        </p>
        <div className={styles.buttons}>
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
          >
            {isSubmitting ? "Updating Progress..." : "Mark Complete"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MarkComplete;
