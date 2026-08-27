/**
 * Single source of truth for which routes get prerendered by react-snap.
 *
 * Derived from public/sitemap.xml, because "what we want indexed" and "what we
 * prerender" should never be able to drift apart. react-snap only discovers
 * routes by following <a> tags from "/", so any page without an inbound link
 * (archived LANs, map-only events) is silently skipped and Netlify then serves
 * the prerendered homepage in its place. An explicit include list prevents that.
 */
const fs = require("fs");
const path = require("path");

const SITEMAP = path.join(__dirname, "..", "..", "public", "sitemap.xml");
const ORIGIN = "https://www.usync.gg";

/** Routes deliberately kept out of the prerender + index set. */
const EXCLUDED = {
  // Transactional Stripe flow — no search value, must not be indexed.
  "/paymentform": "payment flow",
  "/paymentform/review": "payment flow",
  "/paymentform/test/receipt": "payment flow",
  "/checkout": "payment flow",
  "/payment": "payment flow",
};

/** Reads every <loc> out of the sitemap as a site-relative path. */
function sitemapRoutes() {
  const xml = fs.readFileSync(SITEMAP, "utf8");
  const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);

  const seen = new Set();
  const routes = [];
  for (const loc of locs) {
    if (!loc.startsWith(ORIGIN)) continue;
    let route = loc.slice(ORIGIN.length) || "/";
    if (route.length > 1 && route.endsWith("/")) route = route.slice(0, -1);
    if (seen.has(route)) continue;
    seen.add(route);
    routes.push(route);
  }
  return routes;
}

/** The list react-snap should prerender. */
function prerenderRoutes() {
  return sitemapRoutes().filter((r) => !(r in EXCLUDED));
}

module.exports = { prerenderRoutes, sitemapRoutes, EXCLUDED, ORIGIN };
