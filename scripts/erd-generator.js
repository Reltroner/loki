// scripts/erd-generator.js

const models = require("../models");

function generateERD() {

  console.log("\nDATABASE ERD\n");

  const modelNames = Object.keys(models)
    .filter(m => !["sequelize", "Sequelize"].includes(m));

  modelNames.forEach(modelName => {

    const model = models[modelName];

    const relations = Object.values(model.associations);

    relations.forEach(rel => {

      const target = rel.target.name;

      let arrow = "───>";

      if (rel.associationType === "HasMany")
        arrow = "────<";

      if (rel.associationType === "BelongsToMany")
        arrow = ">────<";

      console.log(`${modelName} ${arrow} ${target}`);

    });

  });

}

generateERD();