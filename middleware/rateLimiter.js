// middleware/rateLimiter.js

const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 10, // max 10 request
  message: {
    error: "Too many login attempts",
    code: "RATE_LIMIT"
  },
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = {
  loginLimiter
};