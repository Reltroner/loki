// models/course_plans.js

module.exports = (sequelize, DataTypes) => {

  const CoursePlans = sequelize.define(

    "CoursePlans",

    {

      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      course_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      rev: {
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

      alias_name: {
        type: DataTypes.TEXT,
      },

      credit: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      semester: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      description: {
        type: DataTypes.TEXT,
      },

      material: {
        type: DataTypes.TEXT,
      },

      created_by: {
        type: DataTypes.BIGINT,
      },

      validated_by: {
        type: DataTypes.BIGINT,
      },

      validated_at: {
        type: DataTypes.BIGINT,
      },

      created_at: {
        type: DataTypes.DATE,
      },

      updated_at: {
        type: DataTypes.DATE,
      },

    },

    {
      tableName: "course_plans",
      timestamps: false,
    }

  );

  return CoursePlans;

};