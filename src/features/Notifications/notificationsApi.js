import API from "../../lib/authAxios";

export const createNotifications = async ({
  recipient_id,
  notificationDto,
}) => {
  try {
    const res = await API.post(
      `notifications/new/${recipient_id}`,
      notificationDto
    );

    return { notification: res.data };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchNotifications = async () => {
  console.log("fetchNotifications");
  try {
    const res = await API.get(`notifications`);

    return { notifications: res.data };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const markAsRead = async ({ _id }) => {
  try {
    const res = await API.put(`notifications/isRead/${_id}`);

    const { notification } = res.data;
    return { notification };
  } catch (error) {
    return Promise.reject(error);
  }
};
