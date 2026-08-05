# uSync SEO / GEO Plan

Working outline for `feature/seo-geo-foundation`. Branched off `origin/testing_environment` @ `d24a720`.

GEO = Generative Engine Optimization: being readable, quotable and citable by AI answer engines
(ChatGPT Search, Perplexity, Google AI Overviews, Claude) — not just ranking in the blue links.

**Audit date:** 2026-08-04, against live `https://www.usync.gg`.

---

## 0. Where we actually stand (measured, not assumed)

Everything below was measured by fetching the live site as a non-JS crawler sees it.

| Signal | Status |
|---|---|
| Prerendering (react-snap) | Partially working — see P0-1 |
| Pages using `SeoData` | 302 of 323 page files |
| Structured data (JSON-LD) | **11 article pages only. 0 on the other ~290 pages.** |
| `robots.txt` | Good — AI crawlers allowed, sitemap referenced |
| `sitemap.xml` | 304 URLs, but no `<lastmod>` on any entry |
| OG / share image | **One single imgur image for the entire site** |
| Canonical host | `https://www.usync.gg` |
| JSON-LD entity URLs | `https://usync.gg` — **mismatch with canonical** |

**What's already good and should not be redone:** the article template. The 2026 article
redesign (`7a3a3b6`) shipped a genuinely strong pattern — `Article` + `BreadcrumbList` +
`FAQPage` JSON-LD, a real `<h1>`, breadcrumbs, and ~8,300 characters of prerendered body text
on `/more/articles/esports-tournaments-near-me`. **That template is the model.** The work below
is largely about extending it to the other 290 pages.

---

## 1. P0 — Technical blockers (nothing else matters until these are fixed)

### P0-1. Most LAN detail pages serve the homepage to crawlers

This is the single most damaging issue on the site.

**Measured:** 4 of 5 sampled `/lans/*` pages return the **homepage's** `<title>`, its 2 `<h1>`s,
and its exact 2,168 characters of body text:

```
/lans/dreamcon2026        → "uSync | Esports LANs, Tournaments, & Leagues Hub"  (homepage)
/lans/forlan-spring-2026  → "uSync | Esports LANs, Tournaments, & Leagues Hub"  (homepage)
/lans/kamicon-17          → "uSync | Esports LANs, Tournaments, & Leagues Hub"  (homepage)
/lans/macs-spring-2026    → "uSync | Esports LANs, Tournaments, & Leagues Hub"  (homepage)
/lans/shintochamps2026    → "uSync | Shinto Champs - Call of Duty"              (correct)
```

**Root cause — a two-part chain:**

1. `package.json` → `reactSnap` had **no `include` array**. react-snap only prerenders routes it
   can discover by following `<a>` tags starting from `/`.
2. Archived LAN pages have no inbound links. The `/delete-lan` skill moves a finished event into
   an `Archived/` folder and strips its `HostBanner` from the game listing page — which is
   correct for humans, but it also severs the only crawlable path react-snap had to that URL.
   `src/pages/Lans.js` can't compensate: it contains **zero `<Link to=>` anchors**, because the
   LANs listing is a Leaflet map.

So react-snap never discovers them, no per-route HTML is emitted, and the Netlify `_redirects`
rule `/lans/... /index.html 200` serves the prerendered **homepage** instead.

**Full sweep of all 309 sitemap URLs** (live, 2026-08-04) — 36 served homepage content:

| Group | Count | Real status |
|---|---|---|
| `/` and `/home` | 2 | Correct — these *are* the homepage |
| Archived LANs with real content | 16 | **Broken.** Fixed by the `include` list. |
| Archived LANs that are empty stubs | 12 | Route + file exist, but the component returns `<></>` |
| Payment / checkout flow | 5 | Should never have been in the sitemap |
| `/LanMap` | 1 | Map page, prerenders once discoverable |

The 12 stubs are a separate problem worth calling out: files like
`src/pages/Games/Conventions/Archived/2026/Kami-Con17.js` are five lines long and return an empty
fragment with no `SeoData` at all. They were routed and sitemapped but render nothing. They have
been removed from the sitemap so they can't be indexed as blank pages — see §1.5 for the decision
still owed on them.

**Impact:** LAN events are uSync's most differentiated inventory — the thing CMG does not have.
Right now a large share of it is invisible to every non-JS crawler, and to Google it looks like
duplicate homepage content.

**Fix (implemented on this branch):** `scripts/seo/` derives the prerender list from
`sitemap.xml`, writes it to `reactSnap.include`, and a `postbuild` verifier fails the build if
(a) the include list has drifted from the sitemap, (b) any route emitted no HTML, or (c) any
route prerendered with the homepage's `<title>` — the exact signature of this bug.

### P0-1.5. Twelve empty archived LAN pages — decision needed

These twelve routes resolve to components that return `<></>` and nothing else:

```
/lans/belowzerolan-winter-26      /lans/kamicon-17
/lans/dreamhack-birmingham        /lans/low-ping-lan-2026
/lans/emerald-city-2026           /lans/midwest-battleground-2026
/lans/forlan-spring-2026          /lans/operation-cupid
/lans/g-site-bo7                  /lans/shintogc-major-iii-2026
/lans/heartland-2026              /lans/tomorrowlan_2026
```

They're registered in `src/routes/LanRoutes.js` and were listed in `sitemap.xml`, so we were
advertising twelve blank pages to search engines. They've been pulled from the sitemap and are
excluded from prerendering, which stops the bleeding. Three options for what to do next:

1. **Delete them** — remove the routes, the stub files, and the `_redirects` entries. Cleanest if
   the events aren't coming back.
2. **301 them** to `/lans` or to the current year's edition of the same event. Best if any of these
   URLs have inbound links or lingering rankings worth preserving — `dreamhack-birmingham` and
   `kamicon-17` are real recurring events and plausibly do.
3. **Rebuild them** as proper archived event pages with results and a link to the next edition.
   Most work, but past-event pages hold long-tail search value and feed `SportsEvent` history.

Recommendation: option 2 for the recurring events, option 1 for the one-offs. Needs someone who
knows which of these events are returning.

### P0-2. Listing pages prerender empty

`/lans`, `/tournaments`, `/leagues` each prerender with **0 `<h1>`** and only ~1,010 characters of
text. They get a correct title and description, then nothing. These are the top-level category
pages — they should be the strongest hub pages on the site.

**Fix:** render the event/league list as real server-visible markup with `<Link>` anchors. This
also fixes P0-1 for free, by giving react-snap a crawl path.

**Related — CORS blocks live data during prerender.** The build log shows the tournaments API
call failing on three routes:

```
Access to XMLHttpRequest at 'https://website-backend-v2.onrender.com/tournaments/cod'
from origin 'http://localhost:45678' has been blocked by CORS policy
  affected: /  ·  /home  ·  /tournaments/call-of-duty-tournaments
```

react-snap serves the app from `localhost:45678` while prerendering, and the backend doesn't
allow that origin. So live CoD tournament data never lands in the prerendered HTML — the page
renders for users (whose origin is `usync.gg`) but is empty for every crawler. Given
`/tournaments/call-of-duty-tournaments` is a direct competitive page against CMG, this matters.
Fix by allowlisting the prerender origin on the backend, or by having the page fall back to
build-time fixture data when the request fails.

### P0-3. Heading structure is broken sitewide

| Page | `<h1>` count | Should be |
|---|---|---|
| `/lans`, `/tournaments`, `/leagues` | 0 | 1 |
| `/games/call-of-duty/leagues` | **21** | 1 |
| `/games/LoL/leagues/blue-otter-leagues` | 6 | 1 |
| Homepage | 2 | 1 |
| Article pages | 1 | 1 ✅ |

Multi-league pages are using `<h1>` per league card. Those should be `<h2>`/`<h3>`. One `<h1>`
per page, matching the page's primary query.

### P0-4. Entity URL mismatch splits our brand signal

Canonical tags say `https://www.usync.gg`. The article JSON-LD says `https://usync.gg` for
`author.url`, `publisher.logo.url`, `mainEntityOfPage.@id` and every `BreadcrumbList` item.

Search and AI engines use these to resolve "which entity is this". Splitting them across two
hostnames dilutes exactly the signal we need most (see §3). Pick `https://www.usync.gg`
everywhere and enforce it with a shared `SITE_URL` constant.

---

## 2. On-page metadata — the standard every page should meet

### 2a. Extend the `SeoData` component

`src/components/SeoData/SeoData.jsx` currently emits: title, description, canonical, `og:title`,
`og:description`, `og:url`, `og:image`, and three `twitter:` tags. Missing:

- `og:site_name` — `"uSync"`
- `og:type` — per-page (`website` / `article` / `event`); currently hardcoded to `website` in `index.html`
- `og:image:width` / `og:image:height` / `og:image:alt` — required for reliable large-card rendering
- `article:published_time`, `article:modified_time`, `article:author` on articles
- `<meta name="robots">` — so thin/utility pages (`/checkout`, `/paymentform`, `/Comingsoon`) can be `noindex`
- `<html lang>` is set globally but never varies — fine for now, note it for i18n later
- A `jsonLd` prop, so every page type can pass its own structured data through one component

### 2b. Title and description formulas

Current titles are `uSync | {Name} - {Game}`. Brand-first wastes the most valuable pixels and
buries the keyword. Move the brand to the end:

| Page type | Title pattern | Description pattern |
|---|---|---|
| LAN detail | `{Event} — {Game} LAN in {City}, {ST} · {Month Year} \| uSync` | Date, venue, entry fee, format, prize pool, registration deadline |
| League detail | `{League} — {Game} League ({Region}, {Skill}) \| uSync` | Skill tier, region, schedule, roster size, cost, season dates |
| Game hub | `{Game} Esports: LANs, Leagues & Tournaments \| uSync` | Counts: "42 leagues, 11 LANs, 6 tournament platforms" |
| Listing | `Esports {Type} — Find Events by Game & Region \| uSync` | What's in the list + how to filter |
| Article | `{Question or Claim} \| uSync` | Direct answer in ≤155 chars |

Keep titles ≤60 chars and descriptions 140–160. **Descriptions must be unique per page** —
templated boilerplate across 290 pages is a real ranking drag.

### 2c. Structured data — the biggest single opportunity

**CheckMate Gaming has zero JSON-LD.** Verified on their homepage, `/tournaments`, and
`/call-of-duty-tournament` — 0 `application/ld+json` blocks on all three. They have more content
and more authority, but they have surrendered every rich result and every machine-readable
entity signal. This is the gap uSync can take.

Schema to deploy by page type:

| Page type | Schema |
|---|---|
| LAN detail | `SportsEvent` + `Place`/`PostalAddress` + `Offer` (entry fee) + `organizer` + `BreadcrumbList` |
| Online tournament | `SportsEvent` with `eventAttendanceMode: OnlineEventAttendanceMode` + `VirtualLocation` |
| League detail | `SportsOrganization` or `SportsEvent` series + `Offer` + `BreadcrumbList` |
| Listing / hub | `ItemList` (or `CollectionPage`) enumerating child events with positions |
| Game hub | `CollectionPage` + `BreadcrumbList` + `VideoGame` reference |
| Article | `Article` + `BreadcrumbList` + `FAQPage` ✅ already done |
| Sitewide | `Organization` + `WebSite` with `SearchAction`, emitted once from the homepage |

`SportsEvent` on LAN and tournament pages is the highest-leverage item on this list. It's what
makes events eligible for Google's event rich results and date carousels, and it's the format AI
engines parse most reliably when someone asks "what CoD LANs are happening in October".

### 2d. Content depth

Prerendered body text, measured:

| Page | uSync | CMG equivalent |
|---|---|---|
| Homepage | 2,168 chars | 63,222 chars |
| Tournaments listing | 1,016 chars | 55,966 chars |
| CoD category | 1,577 chars | 55,134 chars |
| Best article | 8,301 chars | — |

CMG's number is inflated by client-side bracket data dumped into the HTML, so it isn't a fair
1:1 target. But ~1,000–1,600 characters on a commercial category page is genuinely thin. Each
league/LAN page needs a real prose block: who runs it, who it's for, skill level, cost, schedule,
platform, region, how to enter, and what makes it different from the alternatives.

---

## 3. Competing with uSync (the Umbraco package)

**Finding: the head term "uSync" is not winnable, and chasing it is the wrong goal.**

A search for "uSync" returns, in order: the Jumoo/KevinJump GitHub repo, the `@_uSync` X account,
uSyncMigrations, the Umbraco Marketplace listing, jumoo.co.uk, the eSync Alliance, a
UmbraJobs blog post, usync.net, and the NuGet package. **usync.gg does not appear at all.**

That competitor is a decade-old developer tool with GitHub stars, NuGet download counts, an
official Umbraco Marketplace listing, and dense inbound links from developer blogs. Those are
authority signals we cannot out-build, and — more importantly — **the searcher intent is
completely different.** Someone typing "uSync" wants a CMS database-sync tool. They are not a
lost esports customer. Ranking for them would produce bounces, not signups.

**The right strategy is disambiguation and entity-building, not head-term combat:**

1. **Own the qualified brand terms.** "uSync gg", "uSync esports", "uSync LAN", "uSync
   tournaments", "usync.gg". These have clean intent and no competition. They should be
   explicitly present in on-page copy, not just in the domain.
2. **Establish uSync as a distinct entity** via `Organization` JSON-LD with `sameAs` links to the
   X account, Discord, YouTube, LinkedIn, and Wikidata/Crunchbase if available. This is how
   engines learn there are two different "uSync"s. It is the single most valuable action here.
3. **Never compete on the bare word.** Every title, OG tag and JSON-LD `name` should read
   "uSync Esports" or "uSync — Esports Events" rather than bare "uSync".
4. **Accept the split in AI answers.** Ask ChatGPT or Perplexity "what is uSync" today and you'll
   get the Umbraco package. The realistic win is that "uSync esports" and "where can I find
   esports LANs" resolve to us. Track those, not the bare term.
5. **Long-term:** a Wikidata entry for uSync (esports platform) is the strongest available
   disambiguation signal and is free to create.

---

## 4. Competing with CheckMate Gaming on tournaments

CMG is the incumbent for online cash-prize tournaments. Where they're strong and where they're not:

**CMG's strengths:** established domain authority; clean keyword-targeted URL structure
(`/call-of-duty-tournament`, `/tournament/pc`, `/competitions`); high content volume; keyword-led
titles ("Online Gaming Tournaments with Cash Prizes - CMG"); genuine brand recognition in the
CoD wagering scene.

**CMG's exploitable weaknesses:**

1. **Zero structured data.** No `SportsEvent`, no `FAQPage`, no `BreadcrumbList`, no
   `Organization` — on any page checked. They are invisible to event rich results and weakly
   represented to AI engines. This is the opening.
2. **They only cover their own ladders.** CMG can only ever answer "what CMG tournaments are on".
   uSync aggregates CMG *and* eAgent *and* 1v1Me *and* GamerSaloon *and* Ewagers *and* leagues
   *and* LANs. For the query "where can I play in a CoD tournament", the aggregator is the more
   useful answer — and AI engines strongly favor comprehensive comparison sources.
3. **No LAN/offline coverage.** "Esports tournaments near me" and every geo-qualified query is
   territory CMG structurally cannot serve. uSync already has ~43 LAN events — currently broken
   per P0-1, which is why fixing that is worth more than any content work.
4. **No neutral comparison content.** They cannot credibly publish "CMG vs eAgent vs 1v1Me".
   We can, and that's exactly the kind of page AI engines cite.

**Where not to fight:** transactional wagering queries ("cod money matches", "wager tournaments
ps5"). CMG owns the intent and the product. Compete on *discovery and comparison*, which is what
uSync actually is.

**Priority queries to target:**
- `esports tournaments near me` (already have an article — extend with geo landing pages)
- `[game] tournaments [platform]` — e.g. "black ops 7 tournaments xbox"
- `cod lan events 2026` / `[game] LAN [state]`
- `checkmate gaming alternatives` / `sites like CMG`
- `how to join a [game] league`
- `free esports tournaments with prizes`

---

## 5. Share images ("link images") per page

Every one of the 304 pages currently shares the same fallback image:
`https://i.imgur.com/A0AhUZp.jpeg`. Two separate problems:

**Reliability.** Imgur is a third-party host with no uptime guarantee, hotlink protection risk,
and no control over caching. Social platforms and AI crawlers that fail to fetch it fall back to
no image at all. Article body images have the same dependency (`i.imgur.com/PbSPBiB.jpg`).
Move all of it to first-party hosting under `/public/og/` served off usync.gg.

**Relevance.** A generic logo card gets meaningfully fewer clicks than a card that shows the
actual event. Target hierarchy:

| Page type | Image |
|---|---|
| LAN detail | Event key art + name, city, date overlaid |
| League detail | League/org logo on a branded uSync frame |
| Game hub | Game key art + "LANs · Leagues · Tournaments" |
| Article | The article's own hero image (already in the JSON-LD) |
| Listing / fallback | Branded uSync card |

Specs: 1200×630, <300 KB, `.webp` with `.jpg` fallback, readable at Discord's thumbnail size
(Discord is where most of this audience shares links — worth optimizing for specifically).
Always pair with `og:image:width`, `og:image:height` and a descriptive `og:image:alt`.

Sequence: build a branded template first, generate per-game and per-listing cards (~15 images
covering most traffic), then per-LAN cards for the ~43 events, then wire generation into the
`/add-lan` skill so new events get one automatically.

---

## 6. Articles to add

The existing 11 articles are a good base and the template is strong. Gaps, in priority order:

**Tier 1 — direct competitive capture:**
1. `checkmate-gaming-alternatives` — honest comparison of CMG, eAgent, 1v1Me, GamerSaloon, Ewagers
2. `best-esports-tournament-sites-2026` — the category-defining roundup
3. `cod-lan-events-2026` — full calendar, updated continuously, `ItemList` schema
4. `how-to-host-an-esports-tournament` — feeds the existing `/more/eventhost` conversion path

**Tier 2 — geo capture (CMG structurally cannot compete here):**
5. `esports-lans-by-state` hub + per-region pages for the states where we already have events
6. `college-esports-leagues-guide` — we already list ECAC, NECC, NJCAAE, PlayVS, Playfly

**Tier 3 — informational / AI-citation bait:**
7. `esports-league-vs-tournament-vs-lan` — definitional content, heavily cited by AI engines
8. `what-to-bring-to-a-lan` — practical checklist, strong long-tail
9. `how-esports-prize-pools-work`
10. `[game]-competitive-ranks-explained` per title

**Every article needs, at minimum:** one `<h1>` matching the target query; a direct 40–60 word
answer in the first paragraph (this is what gets quoted in AI Overviews); `<h2>`s phrased as real
questions; a genuine FAQ block wired to `FAQPage` schema; internal links to relevant
league/LAN/game pages; a unique hero image; `Article` + `BreadcrumbList` JSON-LD with accurate
`datePublished`/`dateModified`; and a sitemap entry with `<lastmod>`.

---

## 7. Suggested execution order

| Phase | Work | Why first |
|---|---|---|
| **1** | P0-1 react-snap `include` + build assertion | Unblocks ~40 invisible LAN pages; nothing else works until crawlers see the pages |
| **2** | P0-3 heading fixes, P0-4 canonical/entity URL unification | Cheap, sitewide, mechanical |
| **3** | Extend `SeoData` (og:type, site_name, image dims, robots, `jsonLd` prop) | The delivery mechanism for everything after |
| **4** | `Organization` + `WebSite` schema sitewide | The uSync-vs-Umbraco disambiguation fix |
| **5** | `SportsEvent` schema on LAN + tournament pages | The CMG gap — highest competitive upside |
| **6** | P0-2 listing page content + `ItemList` schema | Turns hubs into real pages |
| **7** | Per-page OG images | Click-through and share quality |
| **8** | Title/description rewrite across page types | Broad but low-risk |
| **9** | Tier 1 articles | Compounds on top of a now-healthy technical base |
| **10** | Content depth pass on league/LAN pages | Ongoing |

---

## 8. Measurement

Before touching anything, capture a baseline: indexed page count, impressions/clicks per page
type, and current positions for the §4 target queries.

Note that keyword volume estimates are **not** included above — the Ahrefs and SimilarWeb
connectors in this workspace are unauthorized, so any numbers would be guesses. Connect Google
Search Console (free, and the authoritative source for our own data) plus Ahrefs before
committing to keyword priorities. The technical fixes in Phases 1–6 are worth doing regardless
of what the keyword data says.

For GEO specifically, track prompts rather than keywords — "where can I find esports LANs",
"esports tournament sites", "CMG alternatives" — across ChatGPT, Perplexity and Google AI
Overviews, and record whether uSync is cited. Re-check monthly.
