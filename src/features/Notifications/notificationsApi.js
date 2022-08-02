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
    console.log(
      "*****************************************",
      "res",
      res.data,
      "*****************************************"
    );

    return { notification: res.data };
  } catch (error) {
    return Promise.reject(error);
  }
};
