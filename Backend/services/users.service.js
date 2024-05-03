import { aesEncrypt } from "../controllers/helpers/encryption.js";
import firebase_db_ref, { writeData, readData } from "../db/db_ref.js";

// User operations like: createUser, verifyUser, updateUser, deleteUser

const createUser = (userData) => {
  const { username, email, password, name } = req.body;

  const data = {
    username: username,
    email: email,
    hashedPassword: aesEncrypt(password),
    name: name,
  };

  console.log("Data -->", data);
  const newUser = writeData(`${{ firebase_db_ref }.toString()}/users`, data);
  if (!newUser) {
    console.error(`Error creating the user:`, error);
    return;
  }
  console.log("User created successfully!");
};

export const userServices = {
  createUser,
};
