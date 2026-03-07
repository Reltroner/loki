// config/conn.js

const { Sequelize } = require("sequelize");
const path = require("path");

/*
|--------------------------------------------------------------------------
| Database Configuration
|--------------------------------------------------------------------------
|
| Single deterministic database source.
| Default: SQLite (local development)
|
*/

const DB_STORAGE =
  process.env.DB_STORAGE ||
  path.join(__dirname, "..", "database.sqlite");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: DB_STORAGE,
  logging: (msg) => {

    if (msg.includes("SELECT")) {
      console.log("\nSQL:", msg);
    }

  }
});

/*
|--------------------------------------------------------------------------
| Database Health Check
|--------------------------------------------------------------------------
*/

async function connectDB() {
  try {

    await sequelize.authenticate();

    console.log("✅ SQLite connected");

  } catch (error) {

    console.error("❌ Database connection failed:", error);

    process.exit(1);

  }
}

/*
|--------------------------------------------------------------------------
| Export
|--------------------------------------------------------------------------
*/

module.exports = sequelize;
module.exports.connectDB = connectDB;