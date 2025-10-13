#!/usr/bin/env bash
set -euo pipefail

# ────────────────────────────────────────────────────────────────────────────────
# Config (edit if needed)
REPO_SSH="git@github.com:kanhaiyap/restaurant.git"   # your repo remote
BRANCH_PAGES="gh-pages"                               # GitHub Pages branch
BUILD_DIR="dist"                                      # Vite build output
WORKTREE_DIR=".gh-pages"                              # temp worktree folder
CNAME_DOMAIN=""                                       # e.g. "example.com" if using a custom domain
# ────────────────────────────────────────────────────────────────────────────────

# Helper: print step
step() { echo -e "\n\033[1;32m▶ $*\033[0m"; }

# 0) Sanity checks
step "Checking repo state"
if [ ! -f "package.json" ]; then
  echo "Error: Run this from your project root (package.json not found)."
  exit 1
fi

# 1) Ensure Vite base is set for GitHub Pages (/<repo>/)
#    For your repo 'restaurant', base should be '/restaurant/'.
VITE_BASE_OKAY=false
if [ -f "vite.config.js" ]; then
  if grep -q "base: '/restaurant/'" vite.config.js; then
    VITE_BASE_OKAY=true
  fi
fi

if [ "$VITE_BASE_OKAY" = false ]; then
  step "Heads-up: Set Vite base to '/restaurant/' in vite.config.js"
  echo "Example vite.config.js:"
  echo "export default defineConfig({ plugins: [react()], base: '/restaurant/' })"
  echo "Continuing anyway..."
fi

# 2) Install & Build
step "Installing deps and building (npm ci && npm run build)"
npm ci
npm run build

# SPA 404 fallback for GitHub Pages
if [ -f "${BUILD_DIR}/index.html" ]; then
  cp "${BUILD_DIR}/index.html" "${BUILD_DIR}/404.html"
fi

# Optional CNAME
if [ -n "${CNAME_DOMAIN}" ]; then
  echo "${CNAME_DOMAIN}" > "${BUILD_DIR}/CNAME"
fi

# 3) Ensure remote & gh-pages branch exist
step "Ensuring remote ${REPO_SSH} and branch ${BRANCH_PAGES}"
git remote get-url origin >/dev/null 2>&1 || git remote add origin "${REPO_SSH}"

if ! git ls-remote --exit-code --heads origin "${BRANCH_PAGES}" >/dev/null 2>&1; then
  step "Creating ${BRANCH_PAGES} branch on origin (empty orphan)"
  tmpdir="$(mktemp -d)"
  git clone --no-checkout "${REPO_SSH}" "${tmpdir}"
  pushd "${tmpdir}" >/dev/null
  git checkout --orphan "${BRANCH_PAGES}"
  rm -rf ./*
  echo "<!doctype html><meta charset=utf-8><title>Deploying…</title>" > index.html
  git add -A
  git commit -m "chore: init ${BRANCH_PAGES}"
  git push -u origin "${BRANCH_PAGES}"
  popd >/dev/null
  rm -rf "${tmpdir}"
fi

# 4) Publish dist/ via worktree
step "Preparing worktree ${WORKTREE_DIR} for ${BRANCH_PAGES}"
rm -rf "${WORKTREE_DIR}"
git worktree add --track -B "${BRANCH_PAGES}" "${WORKTREE_DIR}" "origin/${BRANCH_PAGES}"

step "Syncing ${BUILD_DIR} → ${WORKTREE_DIR}"
rsync -av --delete "${BUILD_DIR}/" "${WORKTREE_DIR}/" >/dev/null

pushd "${WORKTREE_DIR}" >/dev/null
git add -A
COMMIT_MSG="deploy: $(date -u +'%Y-%m-%d %H:%M:%S UTC')"
if git diff --cached --quiet; then
  step "No changes to deploy."
else
  step "Committing and pushing"
  git commit -m "${COMMIT_MSG}"
  git push origin "${BRANCH_PAGES}"
fi
popd >/dev/null

# 5) Cleanup (optional)
step "Cleaning up worktree"
git worktree remove "${WORKTREE_DIR}" --force >/dev/null 2>&1 || true
rm -rf "${WORKTREE_DIR}" || true

# 6) Done
REPO_OWNER="kanhaiyap"
REPO_NAME="restaurant"
echo -e "\n\033[1;32m✅ Deployed!\033[0m"
echo "Live URL (after Pages is enabled): https://${REPO_OWNER}.github.io/${REPO_NAME}/"
echo "If first time, enable Pages: GitHub → Repo → Settings → Pages → Source: gh-pages"
