import firebase from "firebase/app";
import "firebase/auth";

!firebase.apps.length &&
  firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
  });

const auth = firebase.auth();

// Helper method for initial load of site
// Firebase takes a second to determine currentUser object
// So we can use local storage for initial UI purposes
const getAuthenticationStatus = () => {
  return localStorage.getItem("isAuthenticated");
};

export { auth, getAuthenticationStatus };
