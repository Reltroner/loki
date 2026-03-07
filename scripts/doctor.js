// scripts/doctor.js

require("dotenv").config();
const models = require("../models");

async function runDoctor() {

  console.log("\nSYSTEM DOCTOR\n");

  // ENV check
  if (!process.env.TOKEN_SECRET) {

    console.log("❌ TOKEN_SECRET missing");

  } else {

    console.log("✔ TOKEN_SECRET OK");

  }

  // DB check
  try {

    await models.sequelize.authenticate();
    console.log("✔ Database connection OK");

  } catch {

    console.log("❌ Database connection failed");

  }

  // Tables check
  const tables = Object.keys(models)
    .filter(m => !["sequelize","Sequelize"].includes(m));

  console.log("\nTables detected:");

  tables.forEach(t => console.log("•", t));

}

runDoctor();