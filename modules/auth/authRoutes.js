// modules/auth/authRoutes.js

const express = require("express");
const router = express.Router();

const authController = require("./authController");

// 🔥 import rate limiter
const { loginLimiter } = require("../../middleware/rateLimiter");

router.get("/register", authController.registerPage);
router.post("/register", authController.register);

router.get("/login", authController.loginPage);

// 🔥 apply rate limiter ONLY ke login POST
router.post("/login", loginLimiter, authController.login);

router.get("/logout", authController.logout);

module.exports = router;