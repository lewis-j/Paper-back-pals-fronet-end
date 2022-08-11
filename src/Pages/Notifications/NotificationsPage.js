import { useSelector } from "react-redux";
import { Container, Row } from "reactstrap";
import { NotificationsCard } from "../../features/Notifications";
import { Button, Modal, NoContent } from "../../components";
import { faBell, faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import requestTypes from "../../data/requestTypes";
import requestStatus from "../../data/requestStatus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { getBookRequest } from "../../features/library/userBookCalls";
import styles from "./NotificationsPage.module.scss";

const NotificationsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeModalCard, setActiveModalCard] = useState(null);
  const [refData, setRefData] = useState();
  const { list: notifications } = useSelector((state) => state.notifications);
  const user_id = useSelector((state) => state.authUser.currentUser._id);

  const fetchBookRequest = async (requestRef, requestType) => {
    const result = await getBookRequest(requestRef);

    setRefData({ ...result, requestType });
  };
  if (notifications.length === 0)
    return (
      <NoContent icon={faBell} text="You currently don't have notifications" />
    );

  const renderNotifications = () => {
    return notifications.map((notification, i) => {
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
            fetchBookRequest(requestRef, requestType);
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
        />
      );
    });
  };
  const modalCard = () => {
    if (refData) {
      if (refData.requestType === requestTypes.BookRequest) {
        console.log("refData", refData);
        const {
          status,
          userBook: {
            book: { coverImg, title, authors },
          },
        } = refData;
        return (
          <div>
            <div>
              <img src={coverImg} alt={title} />
            </div>
            <div>{authors[0]}</div>
            <div>
              <Button
                circle
                icon={faCheck}
                onClick={() => console.log("request accepted")}
              />
              <Button circle icon={faX} onClick={() => console.log("exit")} />
            </div>
          </div>
        );
      }
    }
    return null;
  };
  return (
    <>
      <Container>
        <Row>{renderNotifications()}</Row>
      </Container>

      <Modal setIsOpen={setIsOpen} isOpen={isOpen} title="Modal title">
        <div className={styles.modalContainer}>{modalCard()}</div>
      </Modal>
    </>
  );
};

export default NotificationsPage;
