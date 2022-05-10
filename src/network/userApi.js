import axios from "axios";

export const createNewUser = async (accessToken, userData) => {
  console.log("access token in createNewUser::", accessToken);
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_NEST_URI}/users`,
      { ...userData },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    if (res.data.errors) {
      throw new Error("Errors getting user data");
    }
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
    if (res.data.errors) {
      throw new Error("Errors getting user data");
    }
    return { user: { ...res.data, accessToken } };
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateOneUser = async (accessToken, updatedUserData) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_NEST_URI}/users`,
      { ...updatedUserData },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    if (res.data.errors) {
      throw new Error("Errors getting user data");
    }
    return { user: { ...res.data, accessToken } };
  } catch (err) {
    return Promise.reject(err);
  }
};
