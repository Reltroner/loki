// services/coursePlanQuery.js

const {
  Courses,
  Lecturers,
  CourseLos,
  CoursePlanDetails,
  CoursePlanReferences,
  CoursePlanAssessments,
} = require("../models");

/*
|--------------------------------------------------------------------------
| BASE QUERY ATTRIBUTES
|--------------------------------------------------------------------------
*/

const baseAttributes = [
  "id",
  "course_id",
  "rev",
  "name",
  "semester",
  "code",
  "credit",
  "description",
];

/*
|--------------------------------------------------------------------------
| BASE INCLUDE RELATIONS
|--------------------------------------------------------------------------
*/

const baseInclude = [
  {
    model: Courses,
    attributes: ["name", "semester", "curriculum_id"],
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

module.exports = {
  baseAttributes,
  baseInclude,
};