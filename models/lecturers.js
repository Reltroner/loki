// models/lecturers.js

module.exports = (sequelize, DataTypes) => {

  const Lecturers = sequelize.define(

    "Lecturers",

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

      reg_id: {
        type: DataTypes.STRING,
        allowNull: false
      },

      phone: {
        type: DataTypes.STRING,
        allowNull: false
      },

      status: {
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
      tableName: "lecturers",
      timestamps: false
    }

  );

  return Lecturers;

};