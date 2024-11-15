import React, { useState } from "react";
import styles from "./UserBookRequest.module.scss";

import { useModal } from "../../../../../context/ModalContext";
import { MODAL_TYPES } from "../../../config/modals/modalTypes";

const UserBookRequest = ({ userBook, onClose }) => {
  const { openModal } = useModal();
  const requests = userBook.request;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleRequestClick = (request) => {
    onClose();
    openModal(MODAL_TYPES.CONFIRM_REQUEST, "Confirm Request", {
      userBook,
      request,
    });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.requestList}>
          {requests.map((request) => (
            <div
              key={request._id}
              className={`${styles.requestCard} ${styles.clickable}`}
              onClick={() => handleRequestClick(request)}
            >
              <div className={styles.userInfo}>
                <img
                  src={request.sender.profilePic}
                  alt={request.sender.username}
                  className={styles.profilePic}
                />
                <h4>{request.sender.username}</h4>
                <span className={styles.date}>
                  {formatDate(request.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
        <button onClick={onClose} className={styles.closeButton}>
          Close
        </button>
      </div>
    </>
  );
};

export default UserBookRequest;
