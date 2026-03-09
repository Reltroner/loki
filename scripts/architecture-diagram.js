// scripts/architecture-diagram.js

const fs = require("fs")
const path = require("path")
const { execSync } = require("child_process")

const ROOT = process.cwd()
const OUTPUT_DIR = path.join(ROOT, "docs", "architecture")

const DOT_FILE = path.join(OUTPUT_DIR, "backend-architecture.dot")
const PNG_FILE = path.join(OUTPUT_DIR, "backend-architecture.png")

function ensureDir() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }
}

function generateDot() {

  const dot = `
digraph BackendArchitecture {

rankdir=LR

node [shape=box style=filled fillcolor="#EFEFFF"]

Routes        [label="Routes"]
Controllers   [label="Controllers"]
Services      [label="Services"]
Repositories  [label="Repositories"]
Models        [label="Models"]
Database      [label="Database"]

Routes -> Controllers
Controllers -> Services
Services -> Repositories
Repositories -> Models
Models -> Database

}
`

  fs.writeFileSync(DOT_FILE, dot)

}

function renderDiagram() {

  try {

    execSync(
      `"C:\\Program Files\\Graphviz\\bin\\dot.exe" -Tpng "${DOT_FILE}" -o "${PNG_FILE}"`
    )

    console.log("\n✔ Architecture diagram generated")
    console.log(PNG_FILE)

  } catch (err) {

    console.log("\n⚠ Graphviz execution failed")
    console.log("Check Graphviz installation")

  }

}

function run() {

  console.log("\nARCHITECTURE DIAGRAM GENERATOR\n")

  ensureDir()
  generateDot()
  renderDiagram()

}

run()