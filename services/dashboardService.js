// services/dashboardService.js

const dashboardRepository = require("../repositories/dashboardRepository");

async function getAdminStats() {
  return dashboardRepository.getAdminStats();
}

module.exports = {
  getAdminStats
};