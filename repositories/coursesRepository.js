// repositories/coursesRepository.js

const { Courses } = require("../models");

const findAllCourses = async () => {
  return Courses.findAll();
};

const createCourse = async (data) => {
  return Courses.create(data);
};

module.exports = {
  findAllCourses,
  createCourse
};