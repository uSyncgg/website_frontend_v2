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

/**
 * Fallback share card, used by any page that doesn't supply its own image.
 * The dimensions are measured, not assumed — social and AI crawlers treat
 * og:image:width/height as a promise, and a wrong one costs the large-card
 * render. Only declare dimensions for images we have actually measured; see
 * SEO-GEO-PLAN.md §5 for the plan to move these off imgur and make them
 * per-page.
 */
export const DEFAULT_OG_IMAGE = "https://i.imgur.com/A0AhUZp.jpeg";
export const DEFAULT_OG_IMAGE_WIDTH = 1200;
export const DEFAULT_OG_IMAGE_HEIGHT = 630;
export const DEFAULT_OG_IMAGE_ALT =
    "uSync — the hub for esports LANs, leagues, and tournaments";
