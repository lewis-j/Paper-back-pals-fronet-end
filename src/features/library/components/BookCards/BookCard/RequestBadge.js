import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./RequestBadge.module.scss";
import React from "react";

const RequestBadge = ({ count, children, clickHandler }) => {
  return (
    <div className={styles.wrapper} onClick={clickHandler}>
      <div className={styles.badge}>
        <FontAwesomeIcon icon={faUserFriends} className={styles.icon} />
        <span className={styles.count}>{count}</span>
      </div>
      {children}
    </div>
  );
};

export default RequestBadge;
