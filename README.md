# uSync — Website Frontend

The frontend for [usync.gg](https://usync.gg), the all-in-one hub for esports LANs, leagues, and tournaments. uSync aggregates competitive gaming events — 70+ leagues, 200+ daily tournaments, and 100+ LANs — across Call of Duty, Counter-Strike 2, Halo, League of Legends, Rocket League, and Valorant, with a map tool for finding events nearby and a verification system for event hosts.

This repo (`website_frontend_v2/website_frontend`) is a **Create React App** single-page application. It's largely maintained by non-technical contributors working through Claude Code — see [`website_frontend/COWORKER-GUIDE.md`](website_frontend/COWORKER-GUIDE.md) for the plain-language contributor workflow and [`website_frontend/CLAUDE.md`](website_frontend/CLAUDE.md) for the full technical/agent guidance.

## Getting started

```bash
cd website_frontend
npm install
npm start        # dev server at http://localhost:3000
```

Other commands (run from `website_frontend/`):

```bash
npm run build    # production build (output: build/)
npm test         # Jest in interactive watch mode
```

### Environment variables

Copy the required keys into `website_frontend/.env` (not committed):

| Variable | Purpose |
|---|---|
| `REACT_APP_STRIPE_PK` / `REACT_APP_STRIPE_TK` | Stripe live/test public keys (payment flow) |
| `REACT_APP_AUTH0_DOMAIN` / `REACT_APP_AUTH0_CLIENTID` | Auth0 tenant for authentication |
| `REACT_APP_SUPABASE_URL` / `REACT_APP_SUPABASE_PUBLISHABLE_KEY` | Supabase project for account features |

## Tech stack

React 19 (react-scripts 5) · React Router 7 · CoreUI React 5 · Stripe · Auth0 · Supabase · Axios · react-hook-form · react-leaflet · CSS Modules

## Structure

```
website_frontend/
├── src/
│   ├── index.js         # all routes are registered here
│   ├── pages/            # page-level components (Games/{Game}/{Section}, More, Payment, ...)
│   ├── components/       # reusable UI, one folder per component + .module.css
│   ├── hooks/             # custom hooks
│   └── services/, store/, utils/  # scaffolded for API calls, state, utilities
└── public/
```

Game-specific content (LANs, leagues, head-to-head platforms, wagers, tournaments) lives under `src/pages/Games/{GameName}/{Section}/`. See `website_frontend/CLAUDE.md` for the full route map and conventions.

## Contributing & deployment

Work flows `feature/* → testing_environment (staging) → main (production)`. Contributors branch off `testing_environment`, open PRs via the `/new-pr` skill, and Matthew (contact@usync.gg) reviews and merges. Promotion of staging to production is a separate, owner-driven step. Full details in [`website_frontend/CLAUDE.md`](website_frontend/CLAUDE.md).
