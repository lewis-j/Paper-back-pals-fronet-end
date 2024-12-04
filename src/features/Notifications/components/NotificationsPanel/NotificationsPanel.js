import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, NoContent } from "../../../../components";
import {
  faBell,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { getBookRequest } from "../../../library/userBookCalls";
import styles from "./NotificationsPanel.module.scss";
import { NotificationsCard } from "../NotificationsCard";
import * as asyncStatus from "../../../../data/asyncStatus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useNotificationModal from "../NotificationModal/NotificationModal";

const NotificationsPanel = () => {
  const { list: notifications, status } = useSelector(
    (state) => state.notifications
  );
  const { openNotificationModal, renderModal } =
    useNotificationModal(notifications);
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

  const renderUnreadNotifications = (notification, i) => {
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
            openNotificationModal(_id);
          };
      const declineHandler = () => {};
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
  };

  const renderReadNotifications = (notification, i) => {
    const { requestRef, requestType, _id, __v, ...remaining } = notification;
    const notificationProps = { ...remaining, _id };

    return (
      <NotificationsCard
        key={`${_id}`}
        {...notificationProps}
        isLoading={status === asyncStatus.LOADING}
      />
    );
  };

  const renderReadNotificationsDropdown = () => {
    return (
      <>
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
                {_notifications.read.map(renderReadNotifications)}
              </div>
            )}
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.notifications}>
          {_notifications.unread.map(renderUnreadNotifications)}
        </div>
        {renderReadNotificationsDropdown()}
      </div>
      {renderModal()}
    </>
  );
};

export default NotificationsPanel;
