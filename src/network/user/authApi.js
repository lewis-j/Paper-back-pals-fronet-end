import * as axios from "../axiosConfig";

const client = axios.getClient();

const createRefPath = (parentPath) => (path) => {
  return `${parentPath}/${path}`;
};

const setAuthHeader = (token) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

const withAuthPath = createRefPath("authentication");

export const googleAuth = async (_token) => {
  try {
    const res = await client.post(
      withAuthPath("google"),
      {},
      setAuthHeader(_token)
    );
    const user = res.data;
    return user;
  } catch (error) {
    Promise.reject(error);
  }
};

export const login = async (_token) => {
  try {
    const res = await client.post(
      withAuthPath("login"),
      {},
      setAuthHeader(_token)
    );
    const user = res.data;
    return user;
  } catch (error) {}
};

export const authUserRegister = async (_token) => {
  try {
    const res = await client.post(
      withAuthPath("register"),
      {},
      setAuthHeader(_token)
    );
    const user = res.data;
    return user;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const authUserFetch = async () => {
  try {
    const res = await client.get("authentication");
    console.log("response in authuserfetch", res);
    const user = res.data;
    return user;
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
