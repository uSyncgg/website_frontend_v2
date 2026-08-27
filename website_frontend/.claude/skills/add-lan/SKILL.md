---
name: add-lan
description: Add a new LAN event to the uSync website. Creates the detail page, registers the route, adds a HostBanner to the game LAN listing page(s), pins it on all maps, updates the sitemap, and adds the redirect. Trigger on "/add-lan" or "add a LAN".
---

# Add a New LAN Event

This skill adds a complete LAN event: detail page, route, HostBanner listing entry, map markers, and sitemap entry.

---

## Step 1 — Collect event details

If the user didn't provide all fields inline, ask for them all at once. Required fields:

| Field | Example |
|-------|---------|
| **Game(s)** | `CoD`, `Halo`, `LoL`, `Warzone`, `Conventions` (can be multiple) |
| **Title** | "RVA Esports Championship 2026" |
| **SEO hook** | 1–2 sentence description used in the `description=` prop on `SeoData` — e.g. "Enter to play VALORANT and COD at Hawaii's newest convention, featuring Anime, K-Pop, Gaming and More!" |
| **Description bullets** | "$1,000 Prize Pool", "1v1 Championship", "CoD and SF6" |
| **Date** | "July 11 - 12th, 2026" |
| **Exact location** | "Richmond Convention Center, 403 N 3rd St, Richmond, VA 23219" |
| **Entry fee** | "Venue Fee: $55", "Spectator Pass: $35" — or "Free Entry" |
| **Event link** | Full URL to register or get info |
| **Imgur image URL** | `https://i.imgur.com/XXXXXXX.png` |

Valid game values: `CoD`, `Halo`, `LoL`, `Warzone`, `Conventions`.
- Use `Conventions` for multi-game events, gaming conventions, or events that don't belong to a single game.
- A LAN can belong to multiple games (e.g. CoD + Halo) — list all that apply.

Confirm all fields back to the user before doing any file work.

---

## Step 2 — Derive names, display location, and coordinates

### Component name (PascalCase, no spaces or special chars)
- "RVA Esports Championship 2026" → `RVAEsportsChampionship2026`
- "GA:CS Operation Heatwave" → `GACSOperationHeatwave`
- "EWGL 3" → `EWGL3`
- "Citadel I" → `CitadelI`

### Route slug (lowercase kebab-case)
- "RVA Esports Championship 2026" → `rva-esports-championship-2026`
- "GA:CS Operation Heatwave" → `gacs-operation-heatwave`
- "EWGL 3" → `ewgl3`

### Display location (City, StateAbbrev)
Extract from the exact location:
- "Richmond Convention Center, 403 N 3rd St, Richmond, VA 23219" → `Richmond, VA`
- "Metro Toronto Convention Centre, Toronto, ON M5V 3C6" → `Toronto, ON`

### Coordinates
Use WebFetch to call the Nominatim geocoding API:
```
https://nominatim.openstreetmap.org/search?q=URLENCODED_ADDRESS&format=json&limit=1
```
Add header: `User-Agent: uSync-website/1.0`

Extract `lat` and `lon` (Nominatim uses `lon`, not `lng`) from the first result. Round to 7 decimal places.

If no results, retry with just the venue name + city + state. If still failing, use WebSearch to find coordinates.

---

## Step 3 — File path mapping by game

| Game | LAN List File | Events Folder | CSS import path | Back button path | index.js comment |
|------|--------------|---------------|-----------------|-----------------|-----------------|
| CoD | `src/pages/Games/Cod/Lans/CodLans.js` | `src/pages/Games/Cod/Lans/Events/` | `'../../../EventInformation.css'` | `/games/call-of-duty/lans` | `{/* CoD */}` |
| Halo | `src/pages/Games/Halo/Lans/HaloLans.js` | `src/pages/Games/Halo/Lans/Events/` | `'../../../EventInformation.css'` | `/games/halo/lans` | `{/* Halo */}` |
| LoL | `src/pages/Games/Lol/Lans/LolLans.js` | `src/pages/Games/Lol/Lans/Events/` | `'../../../EventInformation.css'` | `/games/LoL/lans` | `{/* LoL */}` |
| Warzone | `src/pages/Games/Wz/Lans/WzLans.js` | `src/pages/Games/Wz/Lans/Events/` | `'../../../EventInformation.css'` | `/games/warzone/lans` | `{/* Wz */}` |
| Conventions | `src/pages/Games/Conventions/Conventions.js` | `src/pages/Games/Conventions/Events/` | `'../../EventInformation.css'` | `/other-lans` | `{/* Conventions */}` |

For multi-game events: the detail page lives in the **first game's** Events folder and uses that game's CSS import and back button. HostBanner entries and map markers are added to **each** listed game's LAN list file.

---

## Step 4 — Create the detail page

**Read the destination Events folder first** (e.g. Glob `src/pages/Games/Cod/Lans/Events/*.js`) to confirm the file doesn't already exist, then create `{Events Folder}{ComponentName}.js`:

```jsx
import { EventInfoCard, HeaderImage, ExternalButton, BackButton, SeoData } from "components";
import '{CSS_IMPORT_PATH}';

export const {ComponentName} = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description={"{SEO hook provided by user}"}
                canonicalPath={"/lans/{route-slug}"}
            />

            <HeaderImage title={"{Title}"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date/Place"} infoList={["{Date}", "{DisplayLocation}"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={[
                        "{description bullet 1}",
                        "{description bullet 2}",
                        ...
                    ]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["{fee line 1}", "{fee line 2}"]} footer={<ExternalButton blank={true} title={"Join Now"} path={"{EventLink}"} /> }/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"{BackButtonPath}"} />
            </div>
        </div>
    );
}
```

The `description=` on `SeoData` must use the **SEO hook** provided by the user in Step 1 — not a generic summary.

---

## Step 5 — Update src/index.js

**Read the file around line 318** (`// LAN Pages - CURRENT` section) before editing.

Add the import on a new line inside the `// LAN Pages - CURRENT` block, after the existing imports:
```js
import { {ComponentName} } from 'pages/Games/{GameFolder}/Lans/Events/{ComponentName}';
```
For Conventions events: `'pages/Games/Conventions/Events/{ComponentName}'`

Add the route inside the appropriate game comment block (around line 684, `{/* LANs - CURRENT*/}`):
```jsx
<Route path='/lans/{route-slug}' element={<{ComponentName} />} />
```
Insert it directly under the matching `{/* GameName */}` comment.

---

## Step 6 — Update src/data/lanMarkers.js

This is the **single source of truth** for all map markers. `AllLans.js` and `Home.js` import `ALL_LAN_MARKERS` from here automatically — do **not** edit those files for markers.

Read `src/data/lanMarkers.js`, then append to the matching game's array. Always include the `game` property:

| Game | Array to append to | `game` value |
|------|--------------------|-------------|
| CoD | `COD_LAN_MARKERS` | `'CoD'` |
| Halo | `HALO_LAN_MARKERS` | `'Halo'` |
| LoL | `LOL_LAN_MARKERS` | `'LoL'` |
| Warzone | `WZ_LAN_MARKERS` | `'Warzone'` |
| Conventions | `CONVENTION_MARKERS` | `'Conventions'` |

```js
{ lat: {lat}, lng: {lon}, name: "{Title}", link: "/lans/{route-slug}", game: '{GameValue}' },
```

For multi-game events, append to **each** relevant game's array.

---

## Step 7 — Update the game LAN list file(s)

For each game the LAN belongs to, read the game's LAN list file and add the HostBanner only (markers are handled in Step 6).

**Add HostBanner** — append inside the `<div className="eventBannerContainer">` block, before the closing `</div>`.

**hrEvents divider rule:** Read the end of the `eventBannerContainer` block first.
- If the last element before `</div>` is already `<div className="hrEvents" />`, insert the new HostBanner directly after it — **do not** add another `<div className="hrEvents" />` before it.
- If the last element before `</div>` is a `</HostBanner>` with no trailing hrEvents, add a `<div className="hrEvents" />` before the new HostBanner.

Always add a `<div className="hrEvents" />` **after** the new HostBanner (before the closing `</div>`).

```jsx
{/* Only add this line if there is NO existing <div className="hrEvents" /> immediately before */}
<div className="hrEvents" />

<HostBanner>
    <HostBanner.Title path={"/lans/{route-slug}"}>{Title}</HostBanner.Title>
    <HostBanner.Image
        path={"/lans/{route-slug}"}
        imgUrl={"{ImgurURL}"}
        alt={"{Title}"}
        verified={false}
    />
    <HostBanner.Region>{DisplayLocation}</HostBanner.Region>
    <HostBanner.Button title={"More Info"} path={"/lans/{route-slug}"} />
</HostBanner>

<div className="hrEvents" />
```

---

## Step 8 — Update _redirects

Read `public/_redirects`, find the `# LANs` section, and add the new route on a new line inside it:
```
/lans/{route-slug} /index.html 200
```

---

## Step 9 — Update the sitemap

Read `public/sitemap.xml`, find the matching game comment block (`<!-- CoD LANs -->`, `<!-- Halo LANs -->`, `<!-- Conventions -->`, etc.) and add a new URL entry inside it:
```xml
<url><loc>https://www.usync.gg/lans/{route-slug}</loc></url>
```

If no matching comment block exists for that game, create one above `<!-- LoL LANs -->` (or the nearest appropriate section).

---

## Step 9b — Sync the prerender route list

**Required.** The sitemap is the source of truth for which routes get prerendered, so adding a
URL there means `package.json` → `reactSnap.include` has to be regenerated:

```bash
npm run seo:sync-routes
```

Confirm the output shows the new LAN being added, e.g. `+ 1 added: /lans/{route-slug}`.

Skipping this **fails the production build** — `postbuild` runs a verifier that refuses to ship
when the sitemap and the include list disagree. Without the new route in that list, react-snap
never prerenders the page and Netlify serves the homepage under the LAN's URL instead, which is
invisible to search engines and reads as duplicate content.

---

## Step 10 — Confirm completion

Report exactly what was created and updated:
- ✅ Detail page: `{file path}`
- ✅ Route added to `src/index.js`
- ✅ Marker added to `src/data/lanMarkers.js` (game array: `{ArrayName}`)
- ✅ HostBanner added to `{game LAN file(s)}`
- ✅ Redirect added to `public/_redirects`
- ✅ Sitemap updated
- ✅ Prerender routes synced (`npm run seo:sync-routes`)

Show the coordinates used so the contributor can verify the map pin is correct.
