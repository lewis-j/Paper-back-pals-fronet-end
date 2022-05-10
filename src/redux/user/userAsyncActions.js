import * as userApi from "../../network/userApi";
import * as firebaseApi from "../../network/firebase";
import { getDefaultUserImg } from "../../utilities/getDefaultUserImg";

const loginWithGoogle = async () => {
  try {
    const res = await firebaseApi.loginGoogle();
    console.log("response in google", res);
    const { displayName: username, photoURL: profilePicture } = res.user;

    return userApi.createNewUser(res.user.accessToken, {
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
    return userApi.getOneUser(res.user.accessToken);
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
  return await firebaseApi.logout();
};

export { loginWithGoogle, loginWithForm, registerUser, logout };
