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
import {
  bookRequestStatus,
  setOwnedBookCurrentRequest,
} from "../../../library";
import { NotificationsCard } from "../NotificationsCard";
import * as asyncStatus from "../../../../data/asyncStatus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NotificationsPanel = () => {
  const [modalState, setModalState] = useState(0);
  const [refData, setRefData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { list: notifications, status } = useSelector(
    (state) => state.notifications
  );
  const [showReadNotifications, setShowReadNotifications] = useState(false);

  const _notifications = notifications.reduce(
    (obj, cur) => {
      if (cur.isRead) {
        return {
          ...obj,
          read: [...obj.read, cur],
        };
      }
      return {
        ...obj,
        unread: [...obj.unread, cur],
      };
    },
    { unread: [], read: [] }
  );

  const dispatch = useDispatch();

  const fetchBookRequest = async (requestRef) => {
    return await getBookRequest(requestRef);
  };

  if (notifications.length === 0)
    return (
      <NoContent icon={faBell} text="You currently don't have notifications" />
    );

  const renderNotifications = () => {
    const unreadNotifications = _notifications.unread.map((notification, i) => {
      console.log("unread notification", notification);
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

  const BookRequestModal = ({ refData }) => {
    console.log("refData", refData);
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
      setIsLoading(true);
      const res = await nextBookRequestStatus(request_id);
      if (status === bookRequestStatus.CHECKED_IN)
        dispatch(setOwnedBookCurrentRequest({ userBook_id, request_id }));
      const { notification } = res;
      await dispatch(markAsRead({ _id: notification_id })).unwrap();
      await dispatch(addNotification({ notification })).unwrap();
      setIsLoading(false);
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
            onClick={() => setModalState(0)}
            className={styles.declineButton}
          />
        </div>
      </div>
    );
  };
  const modalCard = () => {
    console.log("modalState", modalState);

    if (refData) {
      if (modalState === 1) {
        if (refData.requestType === requestTypes.BookRequest) {
          return <BookRequestModal refData={refData} />;
        } else if (refData.requestType === requestTypes.FriendRequest) {
          // return <FriendRequestModal refData={refData} />;
        }
      } else if (modalState === -1) {
        console.log("modalState is -1");
        return (
          <div className={styles.modalContent}>
            <div className={styles.modalText}>Mark as read?</div>
            <div className={styles.actionButtons}>
              <Button
                disabled={isLoading}
                circle
                icon={faCheck}
                onClick={async () => {
                  alert("marking as read");
                  dispatch(markAsRead({ _id: refData.notification_id }));
                }}
                className={styles.acceptButton}
              />
              <Button
                circle
                icon={faX}
                onClick={() => setModalState(0)}
                className={styles.declineButton}
              />
            </div>
          </div>
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
