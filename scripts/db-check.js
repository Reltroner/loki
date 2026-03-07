// scripts/db-check.js

const fs = require("fs");
const models = require("../models");

async function run() {

  console.log("\nDATABASE CHECK\n");

  if (!fs.existsSync("./database.sqlite")) {
    console.log("❌ database.sqlite not found");
  } else {
    console.log("✔ database.sqlite found");
  }

  try {

    await models.sequelize.authenticate();
    console.log("✔ database connection OK");

  } catch (err) {

    console.log("❌ database connection failed");

  }

  const tables = Object.keys(models)
    .filter(m => !["sequelize","Sequelize"].includes(m));

  console.log("\nModels registered:");

  tables.forEach(t => console.log("•", t));

}

run();