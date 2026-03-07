const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.sqlite");

const sql = `
ALTER TABLE users ADD COLUMN created_at TEXT;
ALTER TABLE users ADD COLUMN updated_at TEXT;
`;

db.exec(sql, (err) => {
  if (err) {
    console.error("Error adding columns:", err.message);
  } else {
    console.log("Columns added successfully.");
  }

  db.close();
});