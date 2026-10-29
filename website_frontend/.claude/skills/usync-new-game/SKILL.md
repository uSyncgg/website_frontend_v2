---
name: usync-new-game
description: Add an entirely new game title to usync.gg — game page, Leagues/LANs/Wagers/Head-to-Head pages, /games tile and genre chip, home page tile, navbar, LAN map, sign-up and profile game picker, SEO/sitemap/redirects, and the game list in the db_interaction_tools event skills. Walks the user through a Text section then an Images section. Trigger on "/usync-new-game", "add a new game", or "add <title> to the site".
---

# Add a New Game to uSync

This skill adds a brand-new game title to the site, the same way Call of Duty
(`/games/call-of-duty`) and the other six titles are set up. It runs as a
**step-by-step interview** — Text section first, Images section second — and
only then edits files.

The person running this is usually non-technical. Speak in plain language,
ask one step at a time, and never make them read code.

- Every file to edit, with exact snippets: [reference/file-map.md](reference/file-map.md)
- Image checker: `scripts/check_image.py`
- Accent color checker: `scripts/check_color.py`

---

## Step 0 — Branch

Follow the repo's Contributor Workflow (see `CLAUDE.md`). This is **not**
account work, so:

1. `git rev-parse --abbrev-ref HEAD`. If it isn't already a `feature/add-*-game`
   branch for this game, make sure the working tree is clean, then:
   `git fetch origin && git switch -c feature/add-<slug>-game origin/testing_environment && git branch --unset-upstream`
   (you can name the branch after Step 1 once you know the title).
2. Never edit on `main`, `testing_environment`, or `feature/account-integration`.

---

## Step 1 — TEXT SECTION

Show this header to the user: **"Part 1 of 2 — Game Information"**. Ask the
questions below **one at a time** (or a few related ones together), in this
order. Keep a running answer sheet.

### 1.1 Official Game Title
> What's the official title of the game? (Exactly how the publisher writes it, e.g. "Apex Legends", "Overwatch 2", "EA SPORTS FC 25")

From the title, derive (show these to the user in step 1.12, don't ask):

| Derived value | Rule | Example ("Apex Legends") |
|---|---|---|
| **Database name** | The official title, character for character. Used for the API, the `game` column on every event, the sign-up value, and the event tools. | `Apex Legends` |
| **URL slug** | lowercase, spaces → hyphens, drop anything that isn't a-z/0-9/hyphen | `apex-legends` → `/games/apex-legends` |
| **PascalName** | slug words capitalized and joined | `ApexLegends` (folder `src/pages/Games/ApexLegends/`, `ApexLegendsRoutes.js`) |
| **cssPrefix** | slug in camelCase | `apexLegends` (classes `apexLegendsGamePage`, …) |
| **Map key** | short label for the LAN map legend (only if LANs = Yes) | `Apex` |

Before going on, check the title isn't already on the site: search
`src/catalog/games.catalog.js` for the name and slug. If it exists, stop and tell
the user.

If the title is one of the **Coming Soon** games (Fortnite, Apex Legends, Super
Smash Bros / Super Smash Bros. Ultimate, Overwatch 2), note it — the skill will
remove it from the Coming Soon page automatically. Tell the user that's
happening; don't ask.

### 1.2 Genre
Read the current genres live from the `genre:` values in
`src/catalog/games.catalog.js` (today: **FPS, Battle Royale, MOBA, Sports**) and
offer them as choices, recommending the best fit:

> What genre is it? Current categories on the Games page: FPS, Battle Royale, MOBA, Sports. Pick one, or give a new one.

If they give a **new** genre, confirm the exact spelling and casing (it becomes a
filter chip, e.g. "Hero Shooter"). Tell them: the genre filter on `/games` (and
`/leagues`, `/lans`) is built from the games themselves, so adding this game is
what adds the new category — nothing else to update. Don't invent a separate
genre list.

### 1.3–1.7 Ways to Compete (Yes/No each)
Ask as one grouped question:

> For each one, answer Yes (we have events for it now) or No (show it as "Coming Soon"):
> - Leagues
> - LANs
> - Online Tournaments
> - Wagers
> - Head to Head

Rules:
- **No** → the card on the game page says Coming Soon and links to `/Comingsoon`;
  that section is hidden from the game's tile on `/games`; no page, route, or
  header image is made for it.
- **Online Tournaments — Yes is not supported by this skill.** Only Call of Duty
  has a tournaments page and it's built separately. If they say Yes, tell them:
  > Online Tournaments can't be set up with this skill yet — I'll set it to Coming Soon and flag it in the pull request so it can be built separately.
  Then treat it as **No** and remember to flag it (Step 5 and the PR summary).
- If **all four** of Leagues/LANs/Wagers/Head to Head are No, warn that the game
  page would have nothing to show but Coming Soon cards, and ask them to
  confirm before continuing.

### 1.8 PC Only?
> Is this game PC only? (Yes/No)

- Yes → the label above the title on the game page is `PC`
- No → it's `Console · Crossplay` (exactly as on the Call of Duty page; the page
  shows it in capitals automatically)

### 1.9 Search nicknames
> Any short names people would search for it by? (e.g. "apex" for Apex Legends, "ow" for Overwatch 2). Optional — say "none" to skip.

Store lowercase. Don't add the full title or the slug (those already match).

### 1.10 Accent color
> Pick an accent color for this game (a hex code like #ff4655, or describe it and I'll suggest one). It's used for the game's tile on the home page and its pins on the LAN map, so it needs to look different from the other games.

Run the checker (from the repo root `website_frontend/`):
```
python .claude/skills/usync-new-game/scripts/check_color.py "#RRGGBB"
```
It reads the colors already in use (home page tiles + LAN map) and exits
non-zero if the new color is too close to one of them. If it fails, tell the
user which game it clashes with and ask for another (suggest 2–3 options that
pass — run the checker on your suggestions first). If they describe a color,
convert it to hex, check it, and confirm.

### 1.11 Game Description / Hook — you write it, they confirm
**Don't ask the user to write this.** Draft it yourself in the same style as the
existing games, then ask them to confirm or edit. Reference (League of Legends):

> League of Legends LANs, leagues, tournaments, head-to-head, and wagers from every site on Google. Earn money playing League of Legends.

Rules for the hook: one or two sentences, names the game, lists the ways to
compete, ends with a short payoff line. It's used both as the subtext under the
title on the game page and as the page's search description.

In the same message, also draft the **search descriptions for each sub-page
answered Yes** (one sentence each, mirroring the existing ones):
- Leagues — e.g. "Counter-Strike 2 leagues to prove your CS2 talent and compete like the pros. Join a league today and win huge cash prize pools."
- LANs — e.g. "League of Legends LANs near you. Find a LAN that is closest to you on our world renown LAN map."
- Wagers — e.g. "Wagers for Counter-Strike 2 players looking to make money gaming. Play for $ and showcase your earnings."
- Head to Head — e.g. "Counter-Strike 2 XP matches. Find every provider across the globe to choose the best competition for your playstyle."

> Here's what I'd put on the page — reply "looks good" or tell me what to change.

### 1.12 Confirm the Text section
Show the full answer sheet as a table: title, database name, URL, genre (and
whether it's new), the five Ways to Compete (with Tournaments flagged if they
said Yes), PC / Console · Crossplay, nicknames, accent color, hook, sub-page
descriptions, and whether it's coming off the Coming Soon page. Get a clear "yes"
before moving to images.

---

## Step 2 — IMAGES SECTION

Show this header: **"Part 2 of 2 — Images"**.

### 2.1 Show every required image and its size FIRST
Before asking for any file, list exactly the images this game needs, based on the
Yes/No answers:

| Image | Size (px, W × H) | Needed when | Where it shows |
|---|---|---|---|
| Game Bubble | **648 × 864** (portrait) | Always | Tile on `/games`, `/leagues`, `/lans`, home page, sign-up & profile game picker, FAQ |
| Game Page Header | **1920 × 320** | Always | Banner at the top of `/games/<slug>` |
| Leagues Header | **1920 × 320** | Leagues = Yes | Banner on `/games/<slug>/leagues` |
| Wagers Header | **1920 × 320** | Wagers = Yes | Banner on `/games/<slug>/wagers` |
| Head to Head Header | **1920 × 320** | Head to Head = Yes | Banner on `/games/<slug>/head-to-head` |

Only list the rows that apply. LANs pages show the LAN map instead of a header,
so **LANs needs no header image**.

Then state the file rules once:
> Every image must be a **.webp** file, the **exact size** listed, and have a **date in the file name** (e.g. `apex-legends-icon_10.29.26.webp` or `Apex Legends Leagues Header (10.29.26).webp` — any naming style is fine as long as the date is there). Send me the **file path** on your computer for each one.

### 2.2 Ask for each image, one at a time
In the table's order, ask for the file path. For each path the user gives, run:
```
python .claude/skills/usync-new-game/scripts/check_image.py "<path>" --kind bubble|header
```
(`bubble` = 648×864, `header` = 1920×320.) The checker confirms the file exists,
ends in `.webp`, is **really** WebP inside (some existing site files are PNGs
renamed to .webp — don't accept that), is the exact size, and has a date in the
name. Quote any failure to the user in plain words, e.g.:

> That image can't be used: it's 1600 × 300, but headers need to be exactly 1920 × 320.
> That image can't be used: the file name needs a date in it (like `_10.29.26`).
> That image can't be used: it's named .webp but it's actually a PNG file — please export it as WebP.

Ask again for that same image until it passes. Don't resize, convert, or rename
the user's images yourself.

If the user pastes a URL instead of a path, tell them this skill takes files on
their computer — download it first and give the path.

### 2.3 Confirm the Images section
List each image → its file name → ✅. Get a "yes" before building.

---

## Step 3 — Build it

Work through [reference/file-map.md](reference/file-map.md) top to bottom. It
lists every file, what to add, and the order to add it in. Use the answer sheet
values everywhere — the **database name** must be identical in every place it
appears (API calls, sign-up value, LAN map, event tools).

While editing, keep each list in the same order existing games use and match the
surrounding code style. Skip every section-specific item for sections answered
No.

---

## Step 4 — Event tools (db_interaction_tools)

Events live in the database, not this repo. The backend stores `game` as plain
text and accepts any value, so **no backend change is needed** — but the event
skills in `C:\Users\jakeb\uSync\db_interaction_tools` hard-code the list of
games and must learn the new one. Follow section **"db_interaction_tools"** at
the end of the file map.

---

## Step 5 — Verify

1. Start the dev server with the preview tool (`preview_start` name
   `website-frontend`) and check `preview_logs` for compile errors or warnings
   from the files you touched. Fix any.
2. Use text checks (`get_page_text` / `read_page`) — not screenshots — on:
   - `/games` — new tile shows, genre chip present, "N Game Titles" updated
   - `/games/<slug>` — title, eyebrow (PC / Console · Crossplay), hook, the five
     Ways to Compete cards with the right Coming Soon ones
   - each Yes sub-page loads (an empty "no events" state is fine — events come later)
   - `/` home page — new tile in "Choose Your Game"
   - `/leagues` and `/lans` (if Yes) — new tile
   - `/Comingsoon` — game removed, if it was there
   - `/more/FAQ` — new bubble in Featured Games
3. Use `javascript_tool` to confirm each new header class resolves to the new
   image (`getComputedStyle(document.querySelector('.<cssPrefix>GamePage')).getPropertyValue('--bg-image')`).
4. If the sign-up page is reachable locally, confirm the new game appears in the
   game picker. Profile settings uses the same picker, so one check covers both.

---

## Step 6 — Wrap up

1. Tell the user plainly what was added and which pages to look at.
2. **Events:** tell the user (always — and immediately, at any point, if they try
   to give you events during this skill):
   > Events aren't added here. Open the internal tools folder `C:\Users\jakeb\uSync\db_interaction_tools` in Claude Code and use **/usync-event-helper** to draft each event, then **/event-add** to post it. Choose **<Database name>** as the game. You can add events before or after this page goes live — they'll appear on the site as soon as both are in place.
3. If Online Tournaments was answered Yes, remind them it was set to Coming Soon
   and is flagged for separate work.
4. Offer to open the pull request with **/new-pr** (into `testing_environment`).
   In the PR summary, include the Ways to Compete answers, the Tournaments flag if
   any, and every new route under "Affected routes/pages".
