// models/index.js

const fs = require("fs");
const path = require("path");
const { DataTypes } = require("sequelize");

const sequelize = require("../config/database");

const models = {};

const modelsDir = __dirname;

/*
|--------------------------------------------------------------------------
| Load Models (Factory Pattern)
|--------------------------------------------------------------------------
*/

fs.readdirSync(modelsDir)
  .filter((file) => {

    return (
      file !== "index.js" &&
      file !== "dbassociations.js" &&
      file.endsWith(".js")
    );

  })
  .forEach((file) => {

    const modelFactory = require(path.join(modelsDir, file));

    if (typeof modelFactory !== "function") {
      throw new Error(`Model ${file} does not export a factory function`);
    }

    const model = modelFactory(sequelize, DataTypes);

    models[model.name] = model;

  });


/*
|--------------------------------------------------------------------------
| Apply Associations
|--------------------------------------------------------------------------
*/

require("./dbassociations")(models);


/*
|--------------------------------------------------------------------------
| Attach Sequelize
|--------------------------------------------------------------------------
*/

models.sequelize = sequelize;
models.Sequelize = sequelize.Sequelize;


/*
|--------------------------------------------------------------------------
| Freeze Registry (Prevent Runtime Mutation)
|--------------------------------------------------------------------------
*/

Object.freeze(models);


/*
|--------------------------------------------------------------------------
| Export
|--------------------------------------------------------------------------
*/

module.exports = models;