import React from "react";
import { format } from "date-fns";
import styles from "./ViewProgress.module.scss";
import BookModalHeader from "../Shared/BookModalHeader/BookModalHeader";

const ViewProgress = ({ userBook, onClose }) => {
  const { book, currentPage, dueDate, sender } = userBook;
  const pagesRemaining = book.pageCount - currentPage;

  return (
    <div className={styles.container}>
      <BookModalHeader
        book={book}
        currentPage={currentPage}
        dueDate={dueDate}
        owner={sender}
      />

      <div className={styles.statsGrid}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Pages Remaining</span>
          <span className={styles.statValue}>{pagesRemaining}</span>
        </div>
      </div>
    </div>
  );
};

export default ViewProgress;
