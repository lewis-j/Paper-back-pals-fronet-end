import React from "react";
// import { useNavigate } from "react-router-dom";
import styles from "./UserRequestCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

const UserRequestCard = ({ username, profilePic, _id }) => {
  return (
    <div className={styles.container} key={_id}>
      <div className={styles.avatar}>
        <img src={profilePic} alt="profile" className={styles.img} />
      </div>
      <span className={styles.username}>{username}</span>
      <button className={styles.requestBtn}>
        <FontAwesomeIcon icon={faUserPlus} />
      </button>
    </div>
  );
};

export default UserRequestCard;
