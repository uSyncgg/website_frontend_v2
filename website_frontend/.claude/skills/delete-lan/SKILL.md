---
name: delete-lan
description: Archive a LAN event from the uSync website. Moves the detail page to the game-specific archive folder, removes its HostBanner and map pin from game listing pages, removes it from all maps, and moves its sitemap entry to the archived section. Does NOT touch _redirects. Trigger on "/delete-lan" or "remove a LAN" or "archive a LAN".
---

# Archive a LAN Event

This skill moves a LAN from "current" to "archived": it relocates the detail page file, updates all imports and routes in index.js, strips the HostBanner and map pin from the game listing page(s), removes the pin from all maps, and moves the sitemap URL to the archived section.

---

## Step 1 — Collect input

Ask the contributor for:
- **Game(s)** the LAN is listed under (`CoD`, `Halo`, `LoL`, `Warzone`, `Conventions`)
- **LAN name(s)** to archive (exact title as it appears on the site, e.g. "Shinto Champs")

Multiple LANs can be archived in one run — process each one through all steps before moving to the next.

---

## Step 2 — Look up the LAN details

For each LAN, read the game's LAN list file (see path mapping in Step 3) and find the matching `<HostBanner>` block by its title text. From it, extract:
- **Route slug** — from the `path={}` prop (e.g. `/lans/shinto-test` → slug is `shinto-test`)

Then search `src/index.js` for the route slug to find the matching `<Route>` and its import. Extract:
- **Component name** — from the `element={<ComponentName />}` prop (e.g. `ShintoTest`)
- **Current import path** — from the `import { ComponentName } from '...'` line

Confirm the component name and slug back to the contributor before making any changes.

---

## Step 3 — File path and archive mapping

| Game | LAN List File | Current Events Folder | Archive Folder | CSS import (current → archived) |
|------|--------------|----------------------|----------------|---------------------------------|
| CoD | `src/pages/Games/Cod/Lans/CodLans.js` | `src/pages/Games/Cod/Lans/Events/` | `src/pages/Games/Cod/Lans/Archived/2026/` | `'../../../EventInformation.css'` → `'../../../../EventInformation.css'` |
| Halo | `src/pages/Games/Halo/Lans/HaloLans.js` | `src/pages/Games/Halo/Lans/Events/` | `src/pages/Games/Halo/Lans/Archived/2026/` | `'../../../EventInformation.css'` → `'../../../../EventInformation.css'` |
| LoL | `src/pages/Games/Lol/Lans/LolLans.js` | `src/pages/Games/Lol/Lans/Events/` | `src/pages/Games/Lol/Lans/Archived/2026/` | `'../../../EventInformation.css'` → `'../../../../EventInformation.css'` |
| Warzone | `src/pages/Games/Wz/Lans/WzLans.js` | `src/pages/Games/Wz/Lans/Events/` | `src/pages/Games/Wz/Lans/Archived/2026/` | `'../../../EventInformation.css'` → `'../../../../EventInformation.css'` |
| Conventions | `src/pages/Games/Conventions/Conventions.js` | `src/pages/Games/Conventions/Events/` | `src/pages/Games/Conventions/Events/Archived/2026/` | `'../../EventInformation.css'` → `'../../../../EventInformation.css'` |

### Year folder detection
Before archiving, use Glob to check what year subfolders exist in the game's `Archived/` directory (e.g. `src/pages/Games/Cod/Lans/Archived/*/`).
- If only `2026` exists, or the folder doesn't exist yet → use `2026`
- If **multiple year folders** exist (e.g. `2026` and `2027`) → ask the contributor which year to archive under before proceeding

---

## Step 4 — Read and copy the detail page file

Read the current file at `{Events Folder}{ComponentName}.js`.

Create a copy at `{Archive Folder}{ComponentName}.js` with one change: update the CSS import path from the current value to the archived value (see table in Step 3).

Example for a CoD LAN:
- Old: `import '../../../EventInformation.css';`
- New: `import '../../../../EventInformation.css';`

All other content stays exactly the same.

---

## Step 5 — Delete the original file

After confirming the archived copy was written successfully, delete the original file at `{Events Folder}{ComponentName}.js` using Bash:
```bash
rm "src/pages/Games/{Game}/Lans/Events/{ComponentName}.js"
```

---

## Step 6 — Update src/index.js

Read the file, then make two changes:

**A. Move the import** — Find the import line inside `// LAN Pages - CURRENT`:
```js
import { {ComponentName} } from 'pages/Games/{Game}/Lans/Events/{ComponentName}';
```
Remove it from the CURRENT block and add it in the `// Archived LANs Below` section with the updated path:
```js
import { {ComponentName} } from 'pages/Games/{Game}/Lans/Archived/2026/{ComponentName}';
```
For Conventions: `pages/Games/Conventions/Events/Archived/2026/{ComponentName}`

**B. Move the route** — Find the `<Route>` inside `{/* LANs - CURRENT*/}`:
```jsx
<Route path='/lans/{route-slug}' element={<{ComponentName} />} />
```
Remove it from the CURRENT block and add it inside `{/* Archived LANs */}`:
```jsx
<Route path='/lans/{route-slug}' element={<{ComponentName} />} />
```

---

## Step 7 — Update src/data/lanMarkers.js

This is the **single source of truth** for all map markers. Removing the entry here automatically removes the pin from AllLans, Home, and the game-specific map — do **not** separately edit those files for markers.

Read `src/data/lanMarkers.js` and delete the matching entry from the relevant game array (`COD_LAN_MARKERS`, `HALO_LAN_MARKERS`, `LOL_LAN_MARKERS`, `WZ_LAN_MARKERS`, or `CONVENTION_MARKERS`):
```js
{ lat: ..., lng: ..., name: "{Title}", link: "/lans/{route-slug}", game: '...' },
```

For multi-game events, delete the entry from **each** game's array it appeared in.

---

## Step 8 — Update the game LAN list file(s)

For each game the LAN belongs to, read the file and remove the HostBanner only (markers are handled in Step 7).

**Remove the HostBanner** — Delete the full `<HostBanner>...</HostBanner>` block AND the `<div className="hrEvents" />` that immediately precedes it.

If there is no hrEvents immediately before the HostBanner (e.g. it's the first item after the opening container `<div className="hrEvents" />`), remove the hrEvents that follows it instead.

Do not remove any other hrEvents dividers — only the one directly adjacent to the removed banner.

---

## Step 9 — Update the sitemap

Read `public/sitemap.xml`.

Remove the entry from its current game section (`<!-- CoD LANs -->`, `<!-- LoL LANs -->`, `<!-- Conventions -->`, etc.):
```xml
<url><loc>https://www.usync.gg/lans/{route-slug}</loc></url>
```

Add the same entry inside the `<!-- Archived LANs 2026 -->` section.

---

## Step 10 — Confirm completion

Report what was done for each LAN:
- ✅ File moved to `{archive path}`
- ✅ CSS import updated in archived file
- ✅ Import + route moved to archived section in `src/index.js`
- ✅ Marker removed from `src/data/lanMarkers.js`
- ✅ HostBanner removed from `{game LAN file(s)}`
- ✅ Sitemap entry moved to `<!-- Archived LANs 2026 -->`

⚠️ **Reminder:** Check the `<div className="hrEvents" />` dividers in the game LAN listing page(s) to make sure they look right. The skill removes the divider directly adjacent to the deleted banner, but visually verify the spacing between remaining banners is correct.
