// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSbQd4gKITd3BviejnrMdMsFQBwmhJAsM",
  authDomain: "clone-fe926.firebaseapp.com",
  projectId: "clone-fe926",
  storageBucket: "clone-fe926.appspot.com",
  messagingSenderId: "185859544548",
  appId: "1:185859544548:web:97f8dd54da5d8dc0d7e3f1",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const db = app.firestore();

export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
