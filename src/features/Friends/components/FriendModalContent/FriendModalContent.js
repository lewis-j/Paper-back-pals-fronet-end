import React from "react";
import styles from "./FriendModalContent.module.scss";
import { useDispatch } from "react-redux";
import { acceptFriendRequest, sendFriendRequest } from "../../friendsSlice";
import { openChatWithFriend } from "../../../Chat/chatSlice";

const FriendModalContent = ({ user, children: actionButtons }) => {
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

      {actionButtons}
    </div>
  );
};

const MakeFriendRequest = ({ user }) => {
  const { person_id } = user;
  const dispatch = useDispatch();
  return (
    <FriendModalContent user={user}>
      <div className={styles.actionButtons}>
        <button
          onClick={() => dispatch(sendFriendRequest(person_id))}
          className={styles.addFriend}
        >
          Add Friend
        </button>
        <button
          onClick={() => dispatch(openChatWithFriend(person_id))}
          className={styles.message}
        >
          Message
        </button>
      </div>
    </FriendModalContent>
  );
};

const AcceptFriendRequest = ({ user }) => {
  const { request_id } = user;
  const dispatch = useDispatch();
  return (
    <FriendModalContent user={user}>
      <div className={styles.actionButtons}>
        <button
          onClick={() => dispatch(acceptFriendRequest({ request_id }))}
          className={styles.accept}
        >
          Accept
        </button>
        <button className={styles.decline}>Decline</button>
      </div>
    </FriendModalContent>
  );
};

const RemoveFriend = ({ user }) => {
  return (
    <FriendModalContent user={user}>
      <button onClick={() => alert("remove friend")} className={styles.accept}>
        Remove Friend
      </button>
    </FriendModalContent>
  );
};

const FriendModal = {
  MakeFriendRequest,
  AcceptFriendRequest,
  RemoveFriend,
};

export default FriendModal;
