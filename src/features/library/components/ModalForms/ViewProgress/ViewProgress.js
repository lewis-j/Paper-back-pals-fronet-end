import React from "react";
import formStyles from "../Shared/FormContainer/FormContainer.module.scss";
import styles from "./ViewProgress.module.scss";
import FormContainer from "../Shared/FormContainer/FormContainer";

const ViewProgress = ({ userBook, onClose }) => {
  const { book, currentPage } = userBook;
  const pagesRemaining = book.pageCount - currentPage;

  return (
    <FormContainer bookData={userBook}>
      <div className={formStyles.label}>Reading Progress</div>
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
    </FormContainer>
  );
};

export default ViewProgress;
