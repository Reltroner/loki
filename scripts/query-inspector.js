// scripts/query-inspector.js

const models = require("../models");

async function run() {

  console.log("\nQUERY ANALYZER\n");

  await models.sequelize.authenticate();
  await models.sequelize.sync();

  let queryCount = 0;

  models.sequelize.options.logging = () => {
    queryCount++;
  };

  await models.CoursePlans.findAll({
    include: [
      models.CoursePlanDetails,
      models.CoursePlanAssessments,
      models.CoursePlanReferences
    ],
    limit: 10
  });

  console.log("\nQueries executed:", queryCount);

  if (queryCount > 5) {
    console.log("⚠ Potential N+1 query");
  } else {
    console.log("✔ Query structure looks efficient");
  }

}

run();