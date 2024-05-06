import { push, set, ref } from "firebase/database";
import firebase_db_ref from "../services/firebaseConfig.service.js";
import { DB_NAME } from "../config/config.js";

if (!DB_NAME) throw new Error(`Error loading env variables`);

const doc_ref = `${firebase_db_ref}/users/`;

export const writeData = (data) => {
  // let userId = ;
  console.log(`writeData called...`);
  console.log("Data:", data);
  // push(ref(firebase_db_ref, "users/"), {
  //   username: data.username,
  //   email: data.email,
  //   hashedPassword: data.hashedPassword,
  //   name: data.name,
  // });
  push(ref(doc_ref), data);
  console.log(`Data written in table "${path}" successfully...`);
};

export const readData = (path, callback) => {
  console.log(`readData called...`);
  firebase_db_ref.child(path).once("value", (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};

export default { writeData, readData };
