// modules/auth/authRepository.js

const { Users } = require("../../models")

exports.createUser = async ({ name, email, password }) => {

  const user = await Users.create({
    name,
    email,
    password
  })

  return user
}

exports.findUserByEmail = async (email) => {

  return Users.findOne({
    where: { email },
    attributes: ["id", "name", "email", "password", "role"]
  });

};