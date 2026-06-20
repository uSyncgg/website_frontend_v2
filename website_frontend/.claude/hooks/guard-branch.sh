#!/usr/bin/env bash
# Blocks file edits while on the production branch so contributors always
# work on a feature branch. Wired up as a PreToolUse hook in .claude/settings.json.
# Exit code 2 tells Claude Code to block the tool call and read stderr.

branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)

if [ "$branch" = "main" ] || [ "$branch" = "master" ]; then
  echo "Blocked: you are on the production branch '$branch'. Do not edit it directly. Create a feature branch first (ask: \"start a new branch called feature/<short-name>\"), then make changes." >&2
  exit 2
fi

exit 0
