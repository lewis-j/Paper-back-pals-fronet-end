import React from "react";
import { Avatar } from "../../../../components";
import styles from "./UserCard.module.scss";

const UserCard = ({ _id, username, profilePic }) => {
  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <Avatar imgSrc={profilePic} username={username} />
      </div>
      <h4 className={styles.username}>{username}</h4>
    </div>
  );
};

export default UserCard;
