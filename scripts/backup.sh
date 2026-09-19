#!/usr/bin/env bash
# Nightly encrypted backup to Cloudflare R2 (section 19).
#
# BAK-01: encrypted before it leaves the server, with write-only credentials.
# BAK-02: failure is loud — the exit code is what the health check reads.
#
# Runs on the droplet, from /srv/st-hannah, reading that folder's .env. The
# database is sealed inside Docker (ARC-03), so the dump is taken through
# compose rather than over the network, and the upload uses the AWS CLI in a
# container, so the droplet needs nothing installed but Docker.
set -euo pipefail

STACK="${STACK_DIR:-/srv/st-hannah}"
cd "${STACK}"

# Only the values this script needs, read line by line: .env is written for
# Docker Compose, not the shell (FROM_EMAIL holds "<…>", which the shell
# cannot source).
while IFS='=' read -r key value; do
  case "${key}" in
    POSTGRES_USER|POSTGRES_DB|BACKUP_ENCRYPTION_KEY|R2_BUCKET_BACKUPS|R2_ACCOUNT_ID|R2_ACCESS_KEY_ID|R2_SECRET_ACCESS_KEY)
      export "${key}=${value}" ;;
  esac
done < ./.env

: "${POSTGRES_USER:?POSTGRES_USER is required}"
: "${POSTGRES_DB:?POSTGRES_DB is required}"
: "${BACKUP_ENCRYPTION_KEY:?BACKUP_ENCRYPTION_KEY is required}"
: "${R2_BUCKET_BACKUPS:?R2_BUCKET_BACKUPS is required}"
: "${R2_ACCOUNT_ID:?R2_ACCOUNT_ID is required}"

STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
WORKDIR="$(mktemp -d)"
DUMP="${WORKDIR}/shf-${STAMP}.dump"
ENCRYPTED="${DUMP}.gz.enc"

cleanup() { rm -rf "${WORKDIR}"; }
trap cleanup EXIT

echo "[backup] dumping"
docker compose exec -T postgres \
  pg_dump --format=custom --no-owner --no-privileges -U "${POSTGRES_USER}" "${POSTGRES_DB}" > "${DUMP}"

echo "[backup] compressing and encrypting"
gzip -c "${DUMP}" \
  | openssl enc -aes-256-cbc -pbkdf2 -salt -pass "env:BACKUP_ENCRYPTION_KEY" \
  > "${ENCRYPTED}"

# The AWS CLI in a container: nothing to install on the droplet.
upload() {
  docker run --rm -i \
    -e AWS_ACCESS_KEY_ID="${R2_ACCESS_KEY_ID}" \
    -e AWS_SECRET_ACCESS_KEY="${R2_SECRET_ACCESS_KEY}" \
    -e AWS_DEFAULT_REGION=auto \
    -v "${WORKDIR}:/backup:ro" \
    public.ecr.aws/aws-cli/aws-cli:latest s3 cp "/backup/$(basename "$1")" "$2" \
    --endpoint-url "https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com"
}

echo "[backup] uploading to r2"
upload "${ENCRYPTED}" "s3://${R2_BUCKET_BACKUPS}/daily/$(basename "${ENCRYPTED}")"

# Retention: 7 daily, 4 weekly, 12 monthly (section 19). Weekly and monthly
# copies are promoted on Sundays and on the first of the month.
if [ "$(date -u +%u)" = "7" ]; then
  upload "${ENCRYPTED}" "s3://${R2_BUCKET_BACKUPS}/weekly/$(basename "${ENCRYPTED}")"
fi

if [ "$(date -u +%d)" = "01" ]; then
  upload "${ENCRYPTED}" "s3://${R2_BUCKET_BACKUPS}/monthly/$(basename "${ENCRYPTED}")"
fi

echo "[backup] complete: $(basename "${ENCRYPTED}")"
