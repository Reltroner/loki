// modules/auth/middleware/authorize.js

const authorize = (role) => {
  return (req, res, next) => {

    if (!req.user) {
      return res.status(401).render("err401");
    }

    if (req.user.role !== role) {
      return res.status(403).render("err403");
    }

    next();
  };
};

module.exports = { authorize };