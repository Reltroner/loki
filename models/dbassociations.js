// models/dbassociations.js

module.exports = (models) => {

  const {
    CourseLoDetails,
    CourseLos,
    CoursePlanAssessments,
    CoursePlanDetailAssessments,
    CoursePlanDetailOutcomes,
    CoursePlanDetailRefs,
    CoursePlanLecturers,
    CoursePlanReferences,
    CoursePlanDetails,
    CoursePlans,
    CourseRequirements,
    Courses,
    Curricula,
    CurriculumLos,
    CurriculumProfiles,
    Lecturers
  } = models;


  /*
  |--------------------------------------------------------------------------
  | ONE TO MANY
  |--------------------------------------------------------------------------
  */

  Courses.hasMany(CourseRequirements, {
    as: "matkul",
    foreignKey: "course_id"
  });

  Courses.hasMany(CourseRequirements, {
    as: "matkulPrasyarat",
    foreignKey: "required_course_id"
  });

  CourseRequirements.belongsTo(Courses, {
    foreignKey: "course_id"
  });


  Courses.hasMany(CoursePlans, {
    foreignKey: "course_id"
  });

  CoursePlans.belongsTo(Courses, {
    foreignKey: "course_id"
  });


  Curricula.hasMany(Courses, {
    foreignKey: "curriculum_id"
  });

  Courses.belongsTo(Curricula, {
    foreignKey: "curriculum_id"
  });


  Curricula.hasMany(CurriculumProfiles, {
    foreignKey: "curriculum_id"
  });

  CurriculumProfiles.belongsTo(Curricula, {
    foreignKey: "curriculum_id"
  });


  Curricula.hasMany(CurriculumLos, {
    foreignKey: "curriculum_id"
  });

  CurriculumLos.belongsTo(Curricula, {
    foreignKey: "curriculum_id"
  });


  CoursePlans.hasMany(CourseLos, {
    foreignKey: "course_plan_id"
  });

  CourseLos.belongsTo(CoursePlans, {
    foreignKey: "course_plan_id"
  });


  CoursePlans.hasMany(CoursePlanAssessments, {
    foreignKey: "course_plan_id"
  });

  CoursePlanAssessments.belongsTo(CoursePlans, {
    foreignKey: "course_plan_id"
  });


  CoursePlans.hasMany(CoursePlanDetails, {
    foreignKey: "course_plan_id"
  });

  CoursePlanDetails.belongsTo(CoursePlans, {
    foreignKey: "course_plan_id"
  });


  CoursePlans.hasMany(CoursePlanReferences, {
    foreignKey: "course_plan_id"
  });

  CoursePlanReferences.belongsTo(CoursePlans, {
    foreignKey: "course_plan_id"
  });


  /*
  |--------------------------------------------------------------------------
  | MANY TO MANY
  |--------------------------------------------------------------------------
  */

  CurriculumLos.belongsToMany(CourseLos, {

    through: CourseLoDetails,
    foreignKey: "curriculum_lo_id"

  });

  CourseLos.belongsToMany(CurriculumLos, {

    through: CourseLoDetails,
    foreignKey: "course_lo_id"

  });


  CoursePlanAssessments.belongsToMany(CoursePlanDetails, {

    through: CoursePlanDetailAssessments,
    foreignKey: "course_plan_assessment_id"

  });

  CoursePlanDetails.belongsToMany(CoursePlanAssessments, {

    through: CoursePlanDetailAssessments,
    foreignKey: "course_plan_detail_id"

  });


  CourseLos.belongsToMany(CoursePlanDetails, {

    through: CoursePlanDetailOutcomes,
    foreignKey: "course_lo_id"

  });

  CoursePlanDetails.belongsToMany(CourseLos, {

    through: CoursePlanDetailOutcomes,
    foreignKey: "course_plan_detail_id"

  });


  CoursePlanReferences.belongsToMany(CoursePlanDetails, {

    through: CoursePlanDetailRefs,
    foreignKey: "course_plan_reference_id"

  });

  CoursePlanDetails.belongsToMany(CoursePlanReferences, {

    through: CoursePlanDetailRefs,
    foreignKey: "course_plan_detail_id"

  });


  Lecturers.belongsToMany(CoursePlans, {

    through: CoursePlanLecturers,
    foreignKey: "lecturer_id"

  });

  CoursePlans.belongsToMany(Lecturers, {

    through: CoursePlanLecturers,
    foreignKey: "course_plan_id"

  });

};