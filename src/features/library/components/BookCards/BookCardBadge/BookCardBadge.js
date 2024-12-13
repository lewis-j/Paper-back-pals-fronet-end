import styles from "./BookCardBadge.module.scss";
import React from "react";

const BookCardBadge = ({ children, clickHandler, badge }) => {
  console.log("badge", badge);
  return (
    <div className={styles.wrapper} onClick={clickHandler}>
      <div className={styles.badge}>{badge}</div>
      {children}
    </div>
  );
};

export default BookCardBadge;
