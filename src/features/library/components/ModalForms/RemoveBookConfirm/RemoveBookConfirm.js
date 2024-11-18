import React from "react";
import styles from "./RemoveBookConfirm.module.scss";
import BookModalHeader from "../Shared/BookModalHeader/BookModalHeader";

const RemoveBookConfirm = ({ userBook, onClose, onConfirm }) => {
  const { book } = userBook;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Remove Book</h2>
        <BookModalHeader book={book} showProgress={false} showOwner={false} />

        <p>Are you sure you want to remove "{book.title}" from your library?</p>

        <div className={styles.buttons}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button
            className={styles.removeBtn}
            onClick={() => onConfirm(userBook._id)}
          >
            Remove Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveBookConfirm;
