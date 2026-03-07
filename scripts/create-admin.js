const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");

const db = new sqlite3.Database("./database.sqlite");

(async () => {
  const hash = await bcrypt.hash("12345", 10);

  db.run(
    `INSERT INTO users (name,email,password,type)
     VALUES (?,?,?,?)`,
    ["admin", "admin@unand.ac.id", hash, "T"],
    (err) => {
      if (err) console.error(err);
      else console.log("Admin user created");

      db.close();
    }
  );
})();