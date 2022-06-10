import React from "react";
// import { useNavigate } from "react-router-dom";
import styles from "./UserRequestCard.module.scss";

const UserRequestCard = ({ username, profilePic, _id }) => {
  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <img src={profilePic} alt="profile" className={styles.img} />
      </div>
      <span className={styles.username}>{username}</span>
    </div>
  );
};

export default UserRequestCard;
