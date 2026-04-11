// modules/auth/authController.js

const authService = require("./authService");
const { recordFailure, resetAttempts, isLocked } = require("./loginAttemptStore");

// 🔥 helper: detect API request (deterministic)
function isApiRequest(req) {
  return (
    req.headers["content-type"]?.includes("application/json") ||
    req.headers["accept"]?.includes("application/json")
  );
}

exports.registerPage = (req, res) => {
  return res.render("register");
};

exports.loginPage = (req, res) => {
  return res.render("login");
};

exports.register = async (req, res) => {

  let { name, email, password } = req.body;

  // 🔥 normalization (PHASE 9)
  if (typeof email === "string") {
    email = email.trim().toLowerCase();
  }

  if (!name || typeof name !== "string") {
    return res.status(400).json({
      error: "Invalid name",
      code: "INVALID_NAME",
      path: req.path
    });
  }

  if (!email || typeof email !== "string") {
    return res.status(400).json({
      error: "Invalid email",
      code: "INVALID_EMAIL",
      path: req.path
    });
  }

  if (!password || typeof password !== "string") {
    return res.status(400).json({
      error: "Invalid password",
      code: "INVALID_PASSWORD",
      path: req.path
    });
  }

  try {

    const user = await authService.registerUser({
      name,
      email,
      password
    });

    console.log({
      action: "REGISTER",
      email,
      timestamp: Date.now()
    });

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
      error: err.message || "Register failed",
      code: err.code || "REGISTER_FAILED",
      path: req.path
    });
  }
};

exports.login = async (req, res) => {

  let { email, password } = req.body;

  // 🔥 normalization (PHASE 9)
  if (typeof email === "string") {
    email = email.trim().toLowerCase();
  }

  if (!email || typeof email !== "string") {

    if (isApiRequest(req)) {
      return res.status(400).json({
        error: "Invalid email",
        code: "INVALID_EMAIL",
        path: req.path
      });
    }

    return res.status(400).render("login", {
      error: "Invalid email"
    });
  }

  if (!password || typeof password !== "string") {

    if (isApiRequest(req)) {
      return res.status(400).json({
        error: "Invalid password",
        code: "INVALID_PASSWORD",
        path: req.path
      });
    }

    return res.status(400).render("login", {
      error: "Invalid password"
    });
  }

  if (isLocked(email)) {

    if (isApiRequest(req)) {
      return res.status(429).json({
        error: "Too many attempts",
        code: "TOO_MANY_ATTEMPTS",
        path: req.path
      });
    }

    return res.status(429).render("login", {
      error: "Too many failed attempts. Try again later."
    });
  }

  try {

    const data = await authService.loginUser({ email, password });

    resetAttempts(email);

    console.log({
      action: "LOGIN_SUCCESS",
      email,
      userId: data.user.id,
      timestamp: Date.now()
    });

    if (isApiRequest(req)) {
      return res.json(data);
    }

    res.cookie("jwt", data.token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000
    });

    return res.redirect("/dashboard");

  } catch (err) {

    recordFailure(email);

    console.log({
      action: "LOGIN_FAILED",
      email,
      timestamp: Date.now()
    });

    if (isApiRequest(req)) {
      return res.status(401).json({
        error: "Invalid credentials",
        code: "INVALID_CREDENTIALS",
        path: req.path
      });
    }

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