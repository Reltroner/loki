// scripts/architecture-audit.js

const models = require("../models");

console.log("\nARCHITECTURE AUDIT\n");

Object.keys(models)
  .filter(m => !["sequelize","Sequelize"].includes(m))
  .forEach(name => {

    const model = models[name];

    const associations = Object.keys(model.associations);

    if (associations.length === 0) {

      console.log(`⚠ ${name} has no relations`);

    }

  });