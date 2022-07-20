import API, { setcsrfToken } from "../../lib/authAxios";

const createRefPath = (parentPath) => (path) => {
  return `${parentPath}/${path}`;
};

const setAuthHeader = (token) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

const withSubDir = createRefPath("authentication");

export const googleAuth = async (idToken) => {
  try {
    const res = await API.post(
      withSubDir("google"),
      {},
      setAuthHeader(idToken)
    );
    const user = res.data;
    return user;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const authUserLogin = async (idToken) => {
  try {
    const res = await API.post(withSubDir("login"), {}, setAuthHeader(idToken));
    const user = res.data;
    return user;
  } catch (error) {
    console.log("error", error);
    return Promise.reject(error);
  }
};

export const authUserRegister = async (freshIdToken) => {
  try {
    const res = await API.post(
      withSubDir("register"),
      {},
      setAuthHeader(freshIdToken)
    );
    const user = res.data;
    return user;
  } catch (error) {
    console.log("error", error);
    return Promise.reject(error);
  }
};

export const authUserFetch = async () => {
  try {
    const res = await API.get("authentication");
    const user = res.data;
    return user;
  } catch (error) {
    console.log("error", error);
    if (error.response.status === 401) error.message = "Please login again";
    return Promise.reject(error);
  }
};

export const authUserUpdate = async (updatedUser) => {
  try {
    const res = await API.update("authentication", updatedUser);
    const user = res.data;
    return user;
  } catch (error) {
    console.log("error", error);
    return Promise.reject(error);
  }
};

export const enableCsrfProtection = async () => {
  try {
    const res = await API.get(withSubDir("token"));
    setcsrfToken(res.data.csrfToken);
  } catch (error) {
    console.log("error", error);
    return Promise.reject(error);
  }
};

export const logout = async () => {
  try {
    return await API.delete(withSubDir("logout"));
  } catch (error) {
    console.log("error", error);
    return Promise.reject(error);
  }
};
