// models/curriculum_los.js

module.exports = (sequelize, DataTypes) => {

  const CurriculumLos = sequelize.define(

    "CurriculumLos",

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
        type: DataTypes.TEXT,
        allowNull: false
      },

      name: {
        type: DataTypes.TEXT,
        allowNull: false
      },

      type: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      description: {
        type: DataTypes.TEXT
      },

      created_at: {
        type: DataTypes.DATE
      },

      update_at: {
        type: DataTypes.DATE
      }

    },

    {
      tableName: "curriculum_los",
      timestamps: false,
      underscored: true
    }

  );

  return CurriculumLos;

};