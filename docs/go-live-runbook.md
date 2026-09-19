# Go-live runbook

Follow in order. **YOU** steps are for you or the Foundation; **CLAUDE** steps
are for the developer (ask Claude: *"do go-live step X"*). Copy each block as
it is and replace only the words in `CAPITALS`.

**Launched 19 September 2026.** The new site went live at
https://sthannahfoundation.org once the nameservers moved to Cloudflare
(`dale`/`josephine.ns.cloudflare.com`, registry updated 10:57 UTC). A 526 error
followed for a few minutes because Cloudflare was in Full (strict) while the
server still had its temporary certificate; set to **Full**, the site came up.
The Owner account (Glory Akinola) was created before launch. The first nightly
backup ran and was **restored** successfully the same day.

Still to do: the Cloudflare origin certificate and **Full (strict)**,
Cloudflare Access on `/admin`, Uzoma's Administrator account, the Paystack live
key, and a form test end to end.

Nothing here changes the live website until **Step 9**. Until then the
current site keeps running.

**Where things stand (checked 17 September 2026).** The live site is on
**Hostinger** (`platform: hostinger`), not Vercel, and the domain's
nameservers are Hostinger's (`ns1.dns-parking.com`). Email is Hostinger
mailboxes (`mx1`/`mx2.hostinger.com`, SPF `_spf.mail.hostinger.com`), and
**Resend is already verified** on `send.sthannahfoundation.org` with its DKIM
key. Every one of those records must survive the move, or email stops.

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
   `sthannahfoundation.org` (free plan). Cloudflare scans the current DNS
   records and lists them. **Done, 17 September 2026.**
2. In **DNS → Records**, set these to **DNS only** (click the orange cloud so
   it turns grey): `ftp`, `autoconfig`, `autodiscover` and the three
   `hostingermail-…` records. Proxying mail and FTP records breaks them.
3. Check the list holds all of these, and add any that are missing:
   `MX mx1.hostinger.com` (5), `MX mx2.hostinger.com` (10),
   `TXT v=spf1 include:_spf.mail.hostinger.com ~all`,
   `MX send → feedback-smtp.us-east-1.amazonses.com` (10),
   `TXT send → v=spf1 include:amazonses.com ~all`,
   `TXT resend._domainkey → p=MIGfMA0…`, `TXT _dmarc`, and the `A`/`AAAA`
   records with `CNAME www`.
4. **Do not change the nameservers yet.** Hostinger still answers for the
   domain, and the addresses Cloudflare scanned (`88.223.87.253`,
   `88.223.87.33`) differ from what the domain answers today
   (`77.37.83.10`, `93.127.179.113`): Hostinger's CDN rotates them. The
   nameservers change on go-live day (Step 9), when the website records point
   at the new server, so there is one switch, not two.
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

**Nothing to disconnect.** The live site is on Hostinger and is not built
from this repository, so pushing to `main` cannot disturb it. Leave the
Hostinger site running until the new one has been live for a week.

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
  -v "$PWD/media:/media:ro" public.ecr.aws/aws-cli/aws-cli:latest \
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

**YOU**, then, in Cloudflare → **DNS → Records**, with the nameservers still at Hostinger:

1. Edit the `A` record for `sthannahfoundation.org` → **SERVER_IP**,
   Proxy **on** (orange cloud). Delete the second `A` record and both
   `AAAA` records: they point at Hostinger.
2. Edit `www` → `CNAME` to `sthannahfoundation.org`, Proxy **on**.
3. Leave every mail record exactly as it is (`MX`, the SPF and DKIM `TXT`
   records, `send`, `autoconfig`, `autodiscover`, `hostingermail-…`).
4. Only now, at the registrar (Hostinger → Domains → DNS / Nameservers),
   change the nameservers to the two Cloudflare shows on its Overview page.
   The switch takes a few minutes to a few hours.

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
- [ ] **YOU:** after a week with no issues, take the old Hostinger site
      down (keep the mailboxes: email still runs there).

**If something goes wrong after Step 9:** set the `A` record back to
Hostinger's address (keep a screenshot of the records before Step 9), or
change the nameservers back to `ns1.dns-parking.com` and
`ns2.dns-parking.com`, and tell Claude.
