// repositories/queryBuilders/coursePlanQuery.js

const {
  Courses,
  Lecturers,
  CourseLos,
  CoursePlanDetails,
  CoursePlanReferences,
  CoursePlanAssessments
} = require("../../models");

const BASE_ATTRIBUTES = [
  "id",
  "course_id",
  "rev",
  "name",
  "semester",
  "code",
  "credit",
  "description"
];

function buildCoursePlanQuery(options = {}) {

  const {
    where = {},
    includeLecturers = true,
    includeDetails = true
  } = options;

  const include = [];

  include.push({
    model: Courses,
    attributes: ["name", "curriculum_id"],
    required: true
  });

  if (includeLecturers) {
    include.push({
      model: Lecturers,
      attributes: ["id", "name"],
      through: { attributes: [] },
      required: false
    });
  }

  include.push({
    model: CourseLos,
    attributes: ["id", "course_plan_id", "code", "name"],
    required: false
  });

  if (includeDetails) {

    include.push({
      model: CoursePlanDetails,
      attributes: [
        "id",
        "course_plan_id",
        "week",
        "material",
        "method",
        "student_experience"
      ],
      required: false
    });

    include.push({
      model: CoursePlanReferences,
      attributes: [
        "id",
        "course_plan_id",
        "title",
        "author",
        "publisher",
        "year",
        "description"
      ],
      required: false
    });

    include.push({
      model: CoursePlanAssessments,
      attributes: [
        "id",
        "course_plan_id",
        "name",
        "percentage"
      ],
      required: false
    });

  }

  return {
    attributes: BASE_ATTRIBUTES,
    include,
    where
  };

}

module.exports = {
  buildCoursePlanQuery
};