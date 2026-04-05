// modules/auth/authController.js

const authService = require("./authService");
const { recordFailure, resetAttempts, isLocked } = require("./loginAttemptStore");

exports.registerPage = (req, res) => {
  return res.render("register");
};

exports.loginPage = (req, res) => {
  return res.render("login");
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "Invalid name" });
  }

  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Invalid email" });
  }

  if (!password || typeof password !== "string") {
    return res.status(400).json({ error: "Invalid password" });
  }

  try {
    const user = await authService.registerUser(req.body);

    return res.json({
      message: "User registered",
      user
    });

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
};

exports.login = async (req, res) => {

  const { email, password } = req.body;

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

  if (isLocked(email)) {
    return res.status(429).render("login", {
      error: "Too many failed attempts. Try again later."
    });
  }

  try {

    const data = await authService.loginUser(req.body);

    resetAttempts(email);

    // API response tetap sama (non-breaking)
    if (req.headers["content-type"] === "application/json") {
      return res.json(data);
    }

    // cookie tetap sama (non-breaking)
    res.cookie("jwt", data.token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000
    });

    // 🔥 PHASE 8 COMPLIANCE
    return res.redirect("/dashboard");

  } catch (err) {

    recordFailure(email);

    return res.status(401).render("login", {
      error: "Invalid credentials"
    });

  }
};

exports.logout = (req, res) => {

  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "lax",
    path: "/"
  });

  return res.redirect("/auth/login");
};