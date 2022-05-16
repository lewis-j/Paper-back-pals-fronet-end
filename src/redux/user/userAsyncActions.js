import * as userApi from "../../network/userApi";
import * as firebaseApi from "../../network/firebase";
import { getDefaultUserImg } from "../../utilities/getDefaultUserImg";
import { setToken } from "../../network/axiosConfig.js";

const fetchUser = () => {
  return firebaseApi.observeUser(
    async (token) => {
      setToken(token);
      return await userApi.getOneUser();
    },
    () => {
      setToken(null);
    }
  );
};

const loginWithGoogle = async () => {
  try {
    const res = await firebaseApi.loginGoogle();
    const { displayName: username, photoURL: profilePicture } = res.user;
    setToken(res.user.accessToken);
    return userApi.createNewUser({
      username,
      profilePicture,
    });
  } catch (err) {
    return Promise.reject(err);
  }
};

const loginWithForm = async ({ email, password }) => {
  try {
    const res = await firebaseApi.loginWithForm(email, password);
    setToken(res.user.accessToken);
    return userApi.getOneUser();
  } catch (err) {
    return Promise.reject(err);
  }
};

const registerUser = async ({ username, email, password }) => {
  const res = await firebaseApi.registerWithEmailAndPassword(email, password);
  return userApi.createNewUser(res.user.accessToken, {
    username,
    profilePicture: getDefaultUserImg(username),
  });
};

const logout = async () => {
  setToken(null);
  return await firebaseApi.logout();
};

export { fetchUser, loginWithGoogle, loginWithForm, registerUser, logout };
