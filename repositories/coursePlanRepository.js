// repositories/coursePlanRepository.js

const { Op } = require("sequelize");
const { CoursePlans } = require("../models");

const {
  buildCoursePlanQuery
} = require("./queryBuilders/coursePlanQuery");

/*
|--------------------------------------------------------------------------
| INTERNAL HELPERS
|--------------------------------------------------------------------------
*/

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

const toNumber = (value, name) => {
  const num = Number(value);

  if (Number.isNaN(num)) {
    throw new Error(`${name} must be numeric`);
  }

  return num;
};

/*
|--------------------------------------------------------------------------
| FIND SINGLE COURSE PLAN
|--------------------------------------------------------------------------
*/

const findCoursePlan = async (courseId, rev) => {

  assert(courseId, "courseId is required");
  assert(rev !== undefined, "rev is required");

  const revision = toNumber(rev, "rev");

  const query = buildCoursePlanQuery({
    where: {
      course_id: courseId,
      rev: revision
    }
  });

  return CoursePlans.findAll(query);

};

/*
|--------------------------------------------------------------------------
| FIND ALL COURSE PLANS
|--------------------------------------------------------------------------
*/

const findAllCoursePlans = async () => {

  const query = buildCoursePlanQuery();

  query.order = [["rev", "DESC"]];

  return CoursePlans.findAll(query);

};

/*
|--------------------------------------------------------------------------
| SEARCH COURSE PLAN
|--------------------------------------------------------------------------
*/

const searchCoursePlan = async (term) => {

  assert(term, "search term is required");

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

/*
|--------------------------------------------------------------------------
| UPDATE COURSE PLAN
|--------------------------------------------------------------------------
*/

const updateCoursePlan = async (courseId, rev, data = {}, transaction = null) => {

  assert(courseId, "courseId is required");
  assert(rev !== undefined, "rev is required");

  const revision = toNumber(rev, "rev");

  const [affectedRows] = await CoursePlans.update(data, {
    where: {
      course_id: courseId,
      rev: revision
    },
    transaction
  });

  return {
    updated: affectedRows
  };

};

/*
|--------------------------------------------------------------------------
| CREATE REVISION
|--------------------------------------------------------------------------
*/

const createRevision = async (data = {}, transaction = null) => {

  assert(data.course_id, "course_id is required");
  assert(data.rev !== undefined, "rev is required");

  return CoursePlans.create(data, {
    transaction
  });

};

/*
|--------------------------------------------------------------------------
| EXPORT
|--------------------------------------------------------------------------
*/

module.exports = {
  findCoursePlan,
  findAllCoursePlans,
  searchCoursePlan,
  updateCoursePlan,
  createRevision
};