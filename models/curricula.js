// models/curricula.js

module.exports = (sequelize, DataTypes) => {

  const Curricula = sequelize.define(

    "Curricula",

    {

      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false
      },

      active: {
        type: DataTypes.STRING,
        allowNull: false
      },

      year_start: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      year_end: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      description: {
        type: DataTypes.TEXT,
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
      tableName: "curricula",
      timestamps: false
    }

  );

  return Curricula;

};