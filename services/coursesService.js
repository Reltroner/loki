// services/coursesService.js

const repository = require("../repositories/coursesRepository");

exports.getAllCourses = async () => {

  const data = await repository.findAllCourses();

  if (!Array.isArray(data)) {
    return [];
  }

  return data;
};

exports.createCourse = async (data) => {

  if (!data) {
    throw new Error("DATA_REQUIRED");
  }

  return repository.createCourse(data);
};

exports.getMatkul = async () => {
  return [];
};