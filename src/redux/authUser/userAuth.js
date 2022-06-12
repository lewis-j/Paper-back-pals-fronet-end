import * as firebaseApi from "./firebase";
import { getDefaultUserImg } from "../../utilities/getDefaultUserImg";
// import { setCurrentRead } from "../../redux/authUser/authUserSlice";
import * as authApi from "./authApi";
import { setFriends } from "../friends/friendsSlice";
import { setBooks } from "../userBook/userBooksSlice";

const parseSlice = (dispatch, _user) => {
  const {
    friends,
    ownedBooks: owned,
    borrowedBooks: borrowed,
    ...user
  } = _user;
  dispatch(setFriends(friends));
  dispatch(setBooks({ borrowed, owned }));
  return { user };
};

const fetchUser = async (_, { dispatch }) => {
  try {
    await authApi.enableCsrfProtection();
    const user = await authApi.authUserFetch();
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

// const updateCurrentRead = async ({ userBook }, { getState, dispatch }) => {
//   try {
//     const user = getState().user.currentUser;
//     const updateUserDto = { ...user, currentRead: userBook._id };
//     await authApi.authUserUpdate(updateUserDto);
//     dispatch(setCurrentRead(userBook));
//   } catch (error) {
//     return Promise.reject(error);
//   }
// };

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
  const user = authApi.authUserRegister(token);
  return parseSlice(dispatch, user);
};

const logout = async () => {
  return await authApi.logout();
  // return await firebaseApi.logout();
};

export {
  fetchUser,
  // updateCurrentRead,
  loginWithGoogle,
  loginWithForm,
  registerUser,
  logout,
};
