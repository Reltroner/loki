// scripts/dependency-check.js

const { execSync } = require("child_process");

console.log("\nDependency Tree\n");

execSync("npm ls", { stdio: "inherit" });

console.log("\nVulnerability Check\n");

try {

  execSync("npm audit", { stdio: "inherit" });

} catch (err) {

  console.log("\nAudit completed with vulnerabilities.\n");

}