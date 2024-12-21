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
import { MODAL_TYPES } from "../../hooks/friendModalTypesAndActions";

const FriendModalContainer = ({ user, children: actionButtons }) => {
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
  secondaryButtonText = null,
  secondaryLoadingText = null,
  onSecondaryConfirm = null,
  onConfirm,
  onClose,
  resultMessage,
}) => {
  const { isSubmitting, isSuccess, isError, error } = useStatusHandlers();
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
            {secondaryButtonText && (
              <button
                type="button"
                className={styles.secondaryButton}
                disabled={isSubmitting}
                onClick={onSecondaryConfirm}
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
            )}
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
              onClick={onConfirm}
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

const MakeFriendRequest = ({ user, onClose }) => {
  const { person_id } = user;
  const { actions, resultMessage } = useFriendModalActions(person_id);
  return (
    <FriendModalContainer user={user}>
      <FriendRequestForm
        confirmationMsg="Are you sure you want to send a friend request?"
        buttonText="Add Friend"
        loadingText="Adding friend..."
        onConfirm={actions.sendFriendRequest}
        onClose={onClose}
        resultMessage={resultMessage}
      />
    </FriendModalContainer>
  );
};

const AcceptFriendRequest = ({ user, onClose }) => {
  console.log("AcceptFriendRequest in FriendModalContent", user);
  const { request_id } = user;
  const { actions, resultMessage } = useFriendModalActions(request_id);

  return (
    <FriendModalContainer user={user}>
      <FriendRequestForm
        confirmationMsg="Are you sure you want to accept this friend request?"
        buttonText="Accept"
        loadingText="Accepting..."
        secondaryButtonText="Decline"
        secondaryLoadingText="Declining..."
        onConfirm={actions.acceptFriendRequest}
        onClose={onClose}
        resultMessage={resultMessage}
      />
    </FriendModalContainer>
  );
};

const RemoveFriend = ({ user, onClose }) => {
  const { actions, resultMessage } = useFriendModalActions(user.person_id);
  return (
    <FriendModalContainer user={user}>
      <FriendRequestForm
        confirmationMsg="Are you sure you want to remove this friend?"
        buttonText="Remove Friend"
        loadingText="Removing..."
        onConfirm={actions.removeFriend}
        onClose={onClose}
        resultMessage={resultMessage}
      />
    </FriendModalContainer>
  );
};

const useStatusHandlers = () => {
  const status = useSelector((state) => state.friends.status);
  const error = useSelector((state) => state.friends.error);

  return {
    isSubmitting: status === status.LOADING,
    isSuccess: status === status.SUCCEEDED,
    isError: status === status.FAILED,
    error,
  };
};

const useFriendModalActions = (_id) => {
  const dispatch = useDispatch();

  const [resultMessage, setResultMessage] = useState("");

  const createSubmitHandler = (onSubmit, successMessage) => {
    return async () => {
      setResultMessage("");
      try {
        await onSubmit();
        setResultMessage(successMessage || "Request processed successfully!");
      } catch (err) {
        setResultMessage(err.message || "Failed to process request");
      }
    };
  };

  const actions = {
    sendFriendRequest: createSubmitHandler(async () => {
      await dispatch(sendFriendRequest({ person_id: _id })).unwrap();
    }, "Friend request sent successfully!"),
    acceptFriendRequest: createSubmitHandler(async () => {
      await dispatch(acceptFriendRequest({ request_id: _id })).unwrap();
    }, "Friend request accepted successfully!"),
    removeFriend: createSubmitHandler(async () => {
      alert("remove friend");
    }, "Friend removed successfully!"),
  };

  return {
    actions,
    resultMessage,
  };
};

const FriendModalWrapper = ({ modal, onClose }) => {
  console.log("FriendModal", modal);
  switch (modal.type) {
    case MODAL_TYPES.MAKE_FRIEND_REQUEST.value:
      console.log("MakeFriendRequest", modal);
      return <MakeFriendRequest user={modal.data} onClose={onClose} />;
    case MODAL_TYPES.ACCEPT_FRIEND_REQUEST.value:
      return <AcceptFriendRequest user={modal.data} onClose={onClose} />;
    case MODAL_TYPES.REMOVE_FRIEND.value:
      return <RemoveFriend user={modal.data} onClose={onClose} />;
    default:
      return null;
  }
};

export default FriendModalWrapper;
