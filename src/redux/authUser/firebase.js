//https://blog.logrocket.com/user-authentication-firebase-react-apps/
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
} from "firebase/auth";

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
  console.log("err in parser", err);
  let message = null;
  const reg = /(?<=(auth\/)).*(?=\))/;
  message = err.message.match(reg);
  message = message ? message[0].split("-").join(" ") : defualtMsg;
  message = message[0].toUpperCase() + message.slice(1);
  console.log("message in parser", message);
  return message;
};

const loginGoogle = async () => {
  try {
    return await signInWithPopup(auth, googleProvider);
  } catch (err) {
    console.log(err);
    return Promise.reject(
      firebaseParseErrorMsg(err, "Could not log in to google")
    );
  }
};

const loginWithForm = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    return Promise.reject(firebaseParseErrorMsg(err, "Failed to login"));
  }
};

const registerWithEmailAndPassword = async (email, password) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    return user;
  } catch (err) {
    const parsedErrMsg = firebaseParseErrorMsg(
      err,
      "Failed to register new user"
    );
    console.log("error in register form", parsedErrMsg);
    return Promise.reject(parsedErrMsg);
  }
};

const sendPasswordReset = async (email) => {
  try {
    return await sendPasswordResetEmail(auth, email);
  } catch (err) {
    const parsedErrMsg = firebaseParseErrorMsg(err, "Could not send email");
    console.log("parsed error in send passResetEmail", parsedErrMsg);
    return Promise.reject(parsedErrMsg);
  }
};

const logout = async () => {
  await signOut(auth);
};

const setNewEmail = async (user, email) => {
  try {
    return await updateEmail(user, email);
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

const setUsernameAndPictire = async (user, username, pic) => {
  try {
    const res = await updateProfile(user, {
      displayName: username,
      photoURL: pic,
    });
    console.log("updateprofile response", res);
    return res;
  } catch (error) {
    console.log("error", error);
  }
};

export {
  auth,
  // observeUser,
  loginGoogle,
  loginWithForm,
  registerWithEmailAndPassword,
  setUsernameAndPictire,
  sendPasswordReset,
  setNewEmail,
  setNewPsw,
  logout,
};
