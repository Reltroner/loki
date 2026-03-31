// modules/auth/authController.js

const authService = require("./authService")
const {recordFailure, resetAttempts, isLocked} = require("./loginAttemptStore");

exports.registerPage = (req, res) => {
  return res.render("register")
}

exports.loginPage = (req, res) => {
  return res.render("login")
}

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  // 🔥 validation minimal (deterministic)
  if (!name || typeof name !== "string") {
    return res.status(400).json({
      error: "Invalid name"
    });
  }

  if (!email || typeof email !== "string") {
    return res.status(400).json({
      error: "Invalid email"
    });
  }

  if (!password || typeof password !== "string") {
    return res.status(400).json({
      error: "Invalid password"
    });
  }
  try {

    const user = await authService.registerUser(req.body)

    return res.json({
      message: "User registered",
      user
    })

  } catch (err) {

    let status = 500;

    if (err.code === "DATA_REQUIRED" || err.code === "INVALID_PARAMS") {
      status = 400;
    }

    return res.status(status).json({
      error: err.message,
      code: err.code || "REGISTER_FAILED",
      path: req.path
    });

  }
}

exports.login = async (req, res) => {

  // DEBUG (deterministic placement)
  const { email, password } = req.body;

  if (isLocked(email)) {
    return res.status(429).render("login", {
      error: "Too many failed attempts. Try again later."
    });
  }

// 🔥 validation minimal (deterministic)
  if (!email || typeof email !== "string") {
    return res.status(400).render("login", {
      error: "Invalid email"
    });
  }

  if (!password || typeof password !== "string") {
    return res.status(400).render("login", {
      error: "Invalid password"
    });
  }

  try {

    const data = await authService.loginUser(req.body);

    // 🔥 record successful login
    resetAttempts(email);

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

    // 🔥 record failed login attempt
    recordFailure(email);

    return res.status(401).render("login", {
      error: err.message
    })

  }
}

exports.logout = (req, res) => {

  res.clearCookie("jwt")

  return res.redirect("/auth/login")

}