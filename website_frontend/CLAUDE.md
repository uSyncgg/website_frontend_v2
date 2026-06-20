# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Contributor Workflow (read this first)

Most changes here are made by non-technical contributors working through Claude Code. Always guide them through this loop in plain language:

1. **Branch first — always.** Never make edits on `main`. At the start of any new feature, create a branch named `feature/<short-kebab-description>`. (A hook blocks edits on `main`, and GitHub blocks direct pushes to it — so this is required, not optional.)
2. **Stay up to date.** A SessionStart hook checks whether the feature branch is behind `origin/main`. When it is, proactively merge `origin/main` in (resolving any conflicts in plain language) before doing other work. The `/new-pr` skill repeats this check right before opening the PR.
3. **Build the feature** with the contributor, editing/adding components and routes as described elsewhere in this file.
4. **Open a PR** with the `/new-pr` skill, which fills the uSync PR template (Summary + what changed, Affected routes/pages) and opens the pull request.
5. **Review gate.** Matthew (contact@usync.gg) reviews every PR and either **Approves** (he merges to `main`) or **Requests changes**. Contributors must NOT merge their own PRs.
6. **Address feedback** by reading the PR review comments (`gh pr view --comments`) and pushing fixes to the same branch; this re-triggers review.
7. **After merge,** delete the feature branch and start the loop again from step 1.

## Commands

```bash
npm start        # Dev server at http://localhost:3000
npm run build    # Production build (output: build/)
npm test         # Jest in interactive watch mode
npm test -- --testPathPattern=ComponentName  # Run a single test file
```

Linting is enforced automatically by CRA's react-scripts (ESLint with react-app preset). No separate lint command is needed.

## Architecture

This is a **Create React App** (React 19, react-scripts 5) single-page application — an esports platform aggregator covering CoD, CS2, Halo, League of Legends, Rocket League, Valorant, and Warzone.

### Routing

All 700+ routes are defined in [src/index.js](src/index.js) using React Router 7. The hierarchy follows:

```
/                   → Home
/games              → Games listing
/leagues            → Leagues listing
/lans               → LANs/Conventions listing
/tournaments        → Tournaments listing
/games/{game}/      → Game-specific section
  head-to-head/     → H2H platforms
  leagues/          → League hosts (50+ organizations)
  wagers/           → Wagering platforms
  lans/             → LAN events
  tournaments/      → Tournaments (CoD only)
/more/*             → Articles, FAQ, Contact, Verification, Event hosting
/paymentform, /checkout, /payment  → Stripe payment flow
```

When adding a new page, register its route in `src/index.js` and add the component export to `src/components/index.js`.

### Directory Structure

- **`src/pages/`** — Page-level components. Game content lives under `src/pages/Games/{GameName}/` with subdirectories per section (LeagueHosts, HeadToHead, Wagers, Lans).
- **`src/components/`** — Reusable UI components, each in its own folder with a `.module.css` file. All are re-exported from `src/components/index.js`.
- **`src/hooks/`** — Custom hooks (currently only `useCheckResize` for responsive breakpoints).
- **`src/services/`, `src/store/`, `src/utils/`** — Scaffolded but empty; intended for API calls, state, and utilities.

### Absolute Imports

`jsconfig.json` sets `baseUrl` to `src/`, so imports use:
```js
import { EventInfoCard } from 'components';
import { useCheckResize } from 'hooks/CheckResize';
```

### Key Libraries

| Purpose | Library |
|---------|---------|
| UI components | CoreUI React 5 |
| Payments | Stripe (`@stripe/react-stripe-js`) |
| Forms | react-hook-form |
| HTTP | Axios |
| Icons | react-icons |
| Auth | Auth0 |
| SEO | Custom `SeoData` component (meta/canonical) |

### Styling

CSS Modules (`.module.css`) per component, combined with CoreUI utility classes.

### Environment Variables

Configured via `.env`. The app expects:
- `REACT_APP_STRIPE_PK` — Live Stripe public key
- `REACT_APP_STRIPE_TK` — Test Stripe public key
- `REACT_APP_AUTH0_DOMAIN` — Auth0 tenant domain
- `REACT_APP_AUTH0_CLIENTID` — Auth0 client ID

### Content Pattern

Most pages are largely static content (league host listings, H2H platform info, event details) rendered through shared display components like `EventInfoCard` and `TournamentFilter`. Adding new content typically means adding a new page component under `src/pages/Games/{Game}/` and registering its route.
