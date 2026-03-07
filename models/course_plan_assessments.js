// models/course_plan_assessments.js

module.exports = (sequelize, DataTypes) => {

  const CoursePlanAssessments = sequelize.define(

    "CoursePlanAssessments",

    {

      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      course_plan_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      percentage: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },

      flag: {
        type: DataTypes.INTEGER,
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
      tableName: "course_plan_assessments",
      timestamps: false,
    }

  );

  return CoursePlanAssessments;

};