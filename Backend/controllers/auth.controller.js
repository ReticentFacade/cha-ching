import { aesEncrypt, aesDecrypt } from "./helpers/encryption.js";
import checkPassword from "./helpers/checkPassword.js";
import { jwtGenerateToken, jwtVerifyToken } from "./helpers/jwtToken.js";
import { redisToken } from "../db/redis.db.js";
import { missingFields } from "./helpers/missingFields.js";
import { extractToken } from "./helpers/extractToken.js";
import { userServices } from "../services/users.service.js";

const register = async (req, res) => {
  const { username, email, password, name } = req.body;

  const pwStrength = checkPassword(password, username);
  if (pwStrength == "weak") {
    return res.status(400).json({ message: "Weak password. Retry" });
  }

  const data = {
    username,
    email,
    hashedPassword: aesEncrypt(password),
    name,
  };
  const missingFieldsError = missingFields(data);
  if (missingFieldsError) {
    return res.status(400).json({ message: missingFieldsError.error });
  }

  try {
    // Create & store the new user in DB
    // // TODO: const createdUser = ; <-- Handle it in the `services` dir
    const createdUser = userServices.createUser(data);
    if (!createdUser) throw new Error(`Error creating user:`, error);

    // When stored, use jwtGenerateToken
    const token = await jwtGenerateToken(username);
    console.log("Token created!", token);
    redisToken.setToken(username, token);

    res.status(201).json({ message: "Token set successfully" });
  } catch (error) {
    console.error("Error setting token:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const data = {
    username,
    hashedPassword: aesDecrypt(password),
  };
  const missingFieldsError = missingFields(data);
  if (missingFieldsError) {
    res.status(400).json({ message: missingFieldsError.error });
  }

  try {
    // Check if user exists in database.
    // const checkUser = ; <-- Handle it in the `services` dir

    // If it does, generate a token for it (inside the if-statement)
    const token = await jwtGenerateToken(username);

    res.status(200).json({ message: "Ok" });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const logout = async (req, res) => {
  const token = extractToken(req);
  try {
    if (token == null)
      res.status(500).json({ message: "Internal Server Error" });

    redisToken.deleteToken(token);
    console.log("Logout successful");
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.error("Error logging out:", err);
    res.satus(500).json({ message: "Internal Server Error" });
  }
};

export { register, login, logout };
