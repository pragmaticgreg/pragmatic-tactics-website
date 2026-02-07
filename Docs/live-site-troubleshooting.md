# Live Site Not Matching Local – Troubleshooting

Your live site is **Firebase Hosting** (project: `pragmatic-tactics-site`). Updates get there in one of two ways:

1. **Automatically** – GitHub Actions runs **Deploy to Firebase Hosting** on every push to `main`.
2. **Manually** – Run `firebase deploy --only hosting` from your machine.

If the live site doesn’t match local, work through these steps.

---

## 1. Confirm changes are on GitHub

Pushing to GitHub is what triggers the automatic deploy. Local-only commits never go live.

```bash
git status
git log origin/main..HEAD   # commits that exist locally but not on GitHub
```

- If you see commits listed: **push first**, then wait for the deploy (or deploy manually).
- Push: `git push origin main`

---

## 2. Check GitHub Actions (auto deploy)

If the workflow fails, the live site won’t update even after a push.

1. Open: **https://github.com/pragmaticgreg/pragmatic-tactics-website/actions**
2. Open the latest **“Deploy to Firebase Hosting”** run for `main`.
3. Check:
   - **Green** – Deploy ran; if live still looks old, see **Cache** below.
   - **Red / failed** – Fix the workflow (see **Common workflow failures** below).

---

## 3. Deploy manually (bypass CI)

To put your **current local `public/`** on the live site without relying on GitHub:

```bash
# From project root
firebase deploy --only hosting --project pragmatic-tactics-site
```

You must be logged in: `firebase login` (or already logged in).  
After this, live should match what you have in `public/` locally (subject to cache).

---

## 4. Cache (browser and CDN)

Firebase Hosting uses a CDN; your browser may also cache.

- **Hard refresh:** `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows).
- **Incognito/private window:** Confirms whether it’s cache.
- **Different device/network:** Helps rule out local cache.

---

## 5. Confirm which URL is “live”

Make sure you’re checking the Firebase Hosting URL:

- Default: `https://pragmatic-tactics-site.web.app` (or `.firebaseapp.com`)
- Custom domain: whatever you configured in Firebase Hosting.

If you have an old App Engine or other URL, that’s a different deployment and won’t update when you push to this repo or run `firebase deploy --only hosting`.

---

## Common workflow failures (GitHub Actions)

The workflow needs these **repository secrets** (Repo → Settings → Secrets and variables → Actions):

- `WORKLOAD_IDENTITY_PROVIDER`
- `SERVICE_ACCOUNT_EMAIL`

If either is missing or wrong, the “Deploy to Firebase Hosting” job will fail and the live site won’t update. Set them up in Google Cloud (Workload Identity Federation for GitHub) and add the values as secrets.

---

## Quick checklist

| Check | Action |
|-------|--------|
| Changes on GitHub? | `git push origin main` if not |
| Actions passing? | GitHub → Actions → latest run |
| Need immediate update? | `firebase deploy --only hosting` |
| Still see old content? | Hard refresh, incognito, or wait a few minutes for CDN |
