import { getClient, setcsrfToken } from "../axiosConfig";

const apiClient = getClient();

export const createNewUser = async (userData) => {
  try {
    console.log("running create user");
    const token = await apiClient.get(`/users/token`);
    console.log("Token i createNewUser", token);
    setcsrfToken(token.data);
    const res = await apiClient.post(`/users`, { ...userData });
    if (res.data.errors) {
      throw new Error("Errors getting user data");
    }
    console.log("resonse from create user", res);
    return { user: res.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getOneUser = async (context) => {
  console.log("getting user", context);
  try {
    const res = await apiClient.get(`/users`);
    if (res.data.errors) {
      throw new Error("Errors getting user data");
    }
    console.log("random call to create one user", res.data);
    return { user: res.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateOneUser = async (updatedUserData) => {
  try {
    const res = await apiClient.put(`/users`, { ...updatedUserData });
    if (res.data.errors) {
      throw new Error("Errors getting user data");
    }
    return { user: { user: res.data } };
  } catch (err) {
    return Promise.reject(err);
  }
};
