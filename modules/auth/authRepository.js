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

  const user = await Users.findOne({
    where: { email }
  })

  return user
}