import * as firebaseApi from "./firebase";
import { getDefaultUserImg } from "../../utilities/getDefaultUserImg";
import * as authApi from "./authApi";
import {
  setFriendRequestInbox,
  setFriendRequestOutbox,
  setFriends,
} from "../Friends";
import { setBooks } from "../library";

const parseSlice = (dispatch, _user) => {
  const {
    friends,
    friendRequestInbox,
    friendRequestOutbox,
    ownedBooks: owned,
    borrowedBooks: borrowed,
    ...user
  } = _user;
  dispatch(setFriendRequestInbox({ friendRequestInbox: friendRequestInbox }));
  dispatch(
    setFriendRequestOutbox({ friendRequestOutbox: friendRequestOutbox })
  );
  dispatch(setFriends({ friends }));
  dispatch(setBooks({ borrowed, owned }));
  return { user };
};

const fetchUser = async (_, { dispatch }) => {
  try {
    await authApi.enableCsrfProtection();
    const user = await authApi.authUserFetch();
    console.log("user in fetch call", { user });
    return parseSlice(dispatch, user);
  } catch (error) {
    return Promise.reject(error);
  }
};

const loginWithGoogle = async (_, { dispatch }) => {
  try {
    await authApi.enableCsrfProtection();
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
  const defaultPic = getDefaultUserImg(username);
  await firebaseApi.setUsernameAndPictire(res.user, username, defaultPic);
  const token = await res?.user?.getIdToken(true);
  const user = await authApi.authUserRegister(token);
  return { user };
};

const logout = async () => {
  return await authApi.logout();
};

export { fetchUser, loginWithGoogle, loginWithForm, registerUser, logout };
