import React from "react";
import styles from "./FriendModalContent.module.scss";

const FriendModalContent = ({ user, children: actionButtons }) => {
  const joinDate = new Date(user.createdAt).toLocaleDateString();

  // dispatch(sendFriendRequest({ person_id }));

  return (
    <div className={styles.container}>
      <div className={styles.profileSection}>
        <img
          src={user.profilePic}
          alt={`${user.username}'s profile`}
          className={styles.profilePic}
        />
        <h2 className={styles.username}>{user.username}</h2>
      </div>

      <div className={styles.infoSection}>
        <div className={styles.infoItem}>
          <span className={styles.label}>Email:</span>
          <span className={styles.value}>{user.email}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Member since:</span>
          <span className={styles.value}>{joinDate}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Email verified:</span>
          <span className={styles.value}>
            {user.email_verified ? "Yes" : "No"}
          </span>
        </div>
      </div>

      {actionButtons}
    </div>
  );
};

const MakeFriendRequest = ({ user }) => {
  return (
    <FriendModalContent user={user}>
      <div className={styles.actionButtons}>
        <button className={styles.addFriend}>Add Friend</button>
        <button className={styles.message}>Message</button>
      </div>
    </FriendModalContent>
  );
};

const AcceptFriendRequest = ({ user }) => {
  return (
    <FriendModalContent user={user}>
      <div className={styles.actionButtons}>
        <button className={styles.accept}>Accept</button>
        <button className={styles.decline}>Decline</button>
      </div>
    </FriendModalContent>
  );
};

const FriendModal = {
  MakeFriendRequest,
  AcceptFriendRequest,
};

export default FriendModal;
