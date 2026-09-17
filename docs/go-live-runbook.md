# Go-live runbook

Follow in order. **YOU** steps are for you or the Foundation; **CLAUDE** steps
are for the developer (ask Claude: *"do go-live step X"*). Copy each block as
it is and replace only the words in `CAPITALS`.

Nothing here changes the live website until **Step 9**. Until then the
current Vercel site keeps running.

---

## Step 0 — CLAUDE: fix what would break the launch ✅ done, 17 September 2026

Found while writing this runbook and fixed before any deployment:

- [x] The production image left out `lib/`, which the CMS configuration needs:
      `npx payload migrate` on the server would have failed. **Proved fixed:**
      the image was built (389 MB) and `payload migrate:status` ran inside it,
      listing all 20 migrations.
- [x] The deploy's automatic rollback read `.previous-image`, which nothing
      wrote. It now remembers the tag that last passed its health check
      (`.last-good-image`).
- [x] The nightly backup could not reach the database, which is sealed inside
      Docker. It now dumps through compose and uploads with the AWS CLI in a
      container, so the droplet needs nothing installed but Docker. Scheduling
      it is Step 10.
- [x] `docker-compose.yml` now passes `VOLUNTEER_EMAIL`, `APPLICATIONS_EMAIL`,
      `CONTACT_EMAIL`, `R2_BUCKET_BACKUPS` and `BACKUP_ENCRYPTION_KEY`.
- [x] **Clean production export** (`scripts/production-export.sh`): the
      content without the test data. The development database held 834
      synthetic support applications, 240 in-kind offers, 229 contact
      messages, 112 beneficiaries and the 5 test staff accounts; the export
      has none of them, and keeps 116 media files, 8 programmes, 7 stories,
      61 gallery photographs, 6 videos and the homepage. Re-run it on the day,
      so the export is current.

---

## Step 1 — YOU: staff roles (legal details are done)

The Privacy Policy and Terms are filled in with the Foundation's decisions of
16 September 2026 (no lawyer; the Foundation approves them). Their effective
dates are set, and they are marked approved, on go-live day (Step 9).

**Decided, 17 September 2026:**

| Role | Who | Email |
|---|---|---|
| Owner | Glory Akinola | thesthannah@gmail.com |
| Administrator | Uzoma Udoma | uzoma.udoma@gmail.com |
| Content Manager | not yet named | — |
| Case Officer | not yet named | — |
| Finance | not yet named | — |

The accounts are created on the server at Step 7. The others can be added at
any time from the admin, under **Staff Accounts**.

---

## Step 2 — YOU: create the accounts

### 2a. Cloudflare (domain and storage)

1. Sign in at <https://dash.cloudflare.com> and **add the domain**
   `sthannahfoundation.org` (free plan). Cloudflare scans your current DNS
   records first. **Check that the records pointing at Vercel came across**
   (an `A` record for the domain and a `CNAME` for `www`) before you change
   the nameservers at your registrar; if they are missing, add them by hand
   from your registrar's list. Getting this wrong takes the current site
   down. Change nothing else yet.
2. **R2:** follow `docs/r2-setup.md`, creating **three** buckets:
   `shf-media`, `shf-private`, `shf-backups`. Create one API token with
   **Object Read & Write** on all three. Keep the **Account ID**, **Access
   Key ID** and **Secret Access Key**.

### 2b. DigitalOcean (the server)

1. <https://cloud.digitalocean.com> → **Create → Droplets**
2. Region: **London** (closest to Lagos) · Image: **Ubuntu 24.04 LTS** ·
   Size: **Basic, Regular, 1 GB / 1 CPU** · Authentication: **SSH key**
   (add your Mac's key: run `cat ~/.ssh/id_ed25519.pub` in Terminal; if it
   does not exist, run `ssh-keygen -t ed25519` first).
3. Hostname: `st-hannah-web` → **Create**. Note the **IP address**.

### 2c. Resend (email)

1. <https://resend.com> → **Domains → Add domain** →
   `sthannahfoundation.org`.
2. Add the DNS records it shows in **Cloudflare → DNS**, then **Verify**.
3. **API Keys → Create** (Sending access). Keep the key.

### 2d. Paystack (donations)

1. Dashboard → **Settings → API Keys & Webhooks** → copy the **Live Secret
   Key**. (Webhooks come with Phase 5; leave that empty.)

### 2e. GitHub (image download)

1. <https://github.com/settings/tokens> → **Generate new token (classic)** →
   scope **read:packages** only → no expiry or 1 year → copy it.

**Send to Claude securely** (a password manager share, never plain chat):
the droplet IP, R2 Account ID + keys, Resend key, Paystack live secret key,
the GitHub token.

---

## Step 3 — YOU: prepare the server

On your Mac, open Terminal:

```bash
ssh root@SERVER_IP
```

Then paste, all at once:

```bash
apt update && apt -y upgrade
adduser --disabled-password --gecos "" deploy
usermod -aG sudo deploy
mkdir -p /home/deploy/.ssh && cp ~/.ssh/authorized_keys /home/deploy/.ssh/
chown -R deploy:deploy /home/deploy/.ssh
curl -fsSL https://get.docker.com | sh
usermod -aG docker deploy
ufw allow OpenSSH && ufw allow 80 && ufw allow 443 && ufw --force enable
fallocate -l 1G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
mkdir -p /srv/st-hannah/nginx/certs && chown -R deploy:deploy /srv/st-hannah
exit
```

---

## Step 4 — YOU: HTTPS certificate

1. Cloudflare → your domain → **SSL/TLS → Overview** → set **Full (strict)**.
2. **SSL/TLS → Origin Server → Create Certificate** → keep the defaults
   (`sthannahfoundation.org`, `*.sthannahfoundation.org`, 15 years) → **Create**.
3. On your Mac, save the two boxes as files:

```bash
mkdir -p ~/shf-certs
nano ~/shf-certs/fullchain.pem   # paste "Origin Certificate", Ctrl+O Enter Ctrl+X
nano ~/shf-certs/privkey.pem     # paste "Private Key",        Ctrl+O Enter Ctrl+X
scp ~/shf-certs/*.pem deploy@SERVER_IP:/srv/st-hannah/nginx/certs/
```

---

## Step 5 — YOU: copy the deployment files and settings

From the project folder on your Mac:

```bash
cd ~/st-hannah-foundation
scp docker-compose.yml deploy@SERVER_IP:/srv/st-hannah/
scp nginx/nginx.conf nginx/proxy_params_shf deploy@SERVER_IP:/srv/st-hannah/nginx/
```

Generate three secrets (copy each output):

```bash
openssl rand -hex 32   # POSTGRES_PASSWORD
openssl rand -hex 32   # PAYLOAD_SECRET
openssl rand -hex 32   # BACKUP_ENCRYPTION_KEY — also save it in your password manager
```

Create the settings file on the server:

```bash
ssh deploy@SERVER_IP
nano /srv/st-hannah/.env
```

Paste and fill in, then Ctrl+O Enter Ctrl+X:

```
POSTGRES_USER=shf
POSTGRES_PASSWORD=PASTE_SECRET_1
POSTGRES_DB=shf
PAYLOAD_SECRET=PASTE_SECRET_2
BACKUP_ENCRYPTION_KEY=PASTE_SECRET_3

NEXT_PUBLIC_SITE_URL=https://sthannahfoundation.org

RESEND_API_KEY=PASTE_RESEND_KEY
FROM_EMAIL=St. Hannah Foundation <support@sthannahfoundation.org>
DONATION_EMAIL=support@sthannahfoundation.org
VOLUNTEER_EMAIL=support@sthannahfoundation.org
APPLICATIONS_EMAIL=support@sthannahfoundation.org
CONTACT_EMAIL=support@sthannahfoundation.org

PAYSTACK_SECRET_KEY=PASTE_PAYSTACK_LIVE_SECRET
PAYSTACK_WEBHOOK_SECRET=

R2_ACCOUNT_ID=PASTE_ACCOUNT_ID
R2_ACCESS_KEY_ID=PASTE_ACCESS_KEY_ID
R2_SECRET_ACCESS_KEY=PASTE_SECRET_ACCESS_KEY
R2_BUCKET_PUBLIC=shf-media
R2_BUCKET_PRIVATE=shf-private
R2_BUCKET_BACKUPS=shf-backups
```

Lock it down and let the server download the image:

```bash
chmod 600 /srv/st-hannah/.env
echo PASTE_GITHUB_TOKEN | docker login ghcr.io -u whozormah --password-stdin
exit
```

---

## Step 6 — YOU: let GitHub deploy to the server

On your Mac:

```bash
ssh-keygen -t ed25519 -f ~/.ssh/shf_deploy -N ""
ssh-copy-id -i ~/.ssh/shf_deploy.pub deploy@SERVER_IP
brew install gh && gh auth login
cd ~/st-hannah-foundation
gh secret set DROPLET_HOST --body "SERVER_IP"
gh secret set DROPLET_USER --body "deploy"
gh secret set DROPLET_SSH_KEY < ~/.ssh/shf_deploy
```

**Vercel — important.** Vercel redeploys the live site whenever `main`
changes. Before Step 7: Vercel → the project → **Settings → Git →
Disconnect**. The current site stays up; it just stops redeploying.

---

## Step 7 — CLAUDE + YOU: first deployment (not public yet)

1. **CLAUDE:** merge the finished work into `main`, push, and watch CI and
   Deploy go green. (DNS still points at Vercel, so visitors see nothing new.)
2. **CLAUDE:** load the content and the media files:

```bash
cd ~/st-hannah-foundation
./scripts/production-export.sh
scp production-export/production-content.dump deploy@SERVER_IP:/srv/st-hannah/

# the content
ssh deploy@SERVER_IP 'cd /srv/st-hannah && docker compose exec -T postgres \
  pg_restore --clean --if-exists --no-owner --no-privileges -U shf -d shf \
  < production-content.dump'

# the photographs and videos, straight into R2
docker run --rm -e AWS_ACCESS_KEY_ID=PASTE_ACCESS_KEY_ID \
  -e AWS_SECRET_ACCESS_KEY=PASTE_SECRET_ACCESS_KEY -e AWS_DEFAULT_REGION=auto \
  -v "$PWD/media:/media:ro" amazon/aws-cli:2 \
  s3 sync /media s3://shf-media \
  --endpoint-url https://PASTE_ACCOUNT_ID.r2.cloudflarestorage.com
```
3. **YOU:** create the Owner account — open
   `https://SERVER_IP/admin` (accept the certificate warning; it is only
   because you are not going through Cloudflare yet) and create the first
   user with the Owner's email. Then add the other staff under **Staff
   Accounts**.

---

## Step 8 — YOU: rehearse privately

Make only your Mac see the new server:

```bash
sudo sh -c 'echo "SERVER_IP sthannahfoundation.org www.sthannahfoundation.org" >> /etc/hosts'
```

Open <https://sthannahfoundation.org> (accept the certificate warning) and
check:

- [ ] Homepage: hero, event countdown, Vision & Mission, Where It All Began,
      programmes, gallery, Stories in Motion, Esther's story, stories
- [ ] A story page with gallery and videos; the Gallery page videos play
- [ ] Sign in at `/admin`; edit a word, publish, see it change
- [ ] Each form sends (use your own details), and the email arrives
- [ ] A small test donation, then refund it in Paystack

Then undo the hosts change:

```bash
sudo sed -i '' '/sthannahfoundation.org/d' /etc/hosts
```

**CLAUDE:** runs the full test suite against the server and a backup +
restore test.

---

## Step 9 — CLAUDE + YOU: go live

**CLAUDE**, first: set the Privacy Policy and Terms effective dates to today,
mark them approved, and deploy.

**YOU**, then, in Cloudflare → **DNS → Records**:

1. Edit the `A` record for `sthannahfoundation.org` → **SERVER_IP**,
   Proxy **on** (orange cloud).
2. Edit `www` → `CNAME` to `sthannahfoundation.org`, Proxy **on**.
3. Delete any remaining records that point at Vercel.

The new site is live within minutes. Open it in a private window to confirm.

---

## Step 10 — YOU + CLAUDE: after launch

- [ ] **YOU:** Cloudflare → **Zero Trust → Access → Applications → Add →
      Self-hosted**: `sthannahfoundation.org/admin`, allow only staff emails
      (SEC-02).
- [ ] **CLAUDE:** schedule the nightly backup and confirm the first one ran:

```bash
cd ~/st-hannah-foundation
scp scripts/backup.sh deploy@SERVER_IP:/srv/st-hannah/
ssh deploy@SERVER_IP 'chmod +x /srv/st-hannah/backup.sh && \
  (crontab -l 2>/dev/null; echo "15 2 * * * /srv/st-hannah/backup.sh >> /srv/st-hannah/backup.log 2>&1") | crontab -'
ssh deploy@SERVER_IP '/srv/st-hannah/backup.sh'   # run one now to prove it works
```
- [ ] **YOU:** after a week with no issues, delete the Vercel project.

**If something goes wrong after Step 9:** point the Cloudflare DNS records
back to Vercel's values (keep a screenshot of them before Step 9) and tell
Claude.
