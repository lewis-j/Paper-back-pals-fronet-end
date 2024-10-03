import { useSelector, useDispatch } from "react-redux";
import { Container, Row } from "reactstrap";
import { Button, Modal, NoContent } from "../../../../components";
import { faBell, faCheck, faX } from "@fortawesome/free-solid-svg-icons";
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

const NotificationsPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [refData, setRefData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { list: notifications, status } = useSelector(
    (state) => state.notifications
  );

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

  const fetchBookRequest = async (requestRef, requestType, notification_id) => {
    const result = await getBookRequest(requestRef);

    setRefData({ ...result, requestType, notification_id });
  };
  if (notifications.length === 0)
    return (
      <NoContent icon={faBell} text="You currently don't have notifications" />
    );

  const renderNotifications = () => {
    return _notifications.unread.map((notification, i) => {
      const { requestRef, requestType, _id, __v, ...remaining } = notification;
      const notificationProps = { ...remaining, _id };

      const getHandlers = () => {
        if (
          !(
            requestType === requestTypes.BookRequest ||
            requestType === requestTypes.FriendRequest
          ) ||
          !remaining.actionRequired
        )
          return null;

        const acceptHandler = () => {
          setIsOpen(true);
          if (requestType === requestTypes.BookRequest) {
            fetchBookRequest(requestRef, requestType, _id);
          }
        };
        const declineHandler = () => {};
        return {
          accept: acceptHandler,
          decline: declineHandler,
        };
      };

      return (
        <NotificationsCard
          key={`${_id} `}
          {...notificationProps}
          clickHandlers={getHandlers()}
          isLoading={status === asyncStatus.LOADING}
        />
      );
    });
  };
  const modalCard = () => {
    if (refData) {
      if (refData.requestType === requestTypes.BookRequest) {
        const {
          _id: request_id,
          notification_id,
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
          <div>
            <div>
              <img src={coverImg} alt={title} />
            </div>
            <div>{authors[0]}</div>
            <div>
              <Button
                disabled={isLoading}
                circle
                icon={faCheck}
                onClick={acceptClickHandler}
              />
              <Button circle icon={faX} onClick={() => setIsOpen(false)} />
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

      <Modal setIsOpen={setIsOpen} isOpen={isOpen} title="Modal title">
        <div className={styles.modalContainer}>{modalCard()}</div>
      </Modal>
    </>
  );
};

export default NotificationsPanel;
