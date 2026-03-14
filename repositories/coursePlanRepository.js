// repositories/coursePlanRepository.js

const { Op } = require("sequelize");
const { CoursePlans } = require("../models");

const {
  buildCoursePlanQuery
} = require("./queryBuilders/coursePlanQuery");

const findCoursePlan = async (courseId, rev) => {

  const query = buildCoursePlanQuery({
    where: {
      course_id: courseId,
      rev: rev
    }
  });

  return CoursePlans.findAll(query);

};

const findAllCoursePlans = async () => {

  const query = buildCoursePlanQuery();

  query.order = [["rev", "DESC"]];

  return CoursePlans.findAll(query);

};

const searchCoursePlan = async (term) => {

  const query = buildCoursePlanQuery({
    where: {
      [Op.or]: [
        {
          name: {
            [Op.like]: `${term}%`
          }
        },
        {
          code: {
            [Op.like]: `${term}%`
          }
        }
      ]
    }
  });

  query.attributes = [
    "id",
    "course_id",
    "rev",
    "name",
    "code",
    "semester"
  ];

  query.order = [["rev", "DESC"]];

  return CoursePlans.findAll(query);

};

const updateCoursePlan = async (courseId, rev, data, transaction = null) => {

  return CoursePlans.update(data, {
    where: {
      course_id: courseId,
      rev: rev
    },
    transaction
  });

};

const createRevision = async (data, transaction = null) => {

  return CoursePlans.create(data, {
    transaction
  });

};

module.exports = {
  findCoursePlan,
  findAllCoursePlans,
  searchCoursePlan,
  updateCoursePlan,
  createRevision
};