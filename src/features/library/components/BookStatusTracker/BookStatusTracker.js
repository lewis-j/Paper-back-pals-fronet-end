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
  CHECKED_IN: {
    index: 0,
    label: "Available",
    icon: IconBook,
  },
  ACCEPTED: {
    index: 1,
    label: "Accepted",
    icon: IconCheck,
    ownerAction: "Confirm Drop-off",
  },
  SENDING: {
    index: 2,
    label: "Owner Drop-off",
    icon: IconTruck,
    borrowerAction: "Confirm Pickup",
  },
  CHECKED_OUT: {
    index: 3,
    label: "With Borrower",
    icon: IconBook,
  },
  IS_DUE: {
    index: 4,
    label: "Due Soon",
    icon: IconAlertCircle,
    borrowerAction: "Confirm Drop-off",
  },
  RETURNING: {
    index: 5,
    label: "Returning",
    icon: IconTruck,
    ownerAction: "Confirm Return Pickup",
  },
  RETURNED: {
    index: 6,
    label: "Returned",
    icon: IconRotateClockwise,
  },
};

const BookStatusTracker = ({
  book,
  isBorrower = true,
  onConfirmPickup,
  onConfirmDropoff,
}) => {
  const currentStatus = book.request?.status;
  const currentStatusConfig = statusConfig[currentStatus];
  const requestId = book.request?.request_id;

  const handleAction = () => {
    if (!book._id) return;

    if (isBorrower) {
      switch (currentStatus) {
        case requestStatus.SENDING:
          onConfirmPickup?.(requestId);
          break;
        case requestStatus.IS_DUE:
          onConfirmDropoff?.(requestId);
          break;
        default:
          break;
      }
    } else {
      switch (currentStatus) {
        case requestStatus.ACCEPTED:
          onConfirmDropoff?.(requestId);
          break;
        case requestStatus.RETURNING:
          onConfirmPickup?.(requestId);
          break;
        default:
          break;
      }
    }
  };

  const getActionButton = () => {
    const action = isBorrower
      ? currentStatusConfig?.borrowerAction
      : currentStatusConfig?.ownerAction;

    if (!action) return null;

    return (
      <Button
        color="primary"
        className={styles.actionButton}
        onClick={handleAction}
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
          src={book.book.coverImg}
          alt={book.book.title}
          className={styles.coverImg}
        />
        <div className={styles.details}>
          <h5>{book.book.title}</h5>
          <p>
            {isBorrower
              ? `Owner: ${book.owner.username}`
              : `Borrower: ${book.sender.username}`}
          </p>
          {book.dueDate && currentStatus === "IS_DUE" && (
            <p className={styles.dueDate}>
              Due: {new Date(book.dueDate).toLocaleDateString()}
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
