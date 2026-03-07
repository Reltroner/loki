// scripts/index-analyzer.js

const models = require("../models");

console.log("\nINDEX ANALYZER\n");

Object.entries(models).forEach(([name, model]) => {

  if (!model.rawAttributes) return;

  const attributes = model.rawAttributes;

  Object.entries(attributes).forEach(([field, attr]) => {

    if (attr.references) {

      const hasIndex =
        attr.primaryKey ||
        attr.unique ||
        attr.index;

      if (!hasIndex) {

        console.log(`⚠ Missing index → ${name}.${field}`);

      }

    }

  });

});

console.log("\nIndex analysis completed\n");