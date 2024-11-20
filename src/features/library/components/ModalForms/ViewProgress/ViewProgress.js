import React from "react";
import formStyles from "../Shared/FormContainer/FormContainer.module.scss";
import styles from "./ViewProgress.module.scss";

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

export default ViewProgress;
