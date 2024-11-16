import React from "react";
import { format } from "date-fns/format";
import styles from "./BookInfo.module.scss";

const BookInfo = ({ userBook, onClose }) => {
  const { book, owner, currentPage, dueDate } = userBook;
  const progress = ((currentPage / book.pageCount) * 100).toFixed(1);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img
          src={book.coverImg}
          alt={book.title}
          className={styles.coverImage}
        />
        <div className={styles.titleSection}>
          <h2 className={styles.title}>{book.title}</h2>
          <p className={styles.author}>{book.authors.join(", ")}</p>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Description</h3>
        <p className={styles.description}>{book.description}</p>
      </div>

      <div className={styles.grid}>
        <div>
          <h3 className={styles.sectionTitle}>Reading Progress</h3>
          <p>
            {currentPage} of {book.pageCount} pages ({progress}%)
          </p>
        </div>
        <div>
          <h3 className={styles.sectionTitle}>Due Date</h3>
          <p>{format(new Date(dueDate), "MMM dd, yyyy")}</p>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Owner</h3>
        <div className={styles.owner}>
          <img
            src={owner.profilePic}
            alt={owner.username}
            className={styles.profilePic}
          />
          <span>{owner.username}</span>
        </div>
      </div>

      <button onClick={onClose} className={styles.closeButton}>
        Close
      </button>
    </div>
  );
};

export default BookInfo;
