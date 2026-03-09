// modules/auth/authController.js

const authService = require("./authService")

exports.registerPage = (req, res) => {
  res.render("register")
}

exports.loginPage = (req, res) => {
  res.render("login")
}

exports.register = async (req, res) => {
  try {

    const user = await authService.registerUser(req.body)

    res.json({
      message: "User registered",
      user
    })

  } catch (err) {

    res.status(500).json({
      error: err.message
    })

  }
}

exports.login = async (req, res) => {
  try {

    const token = await authService.loginUser(req.body)

    res.json({ token })

  } catch (err) {

    res.status(401).json({
      error: err.message
    })

  }
}

exports.logout = (req, res) => {
  res.json({
    message: "Logout success"
  })
}