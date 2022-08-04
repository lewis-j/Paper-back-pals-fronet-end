// import { createNotifications } from "./notificationsSlice";

const createBookRequestNotification = (recipient_id, request_id) => {
  const messages = {
    sender: "You made a new book request!",
    recipient: "You have a new book request",
  };
  const notificationPayload = {
    recipient_id: recipient_id,
    notificationDto: {
      requestType: "BookRequest",
      requestRef: request_id,
      messages,
    },
  };
  //   return createNotifications(notificationPayload);
};

export { createBookRequestNotification };
