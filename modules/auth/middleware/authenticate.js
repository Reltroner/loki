// modules/auth/middleware/authenticate.js
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {

  const token = req.cookies?.jwt;

  if (!token) {
    return res.status(401).render("err401");
  }

  try {

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = decoded;

    return next();

  } catch (error) {

    // 🔥 deterministic classification (internal only)
    if (error.name === "TokenExpiredError") {
      console.error("AUTH ERROR: TOKEN EXPIRED");
    } else if (error.name === "JsonWebTokenError") {
      console.error("AUTH ERROR: INVALID TOKEN");
    } else {
      console.error("AUTH ERROR:", error.message);
    }

    return res.status(401).render("err401");
  }

};

module.exports = { authenticate };