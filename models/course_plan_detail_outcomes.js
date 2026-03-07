// models/course_plan_detail_outcomes.js

module.exports = (sequelize, DataTypes) => {

  const CoursePlanDetailOutcomes = sequelize.define(

    "CoursePlanDetailOutcomes",

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

      course_lo_id: {
        type: DataTypes.BIGINT,
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
      tableName: "course_plan_detail_outcomes",
      timestamps: false,
    }

  );

  return CoursePlanDetailOutcomes;

};