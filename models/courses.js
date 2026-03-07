// models/courses.js

module.exports = (sequelize, DataTypes) => {

  const Courses = sequelize.define(

    "Courses",

    {

      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      curriculum_id: {
        type: DataTypes.BIGINT,
        allowNull: false
      },

      code: {
        type: DataTypes.STRING,
        allowNull: false
      },

      name: {
        type: DataTypes.TEXT,
        allowNull: false
      },

      alias_name: {
        type: DataTypes.STRING
      }

    },

    {
      tableName: "courses",
      timestamps: false
    }

  );

  return Courses;

};