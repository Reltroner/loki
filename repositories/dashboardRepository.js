// repositories/dashboardRepository.js

const { Courses, CoursePlans, Lecturers } = require("../models");

async function getAdminStats() {
  const [courses, coursePlans, lecturers] = await Promise.all([
    Courses.count(),
    CoursePlans.count(),
    Lecturers.count()
  ]);

  return {
    courses,
    coursePlans,
    lecturers
  };
}

module.exports = {
  getAdminStats
};