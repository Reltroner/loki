// modules/auth/authService.js

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRepository = require("./authRepository");
const { normalizeRole } = require("./utils/roleMapper");

exports.registerUser = async ({ name, email, password }) => {

  if (!name || !email || !password) {
    const err = new Error("Missing required data");
    err.code = "DATA_REQUIRED";
    throw err;
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userRepository.createUser({
    name,
    email,
    password: hash
  });

  const role = normalizeRole(user);

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role
  };
  
};

exports.loginUser = async ({ email, password }) => {

  if (!email || !password) {
    const err = new Error("Invalid parameters");
    err.code = "INVALID_PARAMS";
    throw err;
  }

  const user = await userRepository.findUserByEmail(email);

  // 🔥 SECURITY: no user existence leak
  if (!user) {
    const err = new Error("Invalid credentials");
    err.code = "INVALID_CREDENTIALS";
    throw err;
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    const err = new Error("Invalid credentials");
    err.code = "INVALID_CREDENTIALS";
    throw err;
  }

  const role = normalizeRole(user);

  const token = jwt.sign(
    {
      id: user.id,
      role
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "1h"
    }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role
    }
  };
};
