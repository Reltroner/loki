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

    const data = await authService.loginUser(req.body)

    // API request
    if (req.headers["content-type"] === "application/json") {
      return res.json(data)
    }

    // set cookie for EJS session
    res.cookie("jwt", data.token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    })

    // role redirect
    const role = data.user.role

    if (role === "admin")
      return res.redirect("/admin/coursesPlan")

    if (role === "dosen")
      return res.redirect(`/dosen/${data.user.id}/courses`)

    if (role === "mahasiswa")
      return res.redirect("/mahasiswa/home")

    res.redirect("/")

  } catch (err) {

    res.status(401).render("login", {
      error: err.message
    })

  }
  console.log("LOGIN USER ROLE:", data.user.role)
}

exports.logout = (req, res) => {

  res.clearCookie("jwt");

  res.redirect("/auth/login");

};