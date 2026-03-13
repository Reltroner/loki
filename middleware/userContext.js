// middleware/userContext.js

const { roleToType } = require("../utils/roleMapper");

module.exports = (req, res, next) => {

  if (!req.user) {
    res.locals.user = null;
    return next();
  }

  res.locals.user = {
    id: req.user.id,
    name: req.user.name,
    role: req.user.role,
    type: roleToType[req.user.role] || null
  };

  next();

};