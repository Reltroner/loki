// scripts/architecture-score.js

const fs = require("fs")
const path = require("path")

const ROOT = process.cwd()

function checkModules() {

  const modulesPath = path.join(ROOT, "modules")

  if (!fs.existsSync(modulesPath)) {
    return false
  }

  const modules = fs.readdirSync(modulesPath)

  return modules.length > 0
}

function checkScripts() {

  const scripts = [
    "architecture-scan.js",
    "architecture-diagram.js",
    "module-deps.js",
    "route-audit.js",
    "smoke-test.js"
  ]

  const scriptsDir = path.join(ROOT, "scripts")

  let count = 0

  scripts.forEach(s => {
    if (fs.existsSync(path.join(scriptsDir, s))) {
      count++
    }
  })

  return count === scripts.length
}

function checkDocs() {

  const docs = path.join(ROOT, "docs", "architecture")

  if (!fs.existsSync(docs)) return false

  const expected = [
    "database-erd.png",
    "backend-architecture.png",
    "module-dependency.png"
  ]

  let found = 0

  expected.forEach(f => {
    if (fs.existsSync(path.join(docs, f))) {
      found++
    }
  })

  return found >= 2
}

function score() {

  console.log("\nARCHITECTURE HEALTH SCORE\n")

  let total = 0
  let score = 0

  const checks = [
    { name: "Modules structure", fn: checkModules },
    { name: "CLI tooling", fn: checkScripts },
    { name: "Architecture docs", fn: checkDocs }
  ]

  checks.forEach(check => {

    total += 1

    if (check.fn()) {
      score += 1
      console.log(`✔ ${check.name}`)
    } else {
      console.log(`⚠ ${check.name}`)
    }

  })

  const percent = Math.round((score / total) * 100)

  console.log(`\nScore: ${percent} / 100\n`)
}

score()