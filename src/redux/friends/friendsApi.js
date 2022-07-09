import API from "../../authAxios";

export const requestFriend = async ({ _id }) => {
  try {
    const res = await API.post(`friends/request/${_id}`);
    console.log("response from friend request", res);
    return { reciever_id: _id };
  } catch (error) {
    console.log("error from friend request", error.response.data);
    return Promise.reject(error.message);
  }
};

export const addFriendFromRequest = async ({ request_id }) => {
  try {
    const res = await API.post(`friends/add/${request_id}`);
    return res.data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getUserData = async ({ user_id }) => {
  try {
    const res = await API.get(`user/${user_id}`);
    console.log("response in friends api", res);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
