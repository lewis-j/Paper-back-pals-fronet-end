import React from "react";
import styles from "./RemoveBookConfirm.module.scss";
import { useDispatch } from "react-redux";
import { deleteUserBook } from "../../../userBooksSlice";

const RemoveBookConfirm = ({ userBook, onClose, onConfirm }) => {
  const { book } = userBook;

  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Remove Book</h2>
        <p>Are you sure you want to remove "{book.title}" from your library?</p>

        <div className={styles.bookInfo}>
          <img
            src={book.coverImg}
            alt={book.title}
            className={styles.coverImg}
          />
          <div className={styles.details}>
            <h3>{book.title}</h3>
            <p>{book.authors.join(", ")}</p>
          </div>
        </div>

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
