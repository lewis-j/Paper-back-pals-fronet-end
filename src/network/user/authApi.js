import * as axios from "../axiosConfig";

const client = axios.getClient();

const createRefPath = (parentPath) => (path) => {
  return `${parentPath}/${path}`;
};

const withAuthPath = createRefPath("authentication");

export const googleAuth = async (_token) => {
  try {
    const res = await client.post(
      withAuthPath("google"),
      {},
      { headers: { Authorization: `Bearer ${_token}` } }
    );
    return res.data;
  } catch (error) {
    Promise.reject(error);
  }
};

export const authUserRegister = async (_token) => {
  try {
    const res = await client.post(
      withAuthPath("register"),
      {},
      { headers: { Authorization: `Bearer ${_token}` } }
    );
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const authUserFetch = async () => {
  try {
    const res = await client.get("authentication");
    return res.data;
  } catch (error) {
    Promise.reject(error);
  }
};

export const enableCsrfProtection = async () => {
  try {
    const res = await client.get(withAuthPath("token"));
    axios.setcsrfToken(res.data.csrfToken);
  } catch (error) {
    Promise.reject(error);
  }
};

export const logout = async () => {
  try {
    return await client.delete(withAuthPath("logout"));
  } catch (error) {
    return Promise.reject(error);
  }
};
