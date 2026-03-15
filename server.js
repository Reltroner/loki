// server.js

require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const path = require("path");

const models = require("./models");

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

const mahasiswaRoutes = require("./routes/mahasiswa");
const dosenRoutes = require("./routes/dosen");
const adminRoutes = require("./routes/admin");

const loadModules = require("./scripts/module-loader");

/*
|--------------------------------------------------------------------------
| Middleware
|--------------------------------------------------------------------------
*/

const { authenticateToken } = require("./middleware/verifyToken");
const userContext = require("./middleware/userContext");

const PORT = process.env.PORT || 8000;

/*
|--------------------------------------------------------------------------
| App Factory
|--------------------------------------------------------------------------
*/

function createApp() {

  const app = express();

  /*
  |----------------------------------------------------------------------
  | Core Middleware
  |----------------------------------------------------------------------
  */

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(methodOverride("_method"));

  app.use(express.static(path.join(__dirname, "public")));
  app.use(require("./middleware/requestLogger"));

  /*
  |----------------------------------------------------------------------
  | View Engine
  |----------------------------------------------------------------------
  */

  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views"));

  /*
  |----------------------------------------------------------------------
  | Global Middleware
  |----------------------------------------------------------------------
  */

  app.use(userContext);

  /*
  |----------------------------------------------------------------------
  | Module Loader (auth module dll)
  |----------------------------------------------------------------------
  */

  loadModules(app);

  /*
  |----------------------------------------------------------------------
  | Application Routes
  |----------------------------------------------------------------------
  */

  app.use("/mahasiswa", mahasiswaRoutes);
  app.use("/dosen", dosenRoutes);
  app.use("/admin", adminRoutes);

  /*
  |----------------------------------------------------------------------
  | Core Pages
  |----------------------------------------------------------------------
  */

  app.get("/", authenticateToken, (req, res) => {
    res.render("home");
  });

  app.get("/about", (req, res) => {
    res.render("about");
  });

  /*
  |----------------------------------------------------------------------
  | Health Check
  |----------------------------------------------------------------------
  */

  app.get("/health", (req, res) => {
    res.json({
      status: "ok",
      uptime: process.uptime(),
      timestamp: Date.now()
    });
  });

  /*
  |----------------------------------------------------------------------
  | 404 Handler
  |----------------------------------------------------------------------
  */

  app.use((req, res) => {
    res.status(404).render("err404");
  });

  /*
  |----------------------------------------------------------------------
  | Global Error Handler
  |----------------------------------------------------------------------
  */

  app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).render("err500", {
      error: err.message
    });
  });

  return app;
}

/*
|----------------------------------------------------------------------
| Create SINGLE App Instance
|----------------------------------------------------------------------
*/

const app = createApp();

/*
|----------------------------------------------------------------------
| Route Printer (CLI Tooling)
|----------------------------------------------------------------------
*/

function printRoutes(stack, prefix = "") {

  stack.forEach(layer => {

    if (layer.route) {

      const methods = Object.keys(layer.route.methods)
        .map(m => m.toUpperCase())
        .join(",");

      console.log(`${methods.padEnd(10)} ${prefix}${layer.route.path}`);

    }

    else if (layer.name === "router" && layer.handle.stack) {

      const newPrefix =
        layer.regexp
          ?.toString()
          .replace("/^\\", "")
          .replace("\\/?(?=\\/|$)/i", "")
          .replace(/\\\//g, "/") || "";

      printRoutes(layer.handle.stack, prefix + newPrefix);

    }

  });

}

/*
|----------------------------------------------------------------------
| Database Bootstrap
|----------------------------------------------------------------------
*/

async function bootstrapDatabase() {

  try {

    await models.sequelize.authenticate();
    console.log("✔ Database connected");

    await models.sequelize.sync();
    console.log("✔ Models synced");

  }

  catch (err) {

    console.error("❌ Database bootstrap failed:", err);
    process.exit(1);

  }

}

/*
|----------------------------------------------------------------------
| Start Server
|----------------------------------------------------------------------
*/

async function startServer() {

  try {

    await bootstrapDatabase();

    console.log("\n=== EXPRESS ROUTE LIST ===");

    if (app._router) {
      printRoutes(app._router.stack);
    }

    console.log("==========================\n");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

  }

  catch (error) {

    console.error("❌ Failed to start server:", error);
    process.exit(1);

  }

}

/*
|----------------------------------------------------------------------
| Start only when executed directly
|----------------------------------------------------------------------
*/

if (require.main === module) {
  startServer();
}

/*
|----------------------------------------------------------------------
| Export app for CLI tools
|----------------------------------------------------------------------
*/

module.exports = app;