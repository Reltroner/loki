// server.js

require("dotenv").config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
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

const { authenticate } = require("./modules/auth/middleware/authenticate");
const userContext = require("./middleware/userContext");
const requestLogger = require("./middleware/requestLogger");

const PORT = process.env.PORT || 8000;

/*
|--------------------------------------------------------------------------
| Helpers (PHASE 9)
|--------------------------------------------------------------------------
*/

function isApiRequest(req) {
  return (
    req.headers["content-type"]?.includes("application/json") ||
    req.headers["accept"]?.includes("application/json")
  );
}

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

  // 🔥 STATIC MUST BE ROOTED (NO /public prefix in URL)
  app.use(express.static(path.join(__dirname, "public")));

  app.use(expressLayouts);

  // 🔥 observability
  app.use(requestLogger);

  /*
  |----------------------------------------------------------------------
  | View Engine
  |----------------------------------------------------------------------
  */

  app.set("layout", "layout");
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
  | Module Loader
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

  app.get("/", (req, res) => {
    const hasToken = !!req.cookies?.jwt;

    if (!hasToken) {
      return res.render("landing");
    }

    return res.redirect("/dashboard");
  });

  app.get("/dashboard", authenticate, (req, res) => {
    const role = req.user.role;

    if (role === "admin") {
      return res.redirect("/admin/dashboard");
    }

    if (role === "dosen") {
      return res.redirect(`/dosen/${req.user.id}/courses`);
    }

    if (role === "mahasiswa") {
      return res.redirect("/mahasiswa/home");
    }

    return res.render("home");
  });

  app.get("/about", (req, res) => {
    res.render("about");
  });

  /*
  |----------------------------------------------------------------------
  | Health Check (PHASE 9 IMPORTANT)
  |----------------------------------------------------------------------
  */

  app.get("/health", (req, res) => {
    res.json({
      status: "ok",
      uptime: process.uptime(),
      env: process.env.NODE_ENV,
      timestamp: Date.now()
    });
  });

  /*
  |----------------------------------------------------------------------
  | 404 Handler
  |----------------------------------------------------------------------
  */

  app.use((req, res) => {

    if (isApiRequest(req)) {
      return res.status(404).json({
        error: "Not Found",
        code: "NOT_FOUND",
        path: req.path
      });
    }

    return res.status(404).render("err404");
  });

  /*
  |----------------------------------------------------------------------
  | Global Error Handler (PHASE 9 HARDENED)
  |----------------------------------------------------------------------
  */

  app.use((err, req, res, next) => {

    console.error("GLOBAL ERROR:", {
      message: err.message,
      code: err.code,
      path: req.path,
      timestamp: Date.now()
    });

    const status = err.status || 500;

    const message =
      status === 500
        ? "Internal server error"
        : err.message || "Error";

    const errorPayload = {
      error: message,
      code: err.code || "INTERNAL_ERROR",
      path: req.path
    };

    if (isApiRequest(req)) {
      return res.status(status).json(errorPayload);
    }

    return res.status(status).render("err500", {
      error: message
    });

  });

  return app;
}

/*
|--------------------------------------------------------------------------
| Create SINGLE App Instance
|--------------------------------------------------------------------------
*/

const app = createApp();

/*
|--------------------------------------------------------------------------
| Route Printer
|--------------------------------------------------------------------------
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
|--------------------------------------------------------------------------
| Database Bootstrap
|--------------------------------------------------------------------------
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
|--------------------------------------------------------------------------
| Start Server
|--------------------------------------------------------------------------
*/

async function startServer() {

  try {

    // 🔥 ENV VALIDATION (PHASE 9.5 CRITICAL)
    if (!process.env.TOKEN_SECRET) {
      console.error("❌ TOKEN_SECRET missing in .env");
      process.exit(1);
    }

    await bootstrapDatabase();

    console.log("\n=== EXPRESS ROUTE LIST ===");

    if (app._router) {
      printRoutes(app._router.stack);
    }

    console.log("==========================\n");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`ENV: ${process.env.NODE_ENV}`);
    });

  }

  catch (error) {

    console.error("❌ Failed to start server:", error);
    process.exit(1);

  }

}

/*
|--------------------------------------------------------------------------
| Start only when executed directly
|--------------------------------------------------------------------------
*/

if (require.main === module) {
  startServer();
}

module.exports = app;