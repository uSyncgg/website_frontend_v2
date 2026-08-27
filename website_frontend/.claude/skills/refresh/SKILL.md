---
name: refresh
description: Sync in-progress uSync work between the user's devices (Windows PC and MacBook) through GitHub. Parks unfinished work as a pushed WIP commit when leaving a device, and restores it into the working tree when arriving at the other one. Trigger on "/refresh", "sync my work", "pick up where I left off", "get my laptop work", or when switching machines.
---

# Refresh — move in-progress work between your PC and your MacBook

This skill is the hand-off between the two machines you work on. GitHub is the
courier: **work that has not been pushed does not exist on the other device.**
That is the single rule this whole skill is built around.

You are talking to a non-technical contributor. Explain every step in plain
language and never assume git knowledge.

## The two modes

`/refresh` is one command that does whichever of these fits the situation:

| Mode | When | What it does |
|---|---|---|
| **Park** | You have unfinished edits on the machine you're sitting at | Bundles them into a WIP commit and pushes it, so the other machine can see it |
| **Resume** | The other machine pushed work you don't have yet | Pulls it down and unpacks the WIP commit back into loose, editable files |

Usually a session does **Resume** (you just sat down) and then **Park** (you're
getting up). Both can happen in one `/refresh` run — resume the other device's
work, then park nothing if there's nothing to park.

---

## Step 1 — Read the situation before touching anything

Run these and read them together:

```bash
git rev-parse --abbrev-ref HEAD
git status --porcelain
git fetch --all --prune
git for-each-ref --sort=-committerdate refs/remotes/origin --format='%(committerdate:relative) | %(refname:short) | %(authorname) | %(subject)'
```

From that, work out:

- **Does this device have uncommitted work?** (`git status --porcelain` non-empty)
- **Is the remote ahead of us?** `git rev-list --count HEAD..@{upstream}` (if the
  branch has an upstream)
- **Is there a branch on `origin` that isn't checked out here at all?** That's the
  most common shape of "the work I did on my laptop" — a whole branch this
  machine has never seen.
- **Is the tip of the remote branch a parked WIP commit?** Its subject starts with
  `WIP [refresh]`.

Tell the contributor what you found in one short paragraph before you act. If
you found nothing new anywhere, say so plainly — do **not** invent work or
rebuild something from scratch to fill the gap. Missing work means it was never
pushed, and the fix is on the other machine (see *When there's nothing to pull*).

---

## Step 2 — Resume (bring the other device's work here)

Do this part first whenever the remote has something this machine lacks.

### 2a. If this device has its own uncommitted changes

Park them first (Step 3) or, if the contributor doesn't want them pushed yet,
`git stash push -u -m "before refresh"` and tell them clearly that the stash
**stays on this machine** and you'll restore it right after. Never discard
uncommitted work to make a pull succeed — no `git checkout .`, no
`git reset --hard`, no `git clean`.

### 2b. Get onto the right branch

- **Branch already checked out here:** `git pull --ff-only` if possible.
  If that fails because both sides moved, use `git pull --no-rebase` (a merge)
  and resolve conflicts in plain language — see Step 4.
- **Branch exists only on `origin`:** `git checkout -b <branch> origin/<branch>`.
  Say which branch you're switching to and what's on it.
- **Several branches have new work:** list them with their last commit subject
  and date, and ask which one they want to pick up. Don't guess.

### 2c. Unpack a parked WIP commit

If the tip commit's subject starts with `WIP [refresh]`, that's a parcel from the
other device, not real history. Unwrap it so the files become editable again:

```bash
git log -1 --format='%s%n%n%b'      # show them what was parked, and from where
git reset --soft HEAD~1             # commit disappears, all its changes return as pending edits
git restore --staged .              # leave them unstaged, exactly as they were before parking
```

After this, `git status` should look the way it looked on the other machine when
they walked away. Confirm that to them.

**Important:** the WIP commit is now gone locally but still on `origin`. The next
Park will force-update the branch (Step 3d) — that is expected and safe here
because a `WIP [refresh]` commit is never real history that anyone else builds on.

### 2d. Re-sync the environment, not just the files

Files aren't the whole story. Check and act:

- If `package-lock.json` or `package.json` changed in what you pulled, run
  `npm install` — otherwise the dev server may fail in confusing ways.
- `.env` is git-ignored and **never** travels between machines. If the pull added
  code reading a new `REACT_APP_*` variable, tell the contributor they need to add
  it to this machine's `.env` by hand, and name the variable.
- Never try to sync `node_modules/` or `build/`.

---

## Step 3 — Park (leave your work where the other device can get it)

### 3a. Don't park onto a protected branch

Check the branch first. `main`, `testing_environment`, and
`feature/account-integration` are protected (see [CLAUDE.md](../../../CLAUDE.md)
and the `guard-branch.sh` hook). If they're on one of those with loose changes,
stop and offer to move the work onto a proper branch first:

```bash
git checkout -b feature/<short-kebab-description>
```

Use `account-feature/<short-name>` (branched off `feature/account-integration`)
if the work is account/profile related — that's the separate side-loop in
CLAUDE.md.

### 3b. Bundle everything, including new files

```bash
git add -A
```

`-A` matters: brand-new files are the ones most often left behind, and a file
that isn't staged doesn't get pushed and doesn't reach the other machine.

Before committing, show them `git status --short` and say in one line what's
going over — e.g. "17 edited pages plus one new data file."

### 3c. Commit with a subject Resume can recognize

The subject **must** start with `WIP [refresh]` so the other device knows to
unpack it rather than treat it as finished work. Include the device name so it's
obvious where it came from.

Get the device name with `hostname` (works on both Windows and macOS).

```bash
git commit -m "WIP [refresh] from <hostname>: <short plain-English description>

Parked by /refresh. Not finished work — the other device will unpack this
back into pending edits. Do not review or merge this commit."
```

### 3d. Push it

```bash
git push -u origin <branch>
```

If the remote branch tip is itself an old `WIP [refresh]` commit that this
machine already unpacked, the push will be rejected as non-fast-forward. That is
the normal case, and the fix is:

```bash
git push --force-with-lease origin <branch>
```

Only ever force-push when the commit being replaced is a `WIP [refresh]` commit.
If it's real work by someone else, **stop** and merge instead — never force-push
over a teammate. This repo has other contributors (Matthew, Jake) pushing to
shared branches.

### 3e. Confirm the hand-off

Tell them explicitly: *"Your work is on GitHub on branch `<branch>`. On your
<other device>, open Claude Code and run `/refresh` to pick it up."*

---

## Step 4 — When the two devices conflict

If both machines edited the same file, git will report a conflict on the merge.
Handle it conversationally:

1. Name the files that clash, in plain language.
2. For each one, show what each side did — "your PC added a schema helper here,
   your MacBook renamed the same function."
3. Propose the reconciliation, and confirm anything ambiguous before writing it.
4. Never resolve by picking one side wholesale without saying so.

Then `git add` the resolved files, commit, and push.

---

## When there's nothing to pull

If the contributor says they did work on the other device but `git fetch` shows
nothing new, the work was never pushed. Say that directly — don't rebuild it from
scratch and don't assume it's lost.

Tell them: on the other machine, open the project in Claude Code and run
`/refresh`, which will park and push it. Then run `/refresh` here again.

If they no longer have access to that machine, the work is only in that
machine's working folder — it is not recoverable from here.

---

## Guardrails

- **Never** run `git reset --hard`, `git checkout .`, `git clean`, or
  `git stash drop` to clear the way for a sync. Uncommitted work is the thing
  this skill exists to protect.
- **Never** force-push over a commit that isn't a `WIP [refresh]` commit.
- **Never** park work onto `main`, `testing_environment`, or
  `feature/account-integration`.
- A `WIP [refresh]` commit is a transport container, not a submission. When the
  feature is genuinely finished, use `/new-pr` (or `/new-pr-accounts`), which
  will want a real commit message — squash or reword the WIP commit first.
