// controllers/dashboardController.js

const dashboardService = require("../services/dashboardService");

const getAdminDashboard = async (req, res, next) => {
  try {
    const stats = await dashboardService.getAdminStats();

    return res.render("admin/dashboard", {
      stats
    });

  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAdminDashboard
};