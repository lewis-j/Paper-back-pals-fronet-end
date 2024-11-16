import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, NoContent } from "../../../../components";
import {
  faBell,
  faCheck,
  faX,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import requestTypes from "../../../../data/requestTypes";
import { useState } from "react";
import {
  getBookRequest,
  nextBookRequestStatus,
} from "../../../library/userBookCalls";
import styles from "./NotificationsPanel.module.scss";
import { addNotification, markAsRead } from "../../notificationsSlice";
import { NotificationsCard } from "../NotificationsCard";
import * as asyncStatus from "../../../../data/asyncStatus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BookRequestModal = ({ refData, onClose, onAccept, isLoading }) => {
  const dispatch = useDispatch();
  const {
    _id: request_id,
    notification_id,
    confirmationMsg,
    userBook: {
      book: { coverImg, title, authors, _id: userBook_id },
    },
    status,
  } = refData;

  const acceptClickHandler = async () => {
    const res = await nextBookRequestStatus(request_id);
    const { notification } = res;
    await dispatch(markAsRead({ _id: notification_id })).unwrap();
    await dispatch(addNotification({ notification })).unwrap();
  };

  return (
    <div className={styles.modalContent}>
      <div className={styles.bookInfo}>
        <img src={coverImg} alt={title} className={styles.bookCover} />
        <div className={styles.bookDetails}>
          <h3 className={styles.bookTitle}>{title}</h3>
          <p className={styles.bookAuthor}>{authors[0]}</p>
          <p className={styles.confirmationMsg}>{confirmationMsg}</p>
        </div>
      </div>
      <div className={styles.actionButtons}>
        <Button
          disabled={isLoading}
          circle
          icon={faCheck}
          onClick={acceptClickHandler}
          className={styles.acceptButton}
        />
        <Button
          circle
          icon={faX}
          onClick={onClose}
          className={styles.declineButton}
        />
      </div>
    </div>
  );
};

const MarkAsReadModal = ({ onConfirm, onCancel, isLoading }) => {
  return (
    <div className={styles.modalContent}>
      <div className={styles.modalText}>Mark as read?</div>
      <div className={styles.actionButtons}>
        <Button
          disabled={isLoading}
          circle
          icon={faCheck}
          onClick={onConfirm}
          className={styles.acceptButton}
        />
        <Button
          circle
          icon={faX}
          onClick={onCancel}
          className={styles.declineButton}
        />
      </div>
    </div>
  );
};

const NotificationsPanel = () => {
  const [modalState, setModalState] = useState(0);
  const [refData, setRefData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { list: notifications, status } = useSelector(
    (state) => state.notifications
  );
  const [showReadNotifications, setShowReadNotifications] = useState(false);

  const processNotifications = (notifications) => {
    return notifications.reduce(
      (obj, cur) => ({
        ...obj,
        [cur.isRead ? "read" : "unread"]: [
          ...obj[cur.isRead ? "read" : "unread"],
          cur,
        ],
      }),
      { unread: [], read: [] }
    );
  };

  const _notifications = processNotifications(notifications);

  const fetchBookRequest = async (requestRef) => {
    return await getBookRequest(requestRef);
  };

  if (notifications.length === 0)
    return (
      <NoContent icon={faBell} text="You currently don't have notifications" />
    );

  const renderNotifications = () => {
    const unreadNotifications = _notifications.unread.map((notification, i) => {
      const { requestRef, requestType, _id, __v, ...remaining } = notification;
      const notificationProps = { ...remaining, _id };

      const getAcceptAndDeclineHandlers = () => {
        let data = {
          requestRef,
          requestType,
          notification_id: _id,
          confirmationMsg: notification.confirmation,
        };

        const acceptHandler = !notification?.confirmation
          ? null
          : async () => {
              setModalState(1);
              if (requestType === requestTypes.BookRequest) {
                const result = await fetchBookRequest(
                  requestRef,
                  requestType,
                  _id
                );
                data = { ...data, ...result };
              }
              setRefData(data);
            };
        const declineHandler = () => {
          setModalState(-1);
          setRefData(data);
        };
        return {
          accept: acceptHandler,
          decline: declineHandler,
        };
      };

      return (
        <NotificationsCard
          key={`${_id}-${i}`}
          {...notificationProps}
          clickHandlers={getAcceptAndDeclineHandlers()}
          isLoading={status === asyncStatus.LOADING}
        />
      );
    });

    const readNotifications = _notifications.read.map((notification, i) => {
      const { requestRef, requestType, _id, __v, ...remaining } = notification;
      const notificationProps = { ...remaining, _id };

      return (
        <NotificationsCard
          key={`${_id}`}
          {...notificationProps}
          isLoading={status === asyncStatus.LOADING}
        />
      );
    });

    return (
      <>
        {unreadNotifications}
        {_notifications.read.length > 0 && (
          <div className={styles.readNotificationsDropdown}>
            <button
              className={styles.dropdownToggle}
              onClick={() => setShowReadNotifications(!showReadNotifications)}
            >
              {showReadNotifications ? "Hide" : "Show"} Read Notifications
              <FontAwesomeIcon
                icon={showReadNotifications ? faChevronUp : faChevronDown}
                className={styles.dropdownIcon}
              />
            </button>
            {showReadNotifications && (
              <div className={styles.readNotifications}>
                {readNotifications}
              </div>
            )}
          </div>
        )}
      </>
    );
  };

  const modalCard = () => {
    if (refData) {
      if (modalState === 1) {
        if (refData.requestType === requestTypes.BookRequest) {
          return (
            <BookRequestModal
              refData={refData}
              onClose={() => setModalState(0)}
              onAccept={() => setModalState(0)}
              isLoading={isLoading}
            />
          );
        } else if (refData.requestType === requestTypes.FriendRequest) {
          // return <FriendRequestModal refData={refData} />;
        }
      } else if (modalState === -1) {
        return (
          <MarkAsReadModal
            onConfirm={() => setModalState(0)}
            onCancel={() => setModalState(0)}
            isLoading={isLoading}
          />
        );
      }
    }

    return null;
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.notifications}>{renderNotifications()}</div>
      </div>
      <Modal
        setIsOpen={(bool) => {
          if (!bool) {
            setModalState(0);
          }
        }}
        isOpen={modalState !== 0}
        title="Confirm Request"
      >
        <div className={styles.modalContainer}>{modalCard()}</div>
      </Modal>
    </>
  );
};

export default NotificationsPanel;
