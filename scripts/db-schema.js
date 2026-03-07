// scripts/db-schema.js

const models = require("../models");

async function inspect() {

  const tables = Object.keys(models)
    .filter(m => !["sequelize","Sequelize"].includes(m));

  console.log("\nDATABASE SCHEMA\n");

  for (const table of tables) {

    const attributes = models[table].rawAttributes;

    console.log("TABLE:", table);

    Object.keys(attributes).forEach(col => {

      const type = attributes[col].type.key;

      console.log("  -", col, ":", type);

    });

    console.log("");

  }

}

inspect();