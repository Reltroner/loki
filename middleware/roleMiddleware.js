// middleware/roleMiddleware.js

module.exports = function requireRole(role) {

  return (req, res, next) => {

    if (!req.user) {
      return res.redirect("/auth/login");
    }

    if (req.user.role !== role) {
      return res.status(403).render("err403");
    }

    next();
  };

};