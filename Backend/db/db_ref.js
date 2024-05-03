import firebase_db from "../services/firebaseConfig.service.js";
import { DB_NAME } from "../config/config.js";

export const firebase_db_ref = firebase_db.ref(`${DB_NAME}/`);

export const writeData = (path, data) => {
  console.log(`writeData called...`);
  console.log("Data:", data);
  firebase_ref.ref(path).set(data);
  console.log(`Data written in table "${path}" successfully...`);
};

export const readData = (path, callback) => {
  console.log(`readData called...`);
  firebase.ref.ref(path).once("value", (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};

export default { writeData, readData };
