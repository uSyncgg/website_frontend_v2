#!/usr/bin/env bash
# SessionStart hook: when a contributor opens a session on a feature branch,
# fetch origin/main and tell Claude whether the branch is behind, so Claude can
# bring it up to date (and resolve conflicts in plain language) before any work.

branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)

# Only relevant on feature branches — never auto-sync the production branch itself.
if [ -z "$branch" ] || [ "$branch" = "main" ] || [ "$branch" = "master" ]; then
  exit 0
fi

# Fetch quietly. If offline / auth fails, don't block the session.
git fetch origin main --quiet 2>/dev/null || exit 0

behind=$(git rev-list --count HEAD..origin/main 2>/dev/null)

if [ -z "$behind" ] || [ "$behind" = "0" ]; then
  msg="Contributor is on feature branch '$branch', already up to date with origin/main. No sync needed."
else
  msg="Contributor is on feature branch '$branch', which is $behind commit(s) BEHIND origin/main. Before doing other work, proactively bring it up to date: if there are uncommitted changes, commit or stash them first, then run 'git merge origin/main'. If it merges cleanly, briefly tell them their branch is now up to date with the live site. If there are merge conflicts, resolve them carefully, then explain in plain, non-technical language what you reconciled and confirm anything ambiguous with them before continuing."
fi

cat <<EOF
{"hookSpecificOutput":{"hookEventName":"SessionStart","additionalContext":"$msg"}}
EOF

exit 0
