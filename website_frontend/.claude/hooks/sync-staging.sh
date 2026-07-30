#!/usr/bin/env bash
# SessionStart hook: when a contributor opens a session on a feature branch,
# fetch the branch it merges into and tell Claude whether the branch is behind,
# so Claude can bring it up to date (and resolve conflicts in plain language)
# before any work.
#
# Most feature branches merge into testing_environment (staging). But
# account-feature/* branches are sub-work of the account-integration effort
# and merge into feature/account-integration instead, so they're compared
# against that branch rather than staging.

branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)

# Only relevant on feature branches — never auto-sync the protected branches
# (production 'main', staging 'testing_environment', or the account-integration
# root 'feature/account-integration', which is guarded by guard-branch.sh) themselves.
if [ -z "$branch" ] || [ "$branch" = "main" ] || [ "$branch" = "master" ] || [ "$branch" = "testing_environment" ] || [ "$branch" = "feature/account-integration" ]; then
  exit 0
fi

case "$branch" in
  account-feature/*)
    upstream="feature/account-integration"
    upstream_label="the account-integration root branch"
    ;;
  *)
    upstream="testing_environment"
    upstream_label="the staging branch"
    ;;
esac

# Fetch quietly. If offline / auth fails, don't block the session.
git fetch origin "$upstream" --quiet 2>/dev/null || exit 0

behind=$(git rev-list --count HEAD..origin/"$upstream" 2>/dev/null)

if [ -z "$behind" ] || [ "$behind" = "0" ]; then
  msg="Contributor is on feature branch '$branch', already up to date with origin/$upstream ($upstream_label). No sync needed."
else
  msg="Contributor is on feature branch '$branch', which is $behind commit(s) BEHIND origin/$upstream ($upstream_label). Before doing other work, proactively bring it up to date: if there are uncommitted changes, commit or stash them first, then run 'git merge origin/$upstream'. If it merges cleanly, briefly tell them their branch is now up to date. If there are merge conflicts, resolve them carefully, then explain in plain, non-technical language what you reconciled and confirm anything ambiguous with them before continuing."
fi

cat <<EOF
{"hookSpecificOutput":{"hookEventName":"SessionStart","additionalContext":"$msg"}}
EOF

exit 0
