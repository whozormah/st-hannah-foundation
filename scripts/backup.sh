#!/usr/bin/env bash
# Nightly encrypted backup to Cloudflare R2 (section 19).
#
# BAK-01: encrypted before it leaves the server, with write-only credentials.
# BAK-02: failure is loud — the exit code is what the health check reads.
set -euo pipefail

: "${DATABASE_URL:?DATABASE_URL is required}"
: "${BACKUP_ENCRYPTION_KEY:?BACKUP_ENCRYPTION_KEY is required}"
: "${R2_BUCKET_BACKUPS:?R2_BUCKET_BACKUPS is required}"

STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
WORKDIR="$(mktemp -d)"
DUMP="${WORKDIR}/shf-${STAMP}.dump"
ENCRYPTED="${DUMP}.gz.enc"

cleanup() { rm -rf "${WORKDIR}"; }
trap cleanup EXIT

echo "[backup] dumping"
pg_dump --format=custom --no-owner --no-privileges "${DATABASE_URL}" > "${DUMP}"

echo "[backup] compressing and encrypting"
gzip -c "${DUMP}" \
  | openssl enc -aes-256-cbc -pbkdf2 -salt -pass "env:BACKUP_ENCRYPTION_KEY" \
  > "${ENCRYPTED}"

echo "[backup] uploading to r2"
aws s3 cp "${ENCRYPTED}" "s3://${R2_BUCKET_BACKUPS}/daily/$(basename "${ENCRYPTED}")" \
  --endpoint-url "https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com"

# Retention: 7 daily, 4 weekly, 12 monthly (section 19). Weekly and monthly
# copies are promoted on Sundays and on the first of the month.
if [ "$(date -u +%u)" = "7" ]; then
  aws s3 cp "${ENCRYPTED}" "s3://${R2_BUCKET_BACKUPS}/weekly/$(basename "${ENCRYPTED}")" \
    --endpoint-url "https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com"
fi

if [ "$(date -u +%d)" = "01" ]; then
  aws s3 cp "${ENCRYPTED}" "s3://${R2_BUCKET_BACKUPS}/monthly/$(basename "${ENCRYPTED}")" \
    --endpoint-url "https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com"
fi

echo "[backup] complete: $(basename "${ENCRYPTED}")"
