import React from "react";
import { format } from "date-fns";
import styles from "./ViewProgress.module.scss";

const ViewProgress = ({ userBook, onClose }) => {
  console.log("view progress", userBook);
  const { book, currentPage, dueDate, sender } = userBook;
  const progress = (currentPage / book.pageCount) * 100;
  const pagesRemaining = book.pageCount - currentPage;

  return (
    <div className={styles.container}>
      <div className={styles.bookInfo}>
        <h3 className={styles.bookTitle}>{book.title}</h3>
        <p className={styles.bookAuthor}>by {book.authors.join(", ")}</p>
      </div>

      <div className={styles.progressSection}>
        <p className={styles.progressText}>
          Progress: {currentPage} of {book.pageCount} pages
        </p>
        <div className={styles.progressBarContainer}>
          <div
            className={styles.progressBar}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Pages Remaining</span>
          <span className={styles.statValue}>{pagesRemaining}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Completion</span>
          <span className={styles.statValue}>{progress.toFixed(1)}%</span>
        </div>
      </div>

      <div className={styles.readerInfo}>
        <p>Being read by: {sender.username}</p>
        <p>Due date: {format(new Date(dueDate), "MMMM d, yyyy")}</p>
      </div>
    </div>
  );
};

export default ViewProgress;
