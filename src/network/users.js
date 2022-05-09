import axios from "axios";

export const createNewUser = async (accessToken) => {
  console.log("access token in createNewUser::", accessToken);
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_NEST_URI}/users`,
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return { user: { ...res.data, accessToken } };
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getOneUser = async (accessToken) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_NEST_URI}/users`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return { user: { ...res.data, accessToken } };
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateOneUser = async (updatedAccessToken) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_NEST_URI}/users`,
      {},
      {
        headers: { Authorization: `Bearer ${updatedAccessToken}` },
      }
    );
    return { user: { ...res.data, updatedAccessToken } };
  } catch (err) {
    return Promise.reject(err);
  }
};
