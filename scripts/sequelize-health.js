// scripts/sequelize-health.js

const models = require("../models");

async function runHealthCheck() {

  console.log("\n==============================");
  console.log(" SEQUELIZE HEALTH CHECK");
  console.log("==============================\n");

  try {

    await models.sequelize.authenticate();

    console.log("✔ Database connection OK\n");

  } catch (error) {

    console.error("✖ Database connection FAILED");
    console.error(error);
    process.exit(1);

  }


  console.log("Loaded Models:\n");

  Object.keys(models)
    .filter(name => !["sequelize", "Sequelize"].includes(name))
    .forEach(name => {

      console.log("•", name);

    });


  console.log("\nAssociations:\n");

  Object.keys(models)
    .filter(name => !["sequelize", "Sequelize"].includes(name))
    .forEach(name => {

      const model = models[name];

      const associations = Object.keys(model.associations);

      if (associations.length === 0) {

        console.log(`${name} → no relations`);

      } else {

        associations.forEach(rel => {

          const target = model.associations[rel].target.name;

          console.log(`${name} → ${target}`);

        });

      }

    });


  console.log("\n==============================");
  console.log(" HEALTH CHECK COMPLETE");
  console.log("==============================\n");

}

runHealthCheck();