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
    next();

  } catch (err) {

    if (err.name === "TokenExpiredError") {
      return res.status(401).render("err401", {
        error: "Session expired. Please login again."
      });
    }

    return res.status(401).render("err401", {
      error: "Invalid token."
    });
  }

};

module.exports = { authenticate };