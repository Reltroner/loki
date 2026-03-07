const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.sqlite");

console.log("Initializing SQLite database...");

let sql = fs.readFileSync("./loki.sql").toString();

/*
MYSQL → SQLITE SANITIZER
removes statements unsupported by sqlite
*/

sql = sql
  .replace(/SET\s.+?;/g, "")
  .replace(/START TRANSACTION;/g, "")
  .replace(/COMMIT;/g, "")
  .replace(/\/\*![\s\S]*?\*\//g, "")
  .replace(/ENGINE=InnoDB/g, "")
  .replace(/DEFAULT CHARSET=utf8mb4/g, "")
  .replace(/COLLATE=utf8mb4_unicode_ci/g, "")
  .replace(/UNSIGNED/g, "")
  .replace(/AUTO_INCREMENT=\d+/g, "")
  .replace(/`/g, "");

db.exec(sql, (err) => {
  if (err) {
    console.error("Database init failed:", err.message);
  } else {
    console.log("Database initialized successfully.");
  }
  db.close();
});