const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.sqlite");

const sql = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT UNIQUE,
  password TEXT,
  type TEXT,
  remember_token TEXT,
  email_verified_at TEXT
);
`;

db.exec(sql, (err) => {
  if (err) {
    console.error("Error creating users table:", err);
  } else {
    console.log("Users table created successfully.");
  }

  db.close();
});