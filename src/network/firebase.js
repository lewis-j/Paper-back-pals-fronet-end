//https://blog.logrocket.com/user-authentication-firebase-react-apps/

import axios from "axios";
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
  onAuthStateChanged,
  getIdToken,
} from "firebase/auth";

import * as userServices from "./users";

const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
});

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const firebaseParseErrorMsg = (err, defualtMsg) => {
  let message = null;
  const reg = /(?<=(auth\/)).*(?=\))/;
  message = err.message.match(reg);
  message = message ? message[0].split("-").join(" ") : defualtMsg;
  return message;
};

const fetchUser = () => {
  return new Promise((resolve, reject) => {
    try {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          localStorage.setItem("isAuthenticated", true);
          resolve(userServices.getOneUser(currentUser.accessToken));
        } else {
          localStorage.setItem("isAuthenticated", false);
          resolve({ user: null });
        }
        unsubscribe();
      });
    } catch (error) {
      reject(error);
    }
  });
};

const loginGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    console.log("google auth:", res.user.accessToken);

    return userServices.createNewUser(res.user.accessToken);
  } catch (err) {
    console.log(err);
    return Promise.reject(
      firebaseParseErrorMsg(err, "Could not log in to google")
    );
  }
};

const loginWithForm = async ({ email, password }) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    console.log("response", res);
    return userServices.getOneUser(res.user.accessToken);
  } catch (err) {
    console.error(err);
    return Promise.reject(firebaseParseErrorMsg(err, "Failed to login"));
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(res.user, {
      displayName: name,
    });
    const token = await getIdToken(res.user, true);
    return await userServices.createNewUser(token);
  } catch (err) {
    console.log("error in register form", err);
    return Promise.reject(
      firebaseParseErrorMsg(err, "Failed to register new user")
    );
  }
};

const sendPasswordReset = async (email) => {
  try {
    return await sendPasswordResetEmail(auth, email);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = async () => {
  await signOut(auth);
};

const setNewEmail = async (user, email) => {
  try {
    const res = await updateEmail(user, email);
    return userServices.updateOneUser(res.user.accessToken);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const setNewPsw = async (user, password) => {
  try {
    return await updatePassword(user, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export {
  auth,
  fetchUser,
  loginGoogle,
  loginWithForm,
  registerWithEmailAndPassword,
  sendPasswordReset,
  setNewEmail,
  setNewPsw,
  logout,
};
