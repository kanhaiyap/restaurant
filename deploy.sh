#!/usr/bin/env bash
set -euo pipefail

# ────────────────────────────────────────────────────────────────────────────────
# Config
DOCS_DIR="docs"                      # GitHub Pages reads from /docs on main
BUILD_DIR="dist"                     # Vite build output
CNAME_DOMAIN=""                      # e.g. "example.com" if using a custom domain
REPO_NAME="restaurant"               # your repo name
# ────────────────────────────────────────────────────────────────────────────────

step() { echo -e "\n\033[1;32m▶ $*\033[0m"; }

# 0) Sanity checks
if [ ! -f package.json ]; then
  echo "Run this from the project root (package.json not found)."; exit 1
fi

# 1) Suggest correct Vite base for project pages
if [ -f vite.config.js ]; then
  if ! grep -q "base: '/${REPO_NAME}/'" vite.config.js; then
    step "Heads-up: set Vite base to '/${REPO_NAME}/' in vite.config.js"
    echo "Example:"
    echo "import { defineConfig } from 'vite'; import react from '@vitejs/plugin-react'"
    echo "export default defineConfig({ plugins: [react()], base: '/${REPO_NAME}/' })"
  fi
fi

# 2) Install + build
step "Installing deps and building"
npm ci
npm run build

# 3) SPA fallback + optional CNAME
cp "${BUILD_DIR}/index.html" "${BUILD_DIR}/404.html"
if [ -n "${CNAME_DOMAIN}" ]; then
  echo "${CNAME_DOMAIN}" > "${BUILD_DIR}/CNAME"
fi

# 4) Ensure we’re on main and repo is initialized
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  step "Initializing git repository"
  git init
  git add -A
  git commit -m "chore: init repo"
  git branch -M main
fi

CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [ "${CURRENT_BRANCH}" != "main" ]; then
  step "Switching to main"
  git checkout -B main
fi

# 5) Replace /docs with fresh build
step "Publishing ${BUILD_DIR} → ${DOCS_DIR} on main"
rm -rf "${DOCS_DIR}"
mkdir -p "${DOCS_DIR}"
# copy everything (preserve perms, delete old files)
rsync -a --delete "${BUILD_DIR}/" "${DOCS_DIR}/"

# 6) Commit and push
git add -A
if git diff --cached --quiet; then
  step "No changes to commit."
else
  COMMIT_MSG="deploy(main/docs): $(date -u +'%Y-%m-%d %H:%M:%S UTC')"
  git commit -m "${COMMIT_MSG}"
fi

# Push if origin exists
if git remote get-url origin >/dev/null 2>&1; then
  step "Pushing to origin main"
  git push -u origin main
else
  step "No 'origin' remote set. Add it then push:"
  echo "git remote add origin git@github.com:kanhaiyap/${REPO_NAME}.git"
  echo "git push -u origin main"
fi

step "Done! Enable GitHub Pages: Settings → Pages → Branch: main / Folder: docs"
echo "Your site will be at: https://kanhaiyap.github.io/${REPO_NAME}/"
