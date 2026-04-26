#!/usr/bin/env bash
set -euo pipefail

BRANCH="${1:-main}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="${APP_DIR:-$(cd "$SCRIPT_DIR/.." && pwd)}"

echo "[deploy] App directory: $APP_DIR"
echo "[deploy] Branch: $BRANCH"

cd "$APP_DIR"

echo "[deploy] Fetching latest git changes..."
git fetch --all --prune
git checkout "$BRANCH"
git pull origin "$BRANCH"

echo "[deploy] Installing dependencies..."
if [ -f package-lock.json ]; then
  npm ci
else
  npm install
fi

echo "[deploy] Building app..."
npm run build

if [ -n "${RESTART_COMMAND:-}" ]; then
  echo "[deploy] Restarting app using RESTART_COMMAND..."
  bash -lc "$RESTART_COMMAND"
elif command -v pm2 >/dev/null 2>&1; then
  PM2_APP_NAME="${PM2_APP_NAME:-ghogare-farms}"
  echo "[deploy] Restarting app with PM2 (name: $PM2_APP_NAME)..."
  if pm2 describe "$PM2_APP_NAME" >/dev/null 2>&1; then
    pm2 reload "$PM2_APP_NAME" --update-env
  else
    pm2 start npm --name "$PM2_APP_NAME" -- start
  fi
elif command -v systemctl >/dev/null 2>&1 && [ -n "${SYSTEMD_SERVICE:-}" ]; then
  echo "[deploy] Restarting systemd service: $SYSTEMD_SERVICE"
  sudo systemctl restart "$SYSTEMD_SERVICE"
else
  echo "[deploy] No restart method configured."
  echo "[deploy] Set RESTART_COMMAND, PM2_APP_NAME, or SYSTEMD_SERVICE on the server."
fi

echo "[deploy] Deployment completed successfully."
