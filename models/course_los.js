// models/course_los.js

module.exports = (sequelize, DataTypes) => {

  const CourseLos = sequelize.define(

    "CourseLos",

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

      type: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      parent_id: {
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
      tableName: "course_los",
      timestamps: false,
      underscored: true,
    }

  );

  return CourseLos;

};