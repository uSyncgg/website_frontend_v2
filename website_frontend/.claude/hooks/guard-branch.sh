#!/usr/bin/env bash
# Blocks file edits while on a protected branch so contributors always work on a
# feature branch. Wired up as a PreToolUse hook in .claude/settings.json.
# Exit code 2 tells Claude Code to block the tool call and read stderr.
#
# Protected branches:
#   - main / master  → production. Blocked for everyone (promote via PR).
#   - testing_environment → staging. Blocked for contributors; the owner is
#     exempt (they legitimately prep staging), identified by git user.email.

owner_email="oconnormattc@gmail.com"

branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
email=$(git config user.email 2>/dev/null)

if [ "$branch" = "main" ] || [ "$branch" = "master" ]; then
  echo "Blocked: you are on the production branch '$branch'. Do not edit it directly. Create a feature branch first (ask: \"start a new branch called feature/<short-name>\"), then make changes." >&2
  exit 2
fi

if [ "$branch" = "testing_environment" ] && [ "$email" != "$owner_email" ]; then
  echo "Blocked: you are on the staging branch 'testing_environment'. Contributors don't edit staging directly. Create a feature branch first (ask: \"start a new branch called feature/<short-name>\"), then make changes — it will reach staging through a pull request." >&2
  exit 2
fi

exit 0
