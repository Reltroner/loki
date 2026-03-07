// models/course_requirements.js

module.exports = (sequelize, DataTypes) => {

  const CourseRequirements = sequelize.define(

    "CourseRequirements",

    {

      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      course_id: {
        type: DataTypes.BIGINT,
        allowNull: false
      },

      required_course_id: {
        type: DataTypes.BIGINT,
        allowNull: false
      },

      required_level: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      created_at: {
        type: DataTypes.DATE
      },

      updated_at: {
        type: DataTypes.DATE
      }

    },

    {
      tableName: "course_requirements",
      timestamps: false
    }

  );

  return CourseRequirements;

};