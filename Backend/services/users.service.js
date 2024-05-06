import { aesEncrypt } from "../controllers/helpers/encryption.js";
import firebase_db_ref, { writeData, readData } from "../db/db_ref.js";

// User operations like: createUser, verifyUser, updateUser, deleteUser

const createUser = (userData) => {
  console.log("userData -->", userData.body);
  const { username, email, password, name } = userData.body;

  const data = {
    username: username,
    email: email,
    hashedPassword: aesEncrypt(password),
    name: name,
  };

  console.log("Data -->", data);
  const newUser = writeData(data);
  if (!newUser) {
    console.error(`Error creating the user:`, error);
    return;
  }
  console.log("User created successfully!");
};

export const userServices = {
  createUser,
};
