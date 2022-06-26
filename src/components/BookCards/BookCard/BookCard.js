import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import styles from "./BookCard.module.scss";

const BookCard = ({ coverImg, title, status }) => {
  return (
    <div className={styles.container}>
      {status === "PENDING" && (
        <FontAwesomeIcon
          className={styles.icon}
          size="xl"
          icon={faCircleExclamation}
        />
      )}
      <img className={styles.img} src={coverImg} alt={title} />
    </div>
  );
};

export default BookCard;
