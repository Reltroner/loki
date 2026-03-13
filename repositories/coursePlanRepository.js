// repositories/coursePlanRepository.js

const { Op } = require("sequelize");

const {
  CoursePlans,
  Courses,
  Lecturers,
  CourseLos,
  CoursePlanDetails,
  CoursePlanReferences,
  CoursePlanAssessments
} = require("../models");

/*
|--------------------------------------------------------------------------
| BASE QUERY CONFIG
|--------------------------------------------------------------------------
*/

const BASE_ATTRIBUTES = [
  "id",
  "course_id",
  "rev",
  "name",
  "semester",
  "code",
  "credit",
  "description",
];

const BASE_INCLUDE = () => [
  {
    model: Courses,
    attributes: ["name", "curriculum_id"],
    required: true,
  },
  {
    model: Lecturers,
    attributes: ["id", "name"],
    through: {
      attributes: ["updated_at", "created_at"],
    },
    required: false,
  },
  {
    model: CourseLos,
    attributes: ["id", "course_plan_id", "code", "name"],
    required: false,
  },
  {
    model: CoursePlanDetails,
    attributes: [
      "id",
      "course_plan_id",
      "week",
      "material",
      "method",
      "student_experience",
    ],
    required: false,
  },
  {
    model: CoursePlanReferences,
    attributes: [
      "id",
      "course_plan_id",
      "title",
      "author",
      "publisher",
      "year",
      "description",
    ],
    required: false,
  },
  {
    model: CoursePlanAssessments,
    attributes: ["id", "course_plan_id", "name", "percentage"],
    required: false,
  },
];

/*
|--------------------------------------------------------------------------
| FIND SINGLE COURSE PLAN
|--------------------------------------------------------------------------
*/

const findCoursePlan = async (courseId, rev) => {

  return CoursePlans.findAll({

    attributes: BASE_ATTRIBUTES,

    include: BASE_INCLUDE(),

    where: {
      course_id: courseId,
      rev: rev,
    },

  });

};

/*
|--------------------------------------------------------------------------
| FIND ALL COURSE PLANS
|--------------------------------------------------------------------------
*/

const findAllCoursePlans = async () => {

  return CoursePlans.findAll({

    attributes: BASE_ATTRIBUTES,

    include: BASE_INCLUDE(),

    order: [["rev", "DESC"]],

  });

};

/*
|--------------------------------------------------------------------------
| SEARCH COURSE PLAN
|--------------------------------------------------------------------------
*/

const searchCoursePlan = async (term) => {

  return CoursePlans.findAll({

    attributes: [
      "id",
      "course_id",
      "rev",
      "name",
      "code",
      "semester",
    ],

    where: {
      [Op.or]: [
        {
          name: {
            [Op.like]: `${term}%`,
          },
        },
        {
          code: {
            [Op.like]: `${term}%`,
          },
        },
      ],
    },

    order: [["rev", "DESC"]],

  });

};

/*
|--------------------------------------------------------------------------
| UPDATE COURSE PLAN
|--------------------------------------------------------------------------
*/

const updateCoursePlan = async (courseId, rev, data, transaction = null) => {

  return CoursePlans.update(data, {

    where: {
      course_id: courseId,
      rev: rev,
    },

    transaction,

  });

};

/*
|--------------------------------------------------------------------------
| CREATE REVISION
|--------------------------------------------------------------------------
*/

const createRevision = async (data, transaction = null) => {

  return CoursePlans.create(data, {

    transaction,

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

  createRevision,

};