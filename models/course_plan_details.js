// models/course_plan_details.js

module.exports = (sequelize, DataTypes) => {

  const CoursePlanDetails = sequelize.define(

    "CoursePlanDetails",

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

      week: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      material: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      method: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      student_experience: {
        type: DataTypes.TEXT,
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
      tableName: "course_plan_details",
      timestamps: false,
    }

  );

  return CoursePlanDetails;

};