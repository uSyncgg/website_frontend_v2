#!/usr/bin/env bash
# SessionStart hook: when a contributor opens a session on a feature branch,
# fetch origin/testing_environment (the staging branch feature work merges into)
# and tell Claude whether the branch is behind, so Claude can bring it up to date
# (and resolve conflicts in plain language) before any work.

branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)

# Only relevant on feature branches — never auto-sync the protected branches
# (production 'main' or staging 'testing_environment') themselves.
if [ -z "$branch" ] || [ "$branch" = "main" ] || [ "$branch" = "master" ] || [ "$branch" = "testing_environment" ]; then
  exit 0
fi

# Fetch quietly. If offline / auth fails, don't block the session.
git fetch origin testing_environment --quiet 2>/dev/null || exit 0

behind=$(git rev-list --count HEAD..origin/testing_environment 2>/dev/null)

if [ -z "$behind" ] || [ "$behind" = "0" ]; then
  msg="Contributor is on feature branch '$branch', already up to date with origin/testing_environment (staging). No sync needed."
else
  msg="Contributor is on feature branch '$branch', which is $behind commit(s) BEHIND origin/testing_environment (the staging branch). Before doing other work, proactively bring it up to date: if there are uncommitted changes, commit or stash them first, then run 'git merge origin/testing_environment'. If it merges cleanly, briefly tell them their branch is now up to date with staging. If there are merge conflicts, resolve them carefully, then explain in plain, non-technical language what you reconciled and confirm anything ambiguous with them before continuing."
fi

cat <<EOF
{"hookSpecificOutput":{"hookEventName":"SessionStart","additionalContext":"$msg"}}
EOF

exit 0
