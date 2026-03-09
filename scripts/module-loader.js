// scripts/module-loader.js

const fs = require("fs")
const path = require("path")

function loadModules(app) {

  const modulesDir = path.join(process.cwd(), "modules")

  if (!fs.existsSync(modulesDir)) {
    console.log("⚠ modules directory not found")
    return
  }

  const modules = fs.readdirSync(modulesDir)

  modules.forEach((moduleName) => {

    const modulePath = path.join(modulesDir, moduleName)

    if (!fs.statSync(modulePath).isDirectory()) return

    const routeFile = path.join(modulePath, `${moduleName}Routes.js`)

    if (fs.existsSync(routeFile)) {

      const route = require(routeFile)

      app.use(`/${moduleName}`, route)

      console.log(`✔ Module loaded: /${moduleName}`)

    }

  })

}

module.exports = loadModules