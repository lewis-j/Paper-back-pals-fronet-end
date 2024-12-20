import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faCheckCircle,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./FriendModalContent.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { acceptFriendRequest, sendFriendRequest } from "../../friendsSlice";
import { openChatWithFriend } from "../../../Chat/chatSlice";
import { markAsRead } from "../../../Notifications/notificationsSlice";
import * as status from "../../../../data/asyncStatus";

const FriendModalContent = ({ user, children: actionButtons }) => {
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

const FriendRequestForm = ({
  confirmationMsg,
  buttonText,
  loadingText,
  secondaryButtonText,
  secondaryLoadingText,
  onConfirm,
  onSecondaryConfirm,
  onClose,
}) => {
  const status = useSelector((state) => state.friends.status);
  const error = useSelector((state) => state.friends.error);
  const [resultMessage, setResultMessage] = useState("");

  const createSubmitHandler = async (onSubmit, successMessage) => {
    setResultMessage("");

    try {
      await onSubmit();
      setResultMessage(successMessage || "Request accepted successfully!");
    } catch (err) {
      setResultMessage(err.message || "Failed to process request");
    }
  };
  const handleSubmit = createSubmitHandler(
    onConfirm,
    "Request accepted successfully!"
  );
  const handleSecondarySubmit = createSubmitHandler(
    onSecondaryConfirm,
    "Request declined successfully!"
  );

  const isSubmitting = status === status.LOADING;
  const isSuccess = status === status.SUCCEEDED;
  const isError = status === status.FAILED;

  return (
    <div className={styles.formContainer}>
      {!resultMessage ? (
        <>
          <p className={styles.confirmation}>{confirmationMsg}</p>
          {error && (
            <p className={styles.errorMessage}>
              <FontAwesomeIcon
                icon={faExclamationCircle}
                className={styles.icon}
              />{" "}
              {error}
            </p>
          )}
          <div className={styles.buttonContainer}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
              disabled={isSubmitting}
            >
              Close
            </button>
            <button
              type="button"
              className={styles.secondaryButton}
              disabled={isSubmitting}
              onClick={handleSecondarySubmit}
            >
              {isSubmitting ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin />{" "}
                  {secondaryLoadingText}
                </>
              ) : (
                secondaryButtonText
              )}
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin /> {loadingText}
                </>
              ) : (
                buttonText
              )}
            </button>
          </div>
        </>
      ) : (
        <div className={styles.resultContainer}>
          <p
            className={`${styles.statusMessage} ${
              isSuccess ? styles.success : isError ? styles.error : ""
            }`}
          >
            <FontAwesomeIcon
              icon={
                isSuccess ? faCheckCircle : isError ? faExclamationCircle : null
              }
              className={styles.icon}
            />{" "}
            {isSuccess
              ? "Request accepted successfully!"
              : isError
              ? resultMessage
              : ""}
          </p>
          <button
            type="button"
            onClick={onClose}
            className={styles.closeButton}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

const MakeFriendRequest = ({ user }) => {
  const { person_id } = user;
  const dispatch = useDispatch();
  const isLoading = useSelector(
    (state) => state.friends.status === status.LOADING
  );

  const handleConfirm = () => dispatch(sendFriendRequest(person_id));
  const handleSecondaryConfirm = () =>
    dispatch(/*declineFriendRequest(person_id)*/);

  return (
    <FriendModalContent user={user}>
      <FriendRequestForm
        confirmationMsg="Are you sure you want to send a friend request?"
        buttonText="Add Friend"
        loadingText="Adding friend..."
        secondaryButtonText="Decline"
        secondaryLoadingText="Declining..."
        onSecondaryConfirm={handleSecondaryConfirm}
        onConfirm={handleConfirm}
        onClose={() => {}}
      />
    </FriendModalContent>
  );
};

const AcceptFriendRequest = ({ user }) => {
  console.log("AcceptFriendRequest in FriendModalContent", user);
  const { request_id } = user;
  const dispatch = useDispatch();
  const notificationList = useSelector((state) => state.notifications.list);

  const handleConfirm = async () => {
    await dispatch(acceptFriendRequest({ request_id })).unwrap();
    const notification = notificationList.find(
      (n) => n.requestRef === request_id
    );
    dispatch(
      markAsRead({ notification: { _id: notification._id, read: true } })
    );
  };

  return (
    <FriendModalContent user={user}>
      <FriendRequestForm
        confirmationMsg="Are you sure you want to accept this friend request?"
        buttonText="Accept"
        loadingText="Accepting..."
        secondaryButtonText="Decline"
        secondaryLoadingText="Declining..."
        onConfirm={handleConfirm}
        onClose={() => {}}
      />
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
