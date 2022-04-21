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

const loginGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    console.log("google auth:", res.user);
    const { displayName, email, uid, accessToken } = res.user;

    const result = await axios.post(
      `${process.env.REACT_APP_NEST_URI}/users`,
      {
        userId: uid,
        username: displayName,
        email: email,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    console.log("response from /users:", result);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const loginEmailPsw = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    // const user = res.user;
    // await addDoc(collection(db, "users"), {
    //   uid: user.uid,
    //   name,
    //   authProvider: "local",
    //   email,
    // });
  } catch (err) {
    console.error(err);
    alert(err.message);
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
  return await signOut(auth);
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

export {
  auth,
  loginGoogle,
  loginEmailPsw,
  registerWithEmailAndPassword,
  sendPasswordReset,
  setNewEmail,
  setNewPsw,
  logout,
};
