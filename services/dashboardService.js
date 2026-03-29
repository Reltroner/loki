// services/dashboardService.js

const dashboardRepository = require("../repositories/dashboardRepository");

async function getAdminStats() {

  const data = await dashboardRepository.getAdminStats();

  if (!data) {
    return null;
  }

  return data;

}

module.exports = {
  getAdminStats
};