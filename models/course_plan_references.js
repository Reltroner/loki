// models/course_plan_references.js

module.exports = (sequelize, DataTypes) => {

  const CoursePlanReferences = sequelize.define(

    "CoursePlanReferences",

    {

      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      course_plan_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      publisher: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      year: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      created_at: {
        type: DataTypes.DATE,
      },

      update_at: {
        type: DataTypes.DATE,
      },

    },

    {
      tableName: "course_plan_references",
      timestamps: false,
    }

  );

  return CoursePlanReferences;

};