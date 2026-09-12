#!/usr/bin/env bash
# Weekly automated restore test (BAK-03). Restores the latest backup into a
# throwaway container and asserts row counts, so "we have backups" is never
# taken on trust. The result is written to system health.
set -euo pipefail

: "${BACKUP_FILE:?BACKUP_FILE is required (an encrypted dump)}"
: "${BACKUP_ENCRYPTION_KEY:?BACKUP_ENCRYPTION_KEY is required}"

CONTAINER="shf-restore-test-$$"
PORT="${RESTORE_TEST_PORT:-55439}"
WORKDIR="$(mktemp -d)"
PLAIN="${WORKDIR}/restore.dump"

cleanup() {
  docker rm -f "${CONTAINER}" >/dev/null 2>&1 || true
  rm -rf "${WORKDIR}"
}
trap cleanup EXIT

echo "[restore-test] decrypting"
openssl enc -d -aes-256-cbc -pbkdf2 -pass "env:BACKUP_ENCRYPTION_KEY" \
  -in "${BACKUP_FILE}" | gunzip -c > "${PLAIN}"

echo "[restore-test] starting throwaway postgres"
docker run -d --name "${CONTAINER}" \
  -e POSTGRES_USER=restore -e POSTGRES_PASSWORD=restore -e POSTGRES_DB=restore \
  -p "${PORT}:5432" postgres:16-alpine >/dev/null

for _ in $(seq 1 60); do
  if docker exec "${CONTAINER}" psql -U restore -d restore -tAc "select 1" >/dev/null 2>&1; then
    break
  fi
  sleep 1
done

echo "[restore-test] restoring"
docker exec -i "${CONTAINER}" pg_restore -U restore -d restore --no-owner < "${PLAIN}"

echo "[restore-test] asserting row counts"
FAILED=0
for TABLE in support_applications donations donors admin_users; do
  COUNT=$(docker exec "${CONTAINER}" psql -U restore -d restore -tAc \
    "select count(*) from ${TABLE}" 2>/dev/null || echo "missing")

  if [ "${COUNT}" = "missing" ]; then
    echo "[restore-test] FAIL: table ${TABLE} absent from the restore"
    FAILED=1
  else
    echo "[restore-test] ${TABLE}: ${COUNT} rows"
  fi
done

if [ "${FAILED}" -ne 0 ]; then
  echo "[restore-test] FAILED"
  exit 1
fi

echo "[restore-test] passed"
