// middleware/authMiddleware.js

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

  try {

    const token = req.cookies?.jwt;

    if (!token) {
      return res.status(401).render("err401");
    }

    const decoded = jwt.verify(
      token,
      process.env.TOKEN_SECRET
    );

    req.user = decoded;

    next();

  } catch (error) {

    return res.status(401).render("err401");

  }

};

module.exports = authMiddleware;