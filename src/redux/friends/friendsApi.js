import { getClient } from "../../network/axiosConfig";

const client = getClient();

export const friendFetch = async (_id) => {
  try {
    const res = await client.get(`user/${_id}`);
    const friend = res.data;
    console.log("resonse from the friends api:", res);
    return friend;
  } catch (error) {
    console.log("Error", error);
    if (error.response.status === 401) error.message = "Please login again";

    return Promise.reject(error);
  }
};
