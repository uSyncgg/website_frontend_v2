---
name: pr-to-main
description: Owner-only. Open a pull request that promotes the current branch into main (production), after syncing with origin/main. Use when Matthew says to "PR into main", "promote to production", or "ship staging to prod". Not for regular contributors — their work goes through new-pr into testing_environment.
---

# Promote to Production (PR into main) — OWNER ONLY

This skill bypasses the normal `feature → testing_environment (staging) → main (production)` gate and opens a PR **directly into `main`**. It is reserved for the repo owner. Regular contributors must use the `new-pr` skill, which targets `testing_environment`.

## 0. Access guard — verify the operator is the owner

Run:

```bash
git config user.email
```

If the result is **not** `oconnormattc@gmail.com`:
- Stop immediately. Do not sync, do not open a PR.
- Tell the person: "This skill is owner-only. Contributor work is promoted to production by Matthew after it has been verified on `testing_environment`. Use the `new-pr` skill to open a PR into staging instead."
- End here.

Only continue past this point if the email matches exactly.

## 1. Make sure the work is committed and pushed

- Run `git rev-parse --abbrev-ref HEAD` and note the current branch (this is the branch being promoted — usually `testing_environment`).
- Run `git status`. If there are uncommitted changes, confirm with the owner what they are, then stage and commit with a clear message.
- Push the branch with upstream tracking: `git push -u origin <branch>`.

## 2. Sync with production so the PR is clean

- Run `git fetch origin main`.
- Run `git merge origin/main` to bring the current branch up to date with production.
- If it merges cleanly, confirm the branch is current with `main`.
- If there are conflicts, resolve them carefully, explain what was reconciled, and commit + push again.
- Only proceed once the branch is up to date with `main` and conflict-free.

## 3. Open the PR into main

```bash
gh pr create --base main --title "<concise title>" --body "<filled template below>"
```

If `gh` is unavailable, push the branch and provide the GitHub "compare & pull request" URL with the filled body ready to paste.

### PR body template (fill every field)

```markdown
## Summary
<1–2 sentence plain-English summary of what is being promoted to production.>

### What changed
- <change 1>
- <change 2>

## Affected routes / pages
- <url or page 1>
- <url or page 2>

## Promotion notes
- Source branch: <branch being promoted, e.g. testing_environment>
- Verified on staging: <yes/no — note what was checked>
```

## 4. After opening

- Give the owner the PR link.
- Note that this PR targets **`main` (production)** — merging it ships to prod.
