// modules/auth/authService.js

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRepository = require("./authRepository");
const { normalizeRole } = require("../../utils/roleMapper");

exports.registerUser = async ({ name, email, password }) => {

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

  console.log("LOGIN EMAIL:", email);

  const user = await userRepository.findUserByEmail(email);

  console.log("DB USER:", user);

  if (!user) {
    throw new Error("User not found");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Wrong password");
  }

  const role = normalizeRole(user);

  const token = jwt.sign(
    {
      id: user.id,
      role
    },
    process.env.TOKEN_SECRET
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