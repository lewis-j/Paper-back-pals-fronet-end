import * as firebaseApi from "./firebase";
import { getDefaultUserImg } from "../../utilities/getDefaultUserImg";
import { setCurrentRead } from "../../redux/user/userSlice";
import * as authApi from "./authApi";

const fetchUser = async () => {
  try {
    await authApi.enableCsrfProtection();
    const user = await authApi.authUserFetch();
    return { user };
  } catch (error) {
    return Promise.reject(error);
  }
};

const loginWithGoogle = async () => {
  try {
    await authApi.enableCsrfProtection();
    const res = await firebaseApi.loginGoogle();
    const token = await res?.user?.getIdToken();
    const user = await authApi.googleAuth(token);
    console.log("user", user);
    return { user };
  } catch (err) {
    return Promise.reject(err);
  }
};

const updateCurrentRead = async ({ userBook }, { getState, dispatch }) => {
  try {
    const user = getState().user.currentUser;
    const updateUserDto = { ...user, currentRead: userBook._id };
    await authApi.authUserUpdate(updateUserDto);
    dispatch(setCurrentRead(userBook));
  } catch (error) {
    return Promise.reject(error);
  }
};

const loginWithForm = async ({ email, password }) => {
  try {
    const res = await firebaseApi.loginWithForm(email, password);
    const token = await res?.user?.getIdToken();
    const user = await authApi.authUserLogin(token);
    return { user };
  } catch (err) {
    return Promise.reject(err);
  }
};

const registerUser = async ({ username, email, password }) => {
  const res = await firebaseApi.registerWithEmailAndPassword(email, password);
  const defaultPic = getDefaultUserImg(username);
  const result = await firebaseApi.setUsernameAndPictire(
    res.user,
    username,
    defaultPic
  );
  console.log("updated user profile", result);
  const token = await res?.user?.getIdToken(true);
  const user = authApi.authUserRegister(token);
  return { user };
};

const logout = async () => {
  await authApi.logout();
  return await firebaseApi.logout();
};

export {
  fetchUser,
  updateCurrentRead,
  loginWithGoogle,
  loginWithForm,
  registerUser,
  logout,
};
