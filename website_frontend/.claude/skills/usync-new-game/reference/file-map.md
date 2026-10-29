# File map — every place a game lives

All paths are relative to `website_frontend/` unless they start with
`C:\Users\jakeb\uSync\db_interaction_tools`. Placeholders:

| Placeholder | Meaning | Example |
|---|---|---|
| `{Title}` | Official title = **database name** | `Apex Legends` |
| `{slug}` | URL slug | `apex-legends` |
| `{Pascal}` | PascalName | `ApexLegends` |
| `{css}` | cssPrefix | `apexLegends` |
| `{MapKey}` | LAN map key (LANs only) | `Apex` |
| `{Genre}` | genre | `Battle Royale` |
| `{Eyebrow}` | `PC` or `Console · Crossplay` | `Console · Crossplay` |
| `{Hook}` | confirmed game description | |
| `{Accent}` | accent hex | `#d9473a` |

The CS2 files (`src/pages/Games/CS/`) are the template for Leagues / Wagers /
Head to Head pages, and League of Legends (`src/pages/Games/Lol/Lans/LolLans.js`)
is the template for the LANs page. **Copy the template file, then replace only
the game-specific strings listed** — don't rewrite the logic.

Section rows marked *(if Leagues)*, *(if LANs)* etc. are skipped when that answer
was No.

---

## 1. Images → `src/assets/images/`

Copy each validated file in, keeping the user's file name exactly (that's where
the date lives). Stop and ask if a file with the same name already exists.

| Image | Destination folder |
|---|---|
| Game Bubble | `src/assets/images/game_icons/` |
| Game Page Header | `src/assets/images/game_headers/` |
| Leagues / Wagers / Head to Head headers | `src/assets/images/game_event_headers/` |

## 2. `src/catalog/gameIcons.js`

Add an import (after the last game import) and a map entry keyed by `{slug}`:
```js
import {css} from 'assets/images/game_icons/<bubble file name>';
...
    '{slug}': {css},
```

## 3. `src/catalog/gameAliases.js` *(only if nicknames were given)*
```js
    '{slug}': ['nick1', 'nick2'],
```

## 4. `src/components/HeaderImage/HeaderImageStandard.css`

Add a block after the last `…GamePage` / game-event block (before `.nonVerifiedPage`):
```css
.{css}GamePage {
    --bg-image: url("../../assets/images/game_headers/<game page header file>");
}

.{css}LeaguePage {   /* if Leagues */
    --bg-image: url("../../assets/images/game_event_headers/<leagues header file>");
}

.{css}WagersPage {   /* if Wagers */
    --bg-image: url("../../assets/images/game_event_headers/<wagers header file>");
}

.{css}h2hPage {      /* if Head to Head */
    --bg-image: url("../../assets/images/game_event_headers/<h2h header file>");
}
```

## 5. Game page → `src/pages/Games/{Pascal}/{Pascal}.js`

Copy `src/pages/Games/CS/CS.js` and change:
- `FORMATS`: one row per format, in the same order. Yes → real path + `live: true`.
  No (and Tournaments always) → `path: "/Comingsoon", live: false`.
  ```js
  { key: "leagues",  name: "Leagues",            blurb: "Multi-week seasons with standings",          path: "/games/{slug}/leagues",      live: true },
  { key: "lans",     name: "LANs",               blurb: "In-person events",                           path: "/games/{slug}/lans",         live: true },
  { key: "tourneys", name: "Online Tournaments", blurb: "Bracket play, credits or free entry",        path: "/Comingsoon",                live: false },
  { key: "wagers",   name: "Wagers",             blurb: "Stake-based matches through a verified host", path: "/games/{slug}/wagers",       live: true },
  { key: "h2h",      name: "Head to Head",       blurb: "Challenge a specific opponent",              path: "/games/{slug}/head-to-head", live: true },
  ```
- `export const CS` → `export const {Pascal}`
- `SeoData`: `title={"{Title}"}`, `description="{Hook}"`, `canonicalPath={"/games/{slug}"}`
- `HeaderImage`: `imageClass={"{css}GamePage"}`, `title={"{Title}"}`,
  `eyebrow={"{Eyebrow}"}`, `subtext={"{Hook}"}`
- `<VerifiedEventsShowcase game="{Title}" gameSlug="{slug}" />`

## 6. Leagues page → `src/pages/Games/{Pascal}/Leagues/{Pascal}Leagues.js` *(if Leagues)*

Copy `src/pages/Games/CS/Leagues/CSLeagues.js`. Replace:
- `'/games/CS2/leagues'` → `'/games/{slug}/leagues'` (in `buildEventPath` and `canonicalPath`)
- `export const CSLeagues` → `export const {Pascal}Leagues`
- `useLeagueEvents("CS2")` → `useLeagueEvents("{Title}")`
- SeoData `title={"{Title} Leagues"}`, `description="<confirmed Leagues description>"`
- `<HeaderImage title={"{Title} Leagues"} imageClass={"{css}LeaguePage"} />`

## 7. Wagers page → `src/pages/Games/{Pascal}/Wagers/{Pascal}Wagers.js` *(if Wagers)*

Copy `src/pages/Games/CS/Wagers/CSWagers.js`. Replace:
- `'/games/CS2/wagers'` → `'/games/{slug}/wagers'`
- `export const CSWagers` → `export const {Pascal}Wagers`
- `useWagerEvents("CS2")` → `useWagerEvents("{Title}")`
- SeoData `title={"{Title} Wagers"}`, `description="<confirmed Wagers description>"`
- `<HeaderImage title={"Wagers"} imageClass={"{css}WagersPage"} />`

## 8. Head to Head page → `src/pages/Games/{Pascal}/HeadToHead/{Pascal}HeadToHead.js` *(if H2H)*

Copy `src/pages/Games/CS/HeadToHead/CSHeadToHead.js`. Replace:
- `'/games/CS2/head-to-head'` → `'/games/{slug}/head-to-head'`
- `export const CSHeadToHead` → `export const {Pascal}HeadToHead`
- `useXpEvents("CS2")` → `useXpEvents("{Title}")`
- SeoData `title={"{Title} Head-to-Head"}`, `description="<confirmed H2H description>"`
- `<HeaderImage title={"Head-to-Head"} imageClass={"{css}h2hPage"} />`

## 9. LANs page → `src/pages/Games/{Pascal}/Lans/{Pascal}Lans.js` *(if LANs)*

Copy `src/pages/Games/Lol/Lans/LolLans.js`. Replace:
- `const GAME = "League of Legends";` → `const GAME = "{Title}";`
- `const MAP_GAME = "LoL";` → `const MAP_GAME = "{MapKey}";`
- `export const LolLans` → `export const {Pascal}Lans`
- SeoData `title={"{Title} LANs"}`, `description={"<confirmed LANs description>"}`,
  `canonicalPath={"/games/{slug}/lans"}`

(No header image — the LANs page shows the map.)

## 10. Routes → `src/routes/{Pascal}Routes.js`

Model on `src/routes/LolRoutes.js`. Include only the Yes sections:
```js
import { Route, Routes } from 'react-router';

// {Title} Specific Pages
import { {Pascal} } from 'pages/Games/{Pascal}/{Pascal}';
import { {Pascal}Lans } from 'pages/Games/{Pascal}/Lans/{Pascal}Lans';           // if LANs
import { PlatformDetail } from 'pages/Games/Shared/PlatformDetail';              // if Wagers or H2H
import { LeagueDetail } from 'pages/Games/Shared/LeagueDetail';                  // if Leagues
// H2H
import { {Pascal}HeadToHead } from 'pages/Games/{Pascal}/HeadToHead/{Pascal}HeadToHead';
// Leagues
import { {Pascal}Leagues } from 'pages/Games/{Pascal}/Leagues/{Pascal}Leagues';
// Wagers
import { {Pascal}Wagers } from 'pages/Games/{Pascal}/Wagers/{Pascal}Wagers';

const {Pascal}Routes = () => (
    <Routes>
        <Route index element={<{Pascal} />} />
        <Route path='lans' element={<{Pascal}Lans />} />
        {/* H2H */}
        <Route path='head-to-head' element={<{Pascal}HeadToHead />} />
        <Route path='head-to-head/*' element={<PlatformDetail eventType="head-to-head" game="{Title}" sectionPath="/games/{slug}/head-to-head" />} />
        {/* Leagues */}
        <Route path='leagues' element={<{Pascal}Leagues />} />
        <Route path='leagues/*' element={<LeagueDetail game="{Title}" sectionPath="/games/{slug}/leagues" />} />
        {/* Wagers */}
        <Route path='wagers' element={<{Pascal}Wagers />} />
        <Route path='wagers/*' element={<PlatformDetail eventType="wagers" game="{Title}" sectionPath="/games/{slug}/wagers" />} />
    </Routes>
);

export default {Pascal}Routes;
```

## 11. `src/index.js`

- Import with the other game routes (`// Game & Section Routes`):
  `import {Pascal}Routes from './routes/{Pascal}Routes';`
- Route under `{/* Game Pages Minus LANs and Tournaments */}`:
  `<Route path='/games/{slug}/*' element={<{Pascal}Routes />} />`

## 12. `src/catalog/games.catalog.js`

- Add an entry at the end of `entries`:
  ```js
  {
      slug: '{slug}',
      name: '{Title}',
      apiGame: '{Title}',
      genre: '{Genre}',
      path: '/games/{slug}',
      image: GAME_ICONS['{slug}'],
      sections: {
          leagues: '/games/{slug}/leagues',      // only Yes sections
          lans:    '/games/{slug}/lans',
          wagers:  '/games/{slug}/wagers',
          h2h:     '/games/{slug}/head-to-head',
      },
  },
  ```
  (Never add `tournaments` — that's CoD-only.)
- Update `hero.eyebrow`: `'7 Game Titles'` → the new count of entries.

## 13. `src/catalog/leagues.catalog.js` *(if Leagues)*
Add at the end of `entries`:
```js
{
    slug: '{slug}',
    name: '{Title}',
    apiGame: '{Title}',
    genre: '{Genre}',
    path: '/games/{slug}/leagues',
    image: GAME_ICONS['{slug}'],
    sections: { leagues: '/games/{slug}/leagues' },
},
```

## 14. `src/catalog/lans.catalog.js` *(if LANs)*
Add at the end of `entries` (this catalog has no `apiGame`):
```js
{
    slug: '{slug}',
    name: '{Title}',
    genre: '{Genre}',
    path: '/games/{slug}/lans',
    image: GAME_ICONS['{slug}'],
    sections: { lans: '/games/{slug}/lans' },
},
```

## 15. LAN map *(if LANs)*

- `src/data/lanMarkers.js` — add **before** `"Conventions"` in both maps:
  - `LAN_GAME_KEY`: `"{Title}": "{MapKey}",`
  - `LAN_GAME_SECTION_PATH`: `"{Title}": "/games/{slug}/lans",`
  (`LAN_GAMES` is derived from `LAN_GAME_KEY`, so the all-LANs map and
  `/lans/all` pick the game up automatically.)
- `src/components/LanMap/LanMap.jsx` — before `'Conventions'` in each:
  - `GAME_COLORS`: `'{MapKey}': '{Accent}',`
  - `GAME_LABELS`: `'{MapKey}': '{Title}',`
  - `GAME_ORDER`: insert `'{MapKey}'` before `'Conventions'`
- `src/components/MapCover/MapCoverGame.jsx` — add a back link after the Halo one:
  ```jsx
  {game === "{MapKey}" &&
      <Link to="/games/{slug}" className={`${styles.mapButtonGame} ${styles.mapButton}`}>Back to {Title}</Link>
  }
  ```

## 16. Navbar — `src/components/Navbar/DropdownNavItems.jsx`

- Leagues dropdown *(if Leagues)*: after the last game link (Counter-Strike 2):
  ```jsx
  <NavLink to="/games/{slug}/leagues" className={styles.dropdownItem} onClick={closeMenu}>
    {Title}
  </NavLink>
  ```
- LANs dropdown *(if LANs)*: same shape with `/games/{slug}/lans`, placed
  **before** "Other / Conventions".

## 17. Home page — `src/components/ChooseYourGame/`

- `ChooseYourGame.jsx`: import the bubble
  (`import {css}Icon from 'assets/images/game_icons/<bubble file>';`) and append
  to `GAMES`:
  `{ name: "{Title}", to: "/games/{slug}", logo: {css}Icon, accent: styles.accent{Pascal} },`
- `ChooseYourGame.module.css`: after `.accentHalo`:
  `.accent{Pascal} { --accent: {Accent}; }`

## 18. Sign-up + profile settings — `src/components/MutualSignUpSteps/UserGamesStep.jsx`

Add to `GAME_OPTIONS` in alphabetical order by title, **above** `"Other"`:
```js
{ value: "{Title}", title: "{Title}", image: GAME_ICONS['{slug}'] },
```
`value` is what's saved to the user's profile, so it must be exactly `{Title}`.
Profile settings (`ProfileSettingsWizard`) reuses this same step, and the public
profile (`src/pages/Accounts/Profile/Profile.js`) looks games up in
`games.catalog.js` by name — so this one edit plus step 12 covers sign-up,
profile editing, and profile display. Nothing else to change there.

## 19. Coming Soon page *(only if the game was on it)*

- `src/pages/More/ComingSoon.js` — remove its key from the `games` object passed
  to `<GameImage>` (keys: `"Fortnite"`, `"Apex Legends"`, `"Super Smash Bros"`,
  `"Overwatch 2"`).
- `src/components/GameImage/GameImage.jsx` — remove that game's Coming Soon
  `import` and its `{Object.keys(games).includes(...)}` block. Leave the
  `coming_soon/` image file in place (deleting assets is out of scope).

## 20. FAQ — `src/pages/More/Faqs.js`

Import the bubble and add a link at the end of the "Featured Games" card:
```jsx
<Link to={"/games/{slug}"} className={styles.gameLink}>
    <img src={{css}Icon} alt="{Title}" className={styles.gameImg} />
</Link>
```

## 21. SEO / hosting files — one line per page, Yes sections only

- `public/_redirects` — new block after `# Warzone` (before `# Payment`):
  ```
  # {Title}
  /games/{slug} /index.html 200
  /games/{slug}/lans /index.html 200
  /games/{slug}/head-to-head /index.html 200
  /games/{slug}/head-to-head/* /200.html 200
  /games/{slug}/leagues /index.html 200
  /games/{slug}/leagues/* /200.html 200
  /games/{slug}/wagers /index.html 200
  /games/{slug}/wagers/* /200.html 200
  ```
- `public/sitemap-static.xml` — new block after the Warzone block (before `<!-- Payment -->`):
  ```xml
  <!-- {Title} -->
  <url><loc>https://www.usync.gg/games/{slug}</loc></url>
  <url><loc>https://www.usync.gg/games/{slug}/lans</loc></url>
  <!-- {Title} H2H -->
  <url><loc>https://www.usync.gg/games/{slug}/head-to-head</loc></url>
  <!-- {Title} Leagues -->
  <url><loc>https://www.usync.gg/games/{slug}/leagues</loc></url>
  <!-- {Title} Wagers -->
  <url><loc>https://www.usync.gg/games/{slug}/wagers</loc></url>
  ```
- `package.json` → `reactSnap.include` — append after the last `/games/warzone/...`
  line (mind the commas): `"/games/{slug}"`, then each Yes section page
  (`/lans`, `/head-to-head`, `/leagues`, `/wagers`; no `/*` entries).

## 22. Docs and analytics

- `CLAUDE.md` (in `website_frontend/`) — add the title to the "covering CoD, CS2,
  Halo, …" list in the Architecture section.
- `src/services/adminAnalytics.js` — **only if this file exists on the branch**:
  add `'{Title}': <small weight>` to both `players` and `hosts` in
  `MOCK_GAME_WEIGHTS` (above `'Other'`), so mock data includes the game.
- `src/components/EventTypeImages/EventTypeImages.jsx` has per-game blocks, but
  they're only rendered for the Coming Soon page — **don't** add one.

---

## db_interaction_tools

Repo: `C:\Users\jakeb\uSync\db_interaction_tools` (its own git repo, GitHub
`uSyncgg/db_interaction_tools`). The backend and the `game` column take any text,
so **only the hard-coded game lists change**. In each, add `{Title}` to the list
(keep the existing order, append the new one before any trailing "Conventions"
note):

| File | What to change |
|---|---|
| `.claude/skills/event-add/SKILL.md` | the fixed list under `### 6. Games` (`> Call of Duty, Halo, CS2, …`) |
| `.claude/skills/event-json-builder/reference/schemas.md` | the list under `## Games (\`game\`)` |
| `.claude/skills/usync-event-helper/SKILL.md` | the list under **Game(s)** in "Shared field rules"; also add a franchise mapping example if the title has common sub-titles (e.g. `Apex Legends Mobile → Apex Legends` only if they should map) |
| `src/db_interaction_tools/errors/image_errors.py` | `GAME_TABLE` (not enforced today, kept in sync) |

Before editing, grep the repo for `Rocket League, Valorant, Warzone` and
`"Warzone"` (excluding `docs/events/*.json`, which is data) in case a new list
has appeared, and update any you find.

Committing:
1. `git -C C:\Users\jakeb\uSync\db_interaction_tools status --short`.
2. If any of the files above **already had uncommitted changes, or were
   untracked (`??`), before you edited them**, don't commit — make the edits, and tell the user those files
   also hold other unsaved work, so the game-list change is left uncommitted for
   them to commit with it.
3. Otherwise create `feature/add-{slug}-game` there, commit only those files
   (`Add {Title} to the event tools' game list`), and **ask before pushing or
   opening a PR** — that repo has no PR skill.
