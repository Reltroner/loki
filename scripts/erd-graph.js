// scripts/erd-graph.js

const fs = require("fs");
const models = require("../models");

let dot = `
digraph ERD {
rankdir=LR;
node [shape=box, style=filled, fillcolor=lightgray];
`;

const relations = new Set();

Object.values(models).forEach(model => {

  if (!model.associations) return;

  Object.values(model.associations).forEach(assoc => {

    const source = assoc.source.name;
    const target = assoc.target.name;

    const key = `${source}->${target}`;

    if (!relations.has(key)) {

      dot += `"${source}" -> "${target}";\n`;
      relations.add(key);

    }

  });

});

dot += "}";

fs.writeFileSync("database-erd.dot", dot);

console.log("✔ ERD DOT generated: database-erd.dot");
console.log("Run: dot -Tpng database-erd.dot -o database-erd.png");

const { execSync } = require("child_process");

try {

  execSync("dot -Tpng database-erd.dot -o database-erd.png");

  console.log("✔ ERD PNG generated");

} catch (err) {

  console.log("Graphviz CLI not found in PATH");

}