// middleware/verifyToken.js

const jwt = require("jsonwebtoken");

exports.authenticateToken = (req, res, next) => {

  const token = req.cookies.jwt;

  if (!token) {
    return res.redirect("/auth/login");
  }

  try {

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = decoded;

    next();

  } catch (err) {

    return res.redirect("/auth/login");

  }

};