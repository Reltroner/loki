// repositories/courseLosRepository.js

const { CourseLos } = require("../models");

const findCourseLos = async ({ coursePlanId, rev }) => {
  return CourseLos.findAll({
    where: {
      course_plan_id: coursePlanId,
      rev: rev
    }
  });
};

const findCourseLosById = async (id) => {
  return CourseLos.findByPk(id);
};

const createCourseLos = async (data) => {
  return CourseLos.create(data);
};

const updateCourseLos = async (id, data) => {
  const item = await CourseLos.findByPk(id);

  if (!item) return null;

  return item.update(data);
};

const deleteCourseLos = async (id) => {
  const item = await CourseLos.findByPk(id);

  if (!item) return null;

  return item.destroy();
};

module.exports = {
  findCourseLos,
  findCourseLosById,
  createCourseLos,
  updateCourseLos,
  deleteCourseLos
};