// middleware/roleMiddleware.js

const roleMiddleware = (...allowedRoles) => {

  return (req, res, next) => {

    const userRole = req.user?.type;

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).render("err403");
    }

    next();

  };

};

module.exports = roleMiddleware;