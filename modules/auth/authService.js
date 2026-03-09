// modules/auth/authService.js

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userRepository = require("./authRepository")

exports.registerUser = async ({ name, email, password }) => {

  const hash = await bcrypt.hash(password, 10)

  const user = await userRepository.createUser({
    name,
    email,
    password: hash
  })

  return user
}

exports.loginUser = async ({ email, password }) => {

  const user = await userRepository.findUserByEmail(email)

  if (!user) {
    throw new Error("User not found")
  }

  const match = await bcrypt.compare(password, user.password)

  if (!match) {
    throw new Error("Wrong password")
  }

  const token = jwt.sign(
    { id: user.id },
    process.env.TOKEN_SECRET
  )

  return token
}