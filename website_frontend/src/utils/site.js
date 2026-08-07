/**
 * Canonical site identity.
 *
 * Every canonical tag, OG url, sitemap entry and JSON-LD entity URL must use
 * this exact host. Mixing `usync.gg` and `www.usync.gg` splits the brand
 * signal search engines and AI answer engines use to resolve "which entity is
 * this" — see SEO-GEO-PLAN.md §P0-4. Import it; never hardcode the host.
 */
export const SITE_URL = "https://www.usync.gg";
export const SITE_NAME = "uSync";

/** Absolute URL for a site-relative path. */
export const absoluteUrl = (path = "") => `${SITE_URL}${path}`;
