/**
 * Post-build guard. Fails the build when prerendering silently degrades.
 *
 * Catches the failure mode this script was written for: a route with no inbound
 * link is skipped by react-snap, no HTML is emitted, and the Netlify SPA
 * fallback serves the prerendered homepage under that URL instead — so the page
 * looks fine to a human but is duplicate homepage content to every crawler.
 *
 * It also holds the two sitewide invariants fixed in SEO plan phase 2: exactly
 * one <h1> per page, and a single canonical host in every URL we emit.
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
const h1CountOf = (html) => (html.match(/<h1[\s>]/gi) || []).length;
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

// 4. Every route must have exactly one <h1>.
const emitted = expected.filter((r) => fs.existsSync(fileFor(r)));
const badHeadings = emitted
  .map((r) => ({ route: r, n: h1CountOf(fs.readFileSync(fileFor(r), "utf8")) }))
  .filter(({ n }) => n !== 1);
if (badHeadings.length) {
  errors.push(
    `${badHeadings.length} route(s) do not have exactly one <h1>:\n` +
      badHeadings.map(({ route, n }) => `    ${route}  (${n})`).join("\n") +
      `\n  A page's <h1> is its HeaderImage hero — pass it a title. Card and\n` +
      `  section headings belong at <h2> or below.`
  );
}

// 5. The canonical host must be used everywhere, including inside JSON-LD.
const wrongHost = emitted.filter((r) =>
  /https:\/\/usync\.gg/.test(fs.readFileSync(fileFor(r), "utf8"))
);
if (wrongHost.length) {
  errors.push(
    `${wrongHost.length} route(s) reference https://usync.gg instead of the\n` +
      `  canonical https://www.usync.gg (splits the brand entity signal):\n` +
      wrongHost.map((r) => `    ${r}`).join("\n") +
      `\n  Import SITE_URL from src/utils/site.js rather than hardcoding the host.`
  );
}

if (errors.length) {
  console.error("\n✗ Prerender verification failed:\n");
  errors.forEach((e) => console.error(`  ${e}\n`));
  process.exit(1);
}
console.log(
  `✓ Prerender verified: ${expected.length} routes — all unique, one <h1> each, canonical host.`
);
