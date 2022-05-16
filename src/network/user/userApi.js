import { getClient } from "../axiosConfig";

const apiClient = getClient();

export const createNewUser = async (userData) => {
  try {
    const res = await apiClient.post(`/users`, { ...userData });
    if (res.data.errors) {
      throw new Error("Errors getting user data");
    }
    return { ...res.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getOneUser = async () => {
  try {
    const res = await apiClient.get(`/users`);
    if (res.data.errors) {
      throw new Error("Errors getting user data");
    }
    console.log(res.data);
    return { ...res.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateOneUser = async ( updatedUserData) => {
  try {
    const res = await apiClient.put(`/users`, { ...updatedUserData });
    if (res.data.errors) {
      throw new Error("Errors getting user data");
    }
    return { user: { ...res.data } };
  } catch (err) {
    return Promise.reject(err);
  }
};
