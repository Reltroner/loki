const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.sqlite");

console.log("\n=== DATABASE TABLES ===");

db.all(
  "SELECT name FROM sqlite_master WHERE type='table'",
  [],
  (err, rows) => {
    if (err) {
      console.error(err);
      return;
    }

    rows.forEach((row) => {
      console.log(row.name);
    });

    console.log("=======================\n");

    db.close();
  }
);