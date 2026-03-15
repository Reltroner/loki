// scripts/reset-db.js

const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "..", "database.sqlite");

if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
  console.log("Database removed.");
}

console.log("Run init-db and seed-data next.");