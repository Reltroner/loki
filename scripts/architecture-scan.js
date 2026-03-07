// scripts/architecture-scan.js

const fs = require("fs");
const path = require("path");

console.log("\nARCHITECTURE SCANNER\n");

function getFiles(dir) {
  return fs.readdirSync(dir).filter(f => f.endsWith(".js"));
}

const routes = getFiles("./routes");
const controllers = getFiles("./controllers");
const models = getFiles("./models");

console.log("\nRoutes detected:", routes.length);
console.log("Controllers detected:", controllers.length);
console.log("Models detected:", models.length);

routes.forEach(route => {

  const content = fs.readFileSync(`./routes/${route}`, "utf8");

  const match = content.match(/require\(["']..\/controllers\/(.*?)["']\)/);

  if (!match) {
    console.log(`⚠ Route without controller → ${route}`);
  }

});

controllers.forEach(ctrl => {

  let used = false;

  routes.forEach(route => {

    const content = fs.readFileSync(`./routes/${route}`, "utf8");

    if (content.includes(ctrl.replace(".js",""))) {
      used = true;
    }

  });

  if (!used) {
    console.log(`⚠ Unused controller → ${ctrl}`);
  }

});

console.log("\nScan complete\n");