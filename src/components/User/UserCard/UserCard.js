import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserCard.module.scss";

const UserCard = ({ _id, username, profilePic, isActive = false }) => {
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

export default UserCard;
