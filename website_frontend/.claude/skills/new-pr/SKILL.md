---
name: new-pr
description: Open a pull request for the current work using the uSync PR template. Use when a contributor says they are done with a feature and wants to submit it for review (e.g. "make a PR", "submit this for review", "open a pull request").
---

# Open a Pull Request (uSync template)

Follow these steps in order. This skill is written for non-technical contributors — be friendly, explain what you are doing in plain language, and never assume git knowledge.

**Where PRs go:** Feature work is merged into the **`testing_environment`** branch, which is our **staging** branch. Staging is verified there before it is later promoted to `main` (production). So every PR this skill opens targets `testing_environment` as its base — never `main` directly.

## 1. Safety check: pick a valid source branch

Run `git rev-parse --abbrev-ref HEAD`. Then:
- If the branch is `main` or `master`: stop. Tell the contributor we never submit work directly from the production branch. Offer to move their changes onto a new feature branch named `feature/<short-kebab-description>` and continue from there.
- If the branch is `testing_environment`: stop. That is the staging branch we merge *into*, so we can't open a PR from it into itself. Offer to move their changes onto a new `feature/<short-kebab-description>` branch and continue from there.

## 2. Make sure the work is committed and pushed

- Run `git status`. If there are uncommitted changes, stage and commit them with a clear, plain-English message describing the feature.
- Push the branch to `origin` with upstream tracking (`git push -u origin <branch>`).

## 2b. Make the branch up to date with staging (no surprises at merge time)

- Run `git fetch origin testing_environment`, then `git merge origin/testing_environment`.
- If it merges cleanly, briefly confirm the branch is current.
- If there are conflicts, resolve them carefully, explain in plain language what you reconciled, confirm anything ambiguous with the contributor, then commit and push again.
- Only proceed to open the PR once the branch is up to date with staging and conflict-free.

## 3. Gather the two required template fields

Before opening the PR, fill in BOTH sections of the template below. Do not leave placeholders.

- **Summary + what changed** — A one or two sentence plain-English summary, followed by a bullet list of the concrete changes (which components/pages were added or edited).
- **Affected routes / pages** — Inspect the diff and `src/index.js` to list every user-facing URL this change adds or touches (e.g. `/games/valorant/lans/<event>`). If it touches a shared component used across many routes, say so and name the key ones. If genuinely none, write "None (non-route change)" and explain.

## 4. Open the PR

Use the GitHub CLI:

```bash
gh pr create --base testing_environment --title "<concise title>" --body "<filled template below>"
```

If `gh` is not available, fall back to `git push` and give the contributor the GitHub "compare & pull request" URL to click, with the filled template ready to paste.

### PR body template (fill every field)

```markdown
## Summary
<1–2 sentence plain-English summary of the feature.>

### What changed
- <change 1>
- <change 2>

## Affected routes / pages
- <url or page 1>
- <url or page 2>

## For reviewer (@matthew)
- [ ] I started this from a fresh feature branch
- [ ] I described what changed and which pages it affects above
```

## 5. After opening

- Give the contributor the PR link.
- Remind them this PR merges into **`testing_environment`** (staging), not production. After it lands and is verified on staging, staging is promoted to `main` separately.
- Remind them: Matthew will review and either **Approve** (he merges to staging) or **Request changes** (they tell Claude "address the PR review comments" and we push fixes).
- Remind them NOT to merge themselves — only Matthew merges.
