import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { DB_NAME } from "../config/config.js";
import { getDatabase } from "firebase/database";

if (!DB_NAME) throw new Error(`Error loading environment variables`);

// TODO: Add SDKs for Firebase products to use
// https://firebase.google.com/docs/web/setup#available-libraries

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9SVlS0TBwjlPTCkMqIWiGS-aRxZJUQbc",
  authDomain: "cha-ching-1.firebaseapp.com",
  projectId: "cha-ching-1",
  storageBucket: "cha-ching-1.appspot.com",
  messagingSenderId: "545930954866",
  appId: "1:545930954866:web:31a8d1d289032eab6c5aeb",
  measurementId: "G-RZ9V09FEYQ",

  databaseURL: `https://${DB_NAME}.firebaseio.com`,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
console.log("firebaseApp -->", firebaseApp);

// const analytics = getAnalytics(firebaseApp);

const firebase_db = getDatabase(firebaseApp);
export default firebase_db;
