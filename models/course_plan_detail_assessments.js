// models/course_plan_detail_assessments.js

module.exports = (sequelize, DataTypes) => {

  const CoursePlanDetailAssessments = sequelize.define(

    "CoursePlanDetailAssessments",

    {

      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      course_plan_detail_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      course_plan_assessment_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      percentage: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },

      created_at: {
        type: DataTypes.DATE,
      },

      updated_at: {
        type: DataTypes.DATE,
      },

    },

    {
      tableName: "course_plan_detail_assessments",
      timestamps: false,
    }

  );

  return CoursePlanDetailAssessments;

};