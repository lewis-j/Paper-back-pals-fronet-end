import API from "../../lib/authAxios";

export const requestFriend = async ({ person_id }) => {
  try {
    await API.post(`friends/request/${person_id}`);
    return { reciever_id: person_id };
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const addFriendFromRequest = async ({ request_id }) => {
  try {
    const res = await API.post(`friends/add/${request_id}`);
    return { friend: res.data, request_id };
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getUserData = async ({ user_id }) => {
  try {
    const res = await API.get(`user/${user_id}`);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
