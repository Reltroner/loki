// models/course_plan_detail_refs.js

module.exports = (sequelize, DataTypes) => {

  const CoursePlanDetailRefs = sequelize.define(

    "CoursePlanDetailRefs",

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

      course_plan_reference_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      category: {
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
      tableName: "course_plan_detail_refs",
      timestamps: false,
    }

  );

  return CoursePlanDetailRefs;

};