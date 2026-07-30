---
name: new-pr-accounts
description: Open a pull request from the current branch into feature/account-integration, the integration branch for the account-integration effort. Use when a contributor working on account-integration sub-work says they are done and wants to submit it for review (e.g. "make a PR for accounts", "submit this to account-integration").
---

# Open a Pull Request into feature/account-integration

`feature/account-integration` is the **root branch for the whole account-integration effort** — a large, multi-part initiative. Instead of merging small pieces straight into `testing_environment`, sub-work merges into `feature/account-integration` first; that branch is later promoted to `testing_environment` (and eventually `main`) as one unit, once the integration is complete. That later promotion is a separate, owner-driven step and is **not** part of this skill.

Follow these steps in order. This skill is written for non-technical contributors — be friendly, explain what you are doing in plain language, and never assume git knowledge.

## 1. Safety check: pick a valid source branch

Run `git rev-parse --abbrev-ref HEAD`. Then:
- If the branch is `main`, `master`, or `testing_environment`: stop. Explain we never submit account-integration work directly from a production/staging branch. Offer to move their changes onto a new branch (e.g. `feature/<short-kebab-description>`) branched off `feature/account-integration`, then continue from there.
- If the branch is `feature/account-integration` itself: stop. That is the integration branch we merge *into*, so we can't open a PR from it into itself. Offer to move their changes onto a new feature branch based on `feature/account-integration` and continue from there.

## 2. Make sure the work is committed and pushed

- Run `git status`. If there are uncommitted changes, stage and commit them with a clear, plain-English message describing the piece of account-integration work.
- Push the branch to `origin` with upstream tracking (`git push -u origin <branch>`).

## 2b. Make the branch up to date with feature/account-integration (no surprises at merge time)

- Run `git fetch origin feature/account-integration`, then `git merge origin/feature/account-integration`.
- If it merges cleanly, briefly confirm the branch is current.
- If there are conflicts, resolve them carefully, explain in plain language what you reconciled, confirm anything ambiguous with the contributor, then commit and push again.
- Only proceed to open the PR once the branch is up to date with `feature/account-integration` and conflict-free.

## 3. Gather the two required template fields

Before opening the PR, fill in BOTH sections of the template below. Do not leave placeholders.

- **Summary + what changed** — A one or two sentence plain-English summary of this piece of the account-integration work, followed by a bullet list of the concrete changes (which components/pages were added or edited).
- **Affected routes / pages** — Inspect the diff and `src/index.js` to list every user-facing URL this change adds or touches. If it touches a shared component used across many routes, say so and name the key ones. If genuinely none, write "None (non-route change)" and explain.

## 4. Open the PR

Use the GitHub CLI:

```bash
gh pr create --base feature/account-integration --title "<concise title>" --body "<filled template below>"
```

If `gh` is not available, fall back to `git push` and give the contributor the GitHub "compare & pull request" URL to click, with the filled template ready to paste.

### PR body template (fill every field)

```markdown
## Summary
<1–2 sentence plain-English summary of this piece of account-integration work.>

### What changed
- <change 1>
- <change 2>

## Affected routes / pages
- <url or page 1>
- <url or page 2>

## For reviewer (@matthew)
- [ ] I started this from a branch based on feature/account-integration
- [ ] I described what changed and which pages it affects above
```

## 5. After opening

- Give the contributor the PR link.
- Remind them this PR merges into **`feature/account-integration`**, the integration root for this effort — not `testing_environment` or `main` directly. Once the whole integration is ready, Matthew promotes `feature/account-integration` onward separately.
- Remind them: Matthew will review and either **Approve** (he merges into `feature/account-integration`) or **Request changes** (they tell Claude "address the PR review comments" and we push fixes).
- Remind them NOT to merge themselves — only Matthew merges.
