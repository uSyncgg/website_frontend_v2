import { SITE_NAME, SITE_URL } from "utils/site";

/**
 * Sitewide entity graph.
 *
 * The problem this solves (SEO-GEO-PLAN.md §3): searching "uSync" returns the
 * Jumoo/Umbraco database-sync package — a decade-old developer tool we cannot
 * out-rank and whose searchers are not our audience. The realistic win is not
 * the head term but *disambiguation*: teaching search and AI answer engines
 * that "uSync (esports platform)" is a distinct entity from "uSync (Umbraco
 * package)". A well-formed Organization node with sameAs profile links is the
 * single strongest signal available for that, and it is free.
 *
 * These nodes are emitted once, from the homepage. Other pages reference the
 * Organization by @id so engines can merge the nodes into one entity.
 */

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * Only profiles uSync actually controls, each verified against a link the site
 * itself renders (footer / contact page). Do not add a network here on the
 * strength of a link found on a league host's page — those belong to partners,
 * not to us, and a wrong sameAs actively harms entity resolution.
 *
 * Known gaps: no YouTube, Discord, Wikidata or Crunchbase profile is linked
 * anywhere in the app. Add them here once they exist — Wikidata in particular
 * is the strongest disambiguation signal going, per §3.5.
 */
export const SAME_AS = [
    "https://twitter.com/uSyncGG",
    "https://www.linkedin.com/company/usync-llc/",
    "https://www.instagram.com/usyncgg/",
];

const DESCRIPTION =
    "uSync is an esports event hub that aggregates LANs, leagues, tournaments, " +
    "wagers and head-to-head platforms for Call of Duty, Counter-Strike 2, Halo, " +
    "League of Legends, Rocket League, Valorant and Warzone into one place.";

export const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    // Carries the qualified form engines can attach to "uSync esports" queries
    // without misrepresenting the organisation's actual name.
    alternateName: ["uSync Esports", "uSync GG"],
    legalName: "uSync LLC",
    url: SITE_URL,
    description: DESCRIPTION,
    logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo512.png`,
        width: 512,
        height: 512,
    },
    sameAs: SAME_AS,
    contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "contact@usync.gg",
        url: `${SITE_URL}/more/contactus`,
    },
};

/**
 * No `potentialAction`/SearchAction: the site has no search endpoint. The only
 * search-like UI is the client-side filter on the CoD tournaments page, which
 * has no URL parameter to hand a query to. Declaring a SearchAction that
 * resolves to nothing is worse than declaring none — add it when a real
 * /search?q= route exists.
 */
export const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    alternateName: "uSync Esports",
    description: DESCRIPTION,
    inLanguage: "en-US",
    publisher: { "@id": ORGANIZATION_ID },
};
