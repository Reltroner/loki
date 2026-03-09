// scripts/route-audit.js

const fs = require("fs")
const path = require("path")

const MODULES_DIR = path.join(process.cwd(), "modules")

function scanRoutes() {

  const modules = fs.readdirSync(MODULES_DIR)

  const routes = []

  modules.forEach(module => {

    const routeFile = path.join(
      MODULES_DIR,
      module,
      `${module}Routes.js`
    )

    if (!fs.existsSync(routeFile)) return

    const content = fs.readFileSync(routeFile, "utf8")

    const matches = content.match(/router\.(get|post|put|delete)\(["'`](.*?)["'`]/g)

    if (!matches) return

    matches.forEach(m => {

      const method = m.match(/router\.(.*?)\(/)[1]
      const route = m.match(/["'`](.*?)["'`]/)[1]

      routes.push({
        method: method.toUpperCase(),
        path: `/${module}${route}`
      })

    })

  })

  return routes
}

function detectDuplicates(routes) {

  const map = {}
  const duplicates = []

  routes.forEach(r => {

    const key = `${r.method} ${r.path}`

    if (map[key]) {
      duplicates.push(key)
    } else {
      map[key] = true
    }

  })

  return duplicates
}

function run() {

  console.log("\nROUTE AUDIT\n")

  const routes = scanRoutes()

  const duplicates = detectDuplicates(routes)

  if (duplicates.length === 0) {

    console.log("✔ No duplicate routes detected")

  } else {

    console.log("⚠ Duplicate routes detected:\n")

    duplicates.forEach(d => console.log(d))

  }

  console.log(`\nTotal routes scanned: ${routes.length}\n`)
}

run()