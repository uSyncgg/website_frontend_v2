/**
 * Writes the prerender route list into package.json -> reactSnap.include.
 *
 * Run after adding or archiving a page:  npm run seo:sync-routes
 * The build does not run this itself, so package.json is never mutated during
 * CI; instead verify-prerender.js fails the build if the two have drifted.
 */
const fs = require("fs");
const path = require("path");
const { prerenderRoutes } = require("./prerender-routes");

const PKG = path.join(__dirname, "..", "..", "package.json");

const pkg = JSON.parse(fs.readFileSync(PKG, "utf8"));
const routes = prerenderRoutes();
const before = (pkg.reactSnap && pkg.reactSnap.include) || [];

pkg.reactSnap = { ...pkg.reactSnap, include: routes };
fs.writeFileSync(PKG, JSON.stringify(pkg, null, 2) + "\n");

const added = routes.filter((r) => !before.includes(r));
const removed = before.filter((r) => !routes.includes(r));

console.log(`reactSnap.include: ${before.length} -> ${routes.length} routes`);
if (added.length) console.log(`  + ${added.length} added:\n     ${added.join("\n     ")}`);
if (removed.length) console.log(`  - ${removed.length} removed:\n     ${removed.join("\n     ")}`);
if (!added.length && !removed.length) console.log("  (no change)");
