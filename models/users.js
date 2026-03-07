// models/users.js

module.exports = (sequelize, DataTypes) => {

  const Users = sequelize.define(

    "Users",

    {

      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      name: {
        type: DataTypes.STRING
      },

      email: {
        type: DataTypes.STRING
      },

      password: {
        type: DataTypes.STRING
      },

      type: {
        type: DataTypes.STRING
      }

    },

    {
      tableName: "users",
      timestamps: false
    }

  );

  return Users;

};