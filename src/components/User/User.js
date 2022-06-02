import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./User.module.scss";

const User = ({ username, profilePic, isActive, _id }) => {
  return (
    <div
      className={
        isActive ? `${styles.isActive} ${styles.container}` : styles.container
      }
    >
      <div className={styles.avatar}>
        <img src={profilePic} alt="profile" className={styles.img} />
      </div>
      <span className={styles.username}>{username}</span>
    </div>
  );
};

export default User;
