import * as userApi from "./userApi";
import * as firebaseApi from "./firebase";
import { updateCurrentRead as updateReduxCurrentRead } from "../../redux/user/userSlice";
import { getDefaultUserImg } from "../../utilities/getDefaultUserImg";
import * as authApi from "./authApi";
import * as axios from "../axiosConfig.js";

// const fetchUser = () => {
//   console.log("fetching user");
//   return firebaseApi.observeUser(
//     async (token) => {
//       setToken(token);
//       return await userApi.getOneUser();
//     },
//     () => {
//       setToken(null);
//     }
//   );
// };

const loginWithGoogle = async () => {
  try {
    const res = await firebaseApi.loginGoogle();
    // console.log("firebase response", res);
    // const { displayName: username, photoURL: profilePicture } = res.user;
    const token = await res?.user?.getIdToken();
    const user = await authApi.postIdTokenToLogin(token);
    const test = await axios.getClient().post("authentication/test");
    console.log("test", test, "user", user);

    // return userApi.createNewUser({
    //   username,
    //   profilePicture,
    // });
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
    console.log("login with form");
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
  // axios.setToken(null);
  return await firebaseApi.logout();
};

export {
  updateCurrentRead,
  loginWithGoogle,
  loginWithForm,
  registerUser,
  logout,
};
