import React from "react";
import { Card, Button } from "reactstrap";
import {
  IconBook,
  IconTruck,
  IconCheck,
  IconRotateClockwise,
  IconAlertCircle,
} from "@tabler/icons";
import styles from "./BookStatusTracker.module.scss";
import requestStatus from "../../../../data/requestStatus";

const statusConfig = {
  [requestStatus.CHECKED_IN]: {
    index: 0,
    label: "Available",
    icon: IconBook,
  },
  [requestStatus.ACCEPTED]: {
    index: 1,
    label: "Accepted",
    icon: IconCheck,
    ownerAction: "Confirm Drop-off",
  },
  [requestStatus.SENDING]: {
    index: 2,
    label: "Owner Drop-off",
    icon: IconTruck,
    borrowerAction: "Confirm Pickup",
  },
  [requestStatus.CHECKED_OUT]: {
    index: 3,
    label: "With Borrower",
    icon: IconBook,
  },
  [requestStatus.IS_DUE]: {
    index: 4,
    label: "Due Soon",
    icon: IconAlertCircle,
    borrowerAction: "Confirm Drop-off",
  },
  [requestStatus.RETURNING]: {
    index: 5,
    label: "Returning",
    icon: IconTruck,
    ownerAction: "Confirm Return Pickup",
  },
  [requestStatus.RETURNED]: {
    index: 6,
    label: "Returned",
    icon: IconRotateClockwise,
  },
};

const BookStatusTracker = ({ userBook, isBorrower = true, onAction }) => {
  console.log("userBook", userBook);
  const currentStatus = userBook.request?.status;
  const currentStatusConfig = statusConfig[currentStatus];

  const getActionButton = () => {
    const action = isBorrower
      ? currentStatusConfig?.borrowerAction
      : currentStatusConfig?.ownerAction;

    if (!action) return null;

    return (
      <Button
        color="primary"
        className={styles.actionButton}
        onClick={() => onAction(userBook)}
      >
        {action}
      </Button>
    );
  };

  const renderStatusStep = (status, isActive) => {
    const StatusIcon = status.icon;
    return (
      <div
        className={`${styles.step} ${isActive ? styles.active : ""}`}
        key={status.label}
      >
        <div className={styles.iconWrapper}>
          <StatusIcon size={24} />
        </div>
        <div className={styles.label}>{status.label}</div>
      </div>
    );
  };

  return (
    <Card className={styles.tracker}>
      <div className={styles.bookInfo}>
        <img
          src={userBook.book.coverImg}
          alt={userBook.book.title}
          className={styles.coverImg}
        />
        <div className={styles.details}>
          <h5>{userBook.book.title}</h5>
          <p>
            {isBorrower
              ? `Owner: ${userBook.owner.username}`
              : `Borrower: ${userBook.sender.username}`}
          </p>
          {userBook.dueDate && currentStatus === "IS_DUE" && (
            <p className={styles.dueDate}>
              Due: {new Date(userBook.dueDate).toLocaleDateString()}
            </p>
          )}
        </div>
        {getActionButton()}
      </div>
      <div className={styles.statusSteps}>
        {Object.values(statusConfig).map((status) =>
          renderStatusStep(status, currentStatusConfig?.index >= status.index)
        )}
      </div>
    </Card>
  );
};

export default BookStatusTracker;
