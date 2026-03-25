// modules/auth/middleware/authenticate.js
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {

  console.log("COOKIES:", req.cookies);

  const token = req.cookies?.jwt;

  console.log("TOKEN:", token);

  if (!token) {
    return res.status(401).render("err401");
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    console.log("DECODED:", decoded);

    req.user = decoded;

    next();

  } catch (error) {
    console.error("JWT ERROR:", error);
    return res.status(401).render("err401");
  }

};

module.exports = { authenticate };