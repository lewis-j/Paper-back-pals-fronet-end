import * as firebaseApi from "./firebase";
import { getNewDefaultUserImg } from "../../utilities/getDefaultUserImg";
import * as authApi from "./authApi";
import { parseAndDispatchUserData } from "./userDataMapper";

const parseSlice = (dispatch, _user) => {
  const user = parseAndDispatchUserData(dispatch, _user);
  return user;
};

const fetchUser = async (_, { dispatch }) => {
  try {
    // await authApi.enableCsrfProtection();
    const authUser = await authApi.authUserFetch();
    return parseSlice(dispatch, authUser);
  } catch (error) {
    return Promise.reject(error);
  }
};

const loginWithGoogle = async (_, { dispatch }) => {
  try {
    // await authApi.enableCsrfProtection();
    const res = await firebaseApi.loginGoogle();
    const token = await res?.user?.getIdToken();
    const user = await authApi.googleAuth(token);
    return parseSlice(dispatch, user);
  } catch (err) {
    return Promise.reject(err);
  }
};

const loginWithForm = async ({ email, password }, { dispatch }) => {
  try {
    const res = await firebaseApi.loginWithForm(email, password);
    const token = await res?.user?.getIdToken();
    const user = await authApi.authUserLogin(token);
    return parseSlice(dispatch, user);
  } catch (err) {
    return Promise.reject(err);
  }
};

const registerUser = async ({ username, email, password }, { dispatch }) => {
  const res = await firebaseApi.registerWithEmailAndPassword(email, password);
  const defaultPic = getNewDefaultUserImg(username);
  await firebaseApi.setUsernameAndPictire(res.user, username, defaultPic);
  const token = await res?.user?.getIdToken(true);
  const user = await authApi.authUserRegister(token);
  return { user };
};

const logout = async () => {
  return await authApi.logout();
};

export { fetchUser, loginWithGoogle, loginWithForm, registerUser, logout };
