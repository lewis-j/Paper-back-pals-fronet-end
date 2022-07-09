import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserCard.module.scss";

const UserCard = ({ _id, username, profilePic }) => {
  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <img src={profilePic} alt="profile" className={styles.img} />
      </div>
      <span className={styles.username}>{username}</span>
    </div>
  );
};

export default UserCard;
