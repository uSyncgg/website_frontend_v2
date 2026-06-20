# Contributing to the uSync site — plain-English guide

You don't need to know how to code or use a terminal. You just talk to Claude. Follow these five steps every time you work on something.

## Where you work
Open **https://claude.ai/code** and pick the `website_frontend_v2` repository. That's it — nothing to install.

---

## The 5 steps

### 1. Start a branch (always do this first)
Tell Claude:
> "Start a new branch called feature/<a-few-words-about-what-im-doing>"

Example: *"Start a new branch called feature/add-valorant-lan-event"*

⚠️ You can't edit the live site directly — Claude will refuse and ask you to make a branch. That's by design.

> **Heads up:** Each time you open a session on your branch, Claude automatically checks whether the live site has changed since you last worked, and updates your branch to match. If it asks you about a "conflict," just answer its questions in plain English — it's making sure two changes don't clash.

### 2. Describe what you want
Just explain it in normal words:
> "Add a new Valorant LAN event page for 'Red Bull Home Ground', happening Aug 2026 in Washington DC."

Claude will make the changes. Ask it to show you or run the site if you want to see it.

### 3. Submit it for review
When you're happy, tell Claude:
> "/new-pr"

Claude fills out the form (what changed + which pages it affects) and creates the **pull request** — that's the thing Matthew reviews. Claude will give you a link.

### 4. Wait for Matthew's review
Matthew will either:
- **Approve** ✅ — he merges it to the live site. You're done.
- **Request changes** 💬 — he leaves comments. Go to step 5.

**Do not merge it yourself.** Only Matthew puts things live.

### 5. If he requested changes
Tell Claude:
> "Address the PR review comments"

Claude reads Matthew's comments, makes the fixes, and updates the same pull request. Back to step 4.

---

## After it's merged
Tell Claude:
> "Delete my branch, I'm done with this one"

Then start over at step 1 for your next feature. 🎉

## If you get stuck
Just ask Claude what's going on in plain English — e.g. *"what branch am I on?"* or *"did my PR get created?"* — or message Matthew.
