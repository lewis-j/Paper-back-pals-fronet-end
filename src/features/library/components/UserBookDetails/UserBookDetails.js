import React from "react";
import { format } from "date-fns/format";
import styles from "./UserBookDetails.module.scss";
import BookDetails from "../BookDetails/BookDetails";

const UserBookDetails = ({ userBook, onClose }) => {
  console.log("userBook in BookInfo: ", userBook);
  const { book, owner, currentPage, dueDate } = userBook;
  const progress = ((currentPage / book.pageCount) * 100).toFixed(1);

  return (
    <div className={styles.container}>
      <BookDetails book={book} />

      <div className={styles.grid}>
        <div>
          <h3 className={styles.sectionTitle}>Reading Progress</h3>
          <p>
            {currentPage} of {book.pageCount} pages ({progress}%)
          </p>
        </div>
        <div>
          <h3 className={styles.sectionTitle}>Due Date</h3>
          {dueDate && <p>{format(new Date(dueDate), "MMM dd, yyyy")}</p>}
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

export default UserBookDetails;
