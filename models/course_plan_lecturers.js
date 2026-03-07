// models/course_plan_lecturers.js

module.exports = (sequelize, DataTypes) => {

  const CoursePlanLecturers = sequelize.define(

    "CoursePlanLecturers",

    {

      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },

      course_plan_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      lecturer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      creator: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      update_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },

    },

    {
      tableName: "course_plan_lecturers",
      timestamps: false,
    }

  );

  return CoursePlanLecturers;

};