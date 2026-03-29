// repositories/coursePlanDetailRepository.js
const { CoursePlanDetails } = require("../models");

const findDetails = async ({ coursePlanId, rev }) => {
  return CoursePlanDetails.findAll({
    where: {
      course_plan_id: coursePlanId,
      rev: rev
    }
  });
};

const findDetailById = async (id) => {
  return CoursePlanDetails.findByPk(id);
};

const createDetail = async (data) => {
  return CoursePlanDetails.create(data);
};

const updateDetail = async (id, data) => {
  const detail = await CoursePlanDetails.findByPk(id);

  if (!detail) return null;

  return detail.update(data);
};

const deleteDetail = async (id) => {
  const detail = await CoursePlanDetails.findByPk(id);

  if (!detail) return null;

  return detail.destroy();
};

module.exports = {
  findDetails,
  findDetailById,
  createDetail,
  updateDetail,
  deleteDetail
};