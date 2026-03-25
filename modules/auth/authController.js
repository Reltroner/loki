// modules/auth/authController.js

const authService = require("./authService")

exports.registerPage = (req, res) => {
  return res.render("register")
}

exports.loginPage = (req, res) => {
  return res.render("login")
}

exports.register = async (req, res) => {
  try {

    const user = await authService.registerUser(req.body)

    return res.json({
      message: "User registered",
      user
    })

  } catch (err) {

    return res.status(500).json({
      error: err.message
    })

  }
}

exports.login = async (req, res) => {

  // DEBUG (deterministic placement)
  console.log("LOGIN BODY:", req.body)

  try {

    const data = await authService.loginUser(req.body)

    // API request
    if (req.headers["content-type"] === "application/json") {
      return res.json(data)
    }

    // set cookie for EJS session
    res.cookie("jwt", data.token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/"
    });

    const role = data.user.role

    if (role === "admin") {
      return res.redirect("/admin/dashboard")
    }

    if (role === "dosen") {
      return res.redirect(`/dosen/${data.user.id}/courses`)
    }

    if (role === "mahasiswa") {
      return res.redirect("/mahasiswa/home")
    }

    return res.redirect("/")

  } catch (err) {

    return res.status(401).render("login", {
      error: err.message
    })

  }
}

exports.logout = (req, res) => {

  res.clearCookie("jwt")

  return res.redirect("/auth/login")

}