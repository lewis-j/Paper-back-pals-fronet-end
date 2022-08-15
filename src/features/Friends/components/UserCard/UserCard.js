import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "../../../../components";
import styles from "./UserCard.module.scss";

const UserCard = ({ _id, username, profilePic }) => {
  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <Avatar imgSrc={profilePic} username={username} />
      </div>
      <span className={styles.username}>{username}</span>
    </div>
  );
};

export default UserCard;
