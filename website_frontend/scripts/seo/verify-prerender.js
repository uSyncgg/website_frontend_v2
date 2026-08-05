/**
 * Post-build guard. Fails the build when prerendering silently degrades.
 *
 * Catches the failure mode this script was written for: a route with no inbound
 * link is skipped by react-snap, no HTML is emitted, and the Netlify SPA
 * fallback serves the prerendered homepage under that URL instead — so the page
 * looks fine to a human but is duplicate homepage content to every crawler.
 */
const fs = require("fs");
const path = require("path");
const { prerenderRoutes } = require("./prerender-routes");

const ROOT = path.join(__dirname, "..", "..");
const BUILD = path.join(ROOT, "build");

const titleOf = (html) => {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return m ? m[1].trim() : "";
};
const fileFor = (route) =>
  route === "/" ? path.join(BUILD, "index.html") : path.join(BUILD, route.slice(1), "index.html");

const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
const include = (pkg.reactSnap && pkg.reactSnap.include) || [];
const expected = prerenderRoutes();

const errors = [];

// 1. package.json must match the sitemap.
const drift = [
  ...expected.filter((r) => !include.includes(r)).map((r) => `missing from include: ${r}`),
  ...include.filter((r) => !expected.includes(r)).map((r) => `stale in include:     ${r}`),
];
if (drift.length) {
  errors.push(
    `reactSnap.include is out of sync with sitemap.xml (${drift.length} differences).\n` +
      drift.map((d) => `    ${d}`).join("\n") +
      `\n  Fix with: npm run seo:sync-routes`
  );
}

// 2. Every route must have emitted its own HTML.
const missing = expected.filter((r) => !fs.existsSync(fileFor(r)));
if (missing.length) {
  errors.push(
    `${missing.length} route(s) produced no prerendered HTML:\n` +
      missing.map((r) => `    ${r}`).join("\n")
  );
}

// 3. No route may be serving the homepage's content.
const homeFile = fileFor("/");
if (fs.existsSync(homeFile)) {
  const homeTitle = titleOf(fs.readFileSync(homeFile, "utf8"));
  const dupes = expected
    .filter((r) => r !== "/" && r !== "/home" && fs.existsSync(fileFor(r)))
    .filter((r) => titleOf(fs.readFileSync(fileFor(r), "utf8")) === homeTitle);
  if (dupes.length) {
    errors.push(
      `${dupes.length} route(s) prerendered with the homepage title ("${homeTitle}"):\n` +
        dupes.map((r) => `    ${r}`).join("\n")
    );
  }
}

if (errors.length) {
  console.error("\n✗ Prerender verification failed:\n");
  errors.forEach((e) => console.error(`  ${e}\n`));
  process.exit(1);
}
console.log(`✓ Prerender verified: ${expected.length} routes, all unique.`);
