// scripts/routes-list.js

const app = require("../server");

/*
|--------------------------------------------------------------------------
| Resolve Router (Express v4 / v5 compatibility)
|--------------------------------------------------------------------------
*/

const router = app._router || app.router;

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

      console.log(
        methods.padEnd(10),
        prefix + layer.route.path
      );

    }

    else if (layer.name === "router" && layer.handle.stack) {

      printRoutes(layer.handle.stack, prefix);

    }

  });

}

console.log("\nEXPRESS ROUTES\n");

if (!router || !router.stack) {

  console.log("Router not initialized");
  process.exit();

}

printRoutes(router.stack);