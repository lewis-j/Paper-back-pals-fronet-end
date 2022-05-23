import * as userApi from "./userApi";
import * as firebaseApi from "./firebase";
import { updateCurrentRead as updateReduxCurrentRead } from "../../redux/user/userSlice";
import { getDefaultUserImg } from "../../utilities/getDefaultUserImg";
import { setToken } from "../axiosConfig.js";

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

const updateCurrentRead = async (
  { userBook_id, userBook },
  { getState, dispatch }
) => {
  try {
    const user = getState().user.currentUser;
    const updateUserDto = { ...user, currentRead: userBook_id };
    await userApi.updateOneUser(updateUserDto);
    dispatch(updateReduxCurrentRead(userBook));
  } catch (error) {
    return Promise.reject(error);
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

export {
  fetchUser,
  updateCurrentRead,
  loginWithGoogle,
  loginWithForm,
  registerUser,
  logout,
};
