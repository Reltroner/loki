// scripts/module-deps.js

const fs = require("fs")
const path = require("path")
const { execSync } = require("child_process")

const ROOT = process.cwd()
const MODULES_DIR = path.join(ROOT, "modules")

const OUTPUT_DIR = path.join(ROOT, "docs", "architecture")
const DOT_FILE = path.join(OUTPUT_DIR, "module-dependency.dot")
const PNG_FILE = path.join(OUTPUT_DIR, "module-dependency.png")

function ensureDir() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }
}

function scanModules() {

  const modules = fs.readdirSync(MODULES_DIR)

  const edges = []

  modules.forEach(module => {

    const modulePath = path.join(MODULES_DIR, module)

    if (!fs.statSync(modulePath).isDirectory()) return

    const files = fs.readdirSync(modulePath)

    files.forEach(file => {

      const filePath = path.join(modulePath, file)

      const content = fs.readFileSync(filePath, "utf8")

      const matches = content.match(/require\(["'](.*?)["']\)/g)

      if (!matches) return

      matches.forEach(dep => {

        const cleaned = dep.match(/["'](.*?)["']/)[1]

        if (cleaned.includes("models")) {
          edges.push(`${module} -> Models`)
        }

      })

    })

  })

  return edges
}

function generateDot(edges) {

  const lines = edges.map(e => `  ${e};`).join("\n")

  const dot = `
digraph ModuleDependencies {

rankdir=LR
node [shape=box style=filled fillcolor="#E8F0FF"]

${lines}

}
`

  fs.writeFileSync(DOT_FILE, dot)
}

function render() {

  try {

    execSync(
      `"C:\\Program Files\\Graphviz\\bin\\dot.exe" -Tpng "${DOT_FILE}" -o "${PNG_FILE}"`
    )

    console.log("\n✔ Module dependency diagram generated")
    console.log(PNG_FILE)

  } catch (err) {

    console.log("⚠ Graphviz render failed")

  }

}

function run() {

  console.log("\nMODULE DEPENDENCY SCANNER\n")

  ensureDir()

  const edges = scanModules()

  generateDot(edges)

  render()

}

run()