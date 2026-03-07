// models/course_lo_details.js

module.exports = (sequelize, DataTypes) => {

  const CourseLoDetails = sequelize.define(

    "CourseLoDetails",

    {

      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },

      curriculum_lo_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },

      course_lo_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },

      created_at: {
        type: DataTypes.DATE,
      },

      updated_at: {
        type: DataTypes.DATE,
      },

    },

    {
      tableName: "course_lo_details",
      timestamps: false,
      underscored: true,
    }

  );

  return CourseLoDetails;

};