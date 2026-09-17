#!/usr/bin/env bash
# The content, ready for the production database (go-live runbook, Step 7).
#
# The development database also holds everything the test suite has ever
# written: hundreds of synthetic applications, offers and messages, the five
# test staff accounts and their sessions. None of that may reach production.
# So the dump is restored into a throwaway database, emptied of everything
# that is not content, and dumped again.
set -euo pipefail

SOURCE_CONTAINER="${SOURCE_CONTAINER:-shf-dev-pg}"
SOURCE_USER="${SOURCE_USER:-shf}"
SOURCE_DB="${SOURCE_DB:-shf}"
OUT_DIR="${OUT_DIR:-$(pwd)/production-export}"
CONTAINER="shf-export-$$"
PORT="${EXPORT_PORT:-55441}"
WORKDIR="$(mktemp -d)"

cleanup() {
  docker rm -f "${CONTAINER}" >/dev/null 2>&1 || true
  rm -rf "${WORKDIR}"
}
trap cleanup EXIT

mkdir -p "${OUT_DIR}"

echo "[export] copying the development database"
docker exec "${SOURCE_CONTAINER}" pg_dump --format=custom --no-owner --no-privileges \
  -U "${SOURCE_USER}" "${SOURCE_DB}" > "${WORKDIR}/source.dump"

echo "[export] starting a throwaway database"
docker run -d --name "${CONTAINER}" \
  -e POSTGRES_USER=export -e POSTGRES_PASSWORD=export -e POSTGRES_DB=export \
  -p "${PORT}:5432" postgres:16-alpine >/dev/null

# pg_isready answers before the database itself exists, so wait on a query.
for _ in $(seq 1 90); do
  docker exec "${CONTAINER}" psql -qtAX -U export -d export -c "select 1" >/dev/null 2>&1 && break
  sleep 1
done
docker exec "${CONTAINER}" psql -qtAX -U export -d export -c "select 1" >/dev/null

# pg_restore warns about extensions it may not drop; the row counts below are
# what prove the restore.
docker exec -i "${CONTAINER}" pg_restore --no-owner --no-privileges -U export -d export \
  < "${WORKDIR}/source.dump" 2>&1 | grep -v "^pg_restore: warning" | head -5 || true

psql_in() { docker exec -i "${CONTAINER}" psql -qtAX -U export -d export "$@"; }

# Everything that is not website content. Tables are matched by name, so a
# table that does not exist here is simply skipped, and CASCADE takes each
# one's versions and relations with it.
NOT_CONTENT="support_applications in_kind_offers contact_messages volunteer_applications
  partner_enquiries beneficiaries case_notes notifications subscribers submission_files
  donations international_interest audit_log payload_preferences payload_locked_documents
  admin_users_sessions reference_counters"

echo "[export] before:"
for table in ${NOT_CONTENT}; do
  rows="$(psql_in -c "select count(*) from ${table}" 2>/dev/null || echo skip)"
  [ "${rows}" = "skip" ] || [ "${rows}" = "0" ] || echo "         ${table}: ${rows}"
done

for table in ${NOT_CONTENT}; do
  psql_in -c "truncate table ${table} restart identity cascade" >/dev/null 2>&1 || true
done

# The test staff accounts. Content records who last touched them, so those
# references are blanked first: truncating the accounts would cascade and take
# the media library and the pages with it.
psql_in -c "
do \$\$
declare r record;
begin
  for r in
    select tc.table_name, kcu.column_name, c.is_nullable
    from information_schema.table_constraints tc
    join information_schema.key_column_usage kcu on kcu.constraint_name = tc.constraint_name
    join information_schema.constraint_column_usage ccu on ccu.constraint_name = tc.constraint_name
    join information_schema.columns c on c.table_name = tc.table_name and c.column_name = kcu.column_name
    where tc.constraint_type = 'FOREIGN KEY' and ccu.table_name = 'admin_users'
  loop
    if r.is_nullable = 'YES' then
      execute format('update %I set %I = null', r.table_name, r.column_name);
    else
      execute format('delete from %I', r.table_name);
    end if;
  end loop;
  delete from admin_users;
end
\$\$;" >/dev/null

echo "[export] staff accounts left: $(psql_in -c "select count(*) from admin_users")"
echo "[export] content kept:"
for table in pages media impact_stories programmes gallery_photos video_highlights \
  campaign_stories leadership testimonials events volunteer_opportunities; do
  rows="$(psql_in -c "select count(*) from ${table}" 2>/dev/null || echo skip)"
  [ "${rows}" = "skip" ] || echo "         ${table}: ${rows}"
done

echo "[export] writing the production dump"
docker exec "${CONTAINER}" pg_dump --format=custom --no-owner --no-privileges \
  -U export export > "${OUT_DIR}/production-content.dump"

echo "[export] listing the media files"
psql_in -c "select filename from media order by filename" > "${OUT_DIR}/media-manifest.txt"

missing=0
while IFS= read -r file; do
  [ -z "${file}" ] && continue
  [ -f "media/${file}" ] || { echo "         MISSING locally: ${file}"; missing=$((missing + 1)); }
done < "${OUT_DIR}/media-manifest.txt"

echo "[export] done"
echo "         dump:     ${OUT_DIR}/production-content.dump ($(du -h "${OUT_DIR}/production-content.dump" | cut -f1))"
echo "         media:    $(wc -l < "${OUT_DIR}/media-manifest.txt" | tr -d ' ') files, ${missing} missing locally"
echo "         staff:    none — the Owner account is created on the server (Step 7)"
