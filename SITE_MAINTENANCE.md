# Pragmatic Tactics Website – Maintenance & Workflow Guide

This document collects the essential day-to-day steps for editing the existing site, adding new pages or assets, and planning future enhancements.  Keep it alongside the codebase for quick reference.

---
## 1 · Local editing & preview

1. **Open the project in Cursor** (or any editor).
2. **Run a static dev server** from the project root:

   ```bash
   # vanilla Python – already on macOS
   python3 -m http.server 8080 --directory public

   # or, auto-reloading alternative (installs per-run)
   npx live-server public
   ```

3. Navigate to `http://localhost:8080`.
4. Edit files inside `public/…` (or in `src/` if you introduce a build step).  The browser refreshes on save if you use *live-server*.

---
## 2 · Updating an existing page

1. Find the HTML file in `public/` (e.g. `public/index.html`).
2. Make your content / style edits.
3. **Test locally** (links, images, console).
4. Commit & push:

   ```bash
   git add public/index.html
   git commit -m "Update copy on home page"
   git push
   ```

5. GitHub Actions automatically deploys to Firebase Hosting (<5 min).  Watch the *Actions* tab for the green check-mark.

---
## 3 · Adding a new page

1. Duplicate an existing page as a starting point or create a fresh `.html` file inside `public/`.
2. Place any page-specific images in `public/assets/images/` (SVGs, PNGs, etc.).
3. Update internal links / navigation (see §4).
4. Preview locally → commit → push → ship (same as above).

**SEO tip:** use lowercase, hyphenated filenames (`new-feature.html`) and add a `<title>` + description meta tag.

---
## 4 · Editing the site navigation

The top nav lives in every page's `<nav>` block (currently hard-coded).  When you add or rename pages:

1. Open each HTML file that should display the link (start with `public/index.html`).
2. Inside `<ul class="nav-links">` edit `<a class="nav-link" href="…">` elements.
3. Keep paths relative (e.g. `href="/services.html"`).
4. Test on the local server across mobile & desktop widths.

*Future refactor*: move nav into a reusable HTML partial and include it with a static-site generator (see §7).

---
## 5 · Branches, previews & rollbacks

• **Quick edit?** commit directly to `main` – CI deploys in minutes.  
• **Bigger feature?** create a branch:

```bash
git checkout -b feature/blog-section
# …work…
git push -u origin feature/blog-section
```

If you enable *Firebase Preview Channels* later, each pull request will get its own temporary URL (e.g. `feature-blog--site.web.app`).

To rollback a bad deploy, simply `git revert <commit>` and push.

---
## 6 · Custom-domain management

DNS lives at Namecheap:
* `@` (A) ➜ `199.36.158.100` (plus any extra A records Firebase lists)  
* `www` (CNAME) ➜ `ghs.googlehosted.com`

Certificates renew automatically.  To add more sub-domains, use Firebase Console → Hosting → **Add custom domain**.

---
## 7 · Future-proof additions (road-map recap)

A condensed checklist extracted from *Website Hosting Strategy.md*:

| Phase | Feature | Notes |
|-------|---------|-------|
| 1 | **Static-site generator** (Eleventy / Astro) | Author markdown/MDX in `src/posts`, build into `public/`. |
| 2 | **Blog & RSS** | Auto-generate pages, tags, and RSS feed during build. |
| 3 | **Authentication** | Add Firebase Auth UI for gated resources or a client portal. |
| 4 | **Serverless functions / APIs** | Cloud Functions or Cloud Run behind `/api/**` rewrite. |
| 5 | **CMS integration** | Lightweight headless CMS (e.g. Netlify CMS) storing markdown in Git. |
| 6 | **Analytics** | Enable GA4 in Firebase → add the script tag; remember cookie notice requirements. |
| 7 | **Performance budgets** | Lighthouse CI Action to fail builds if scores regress. |

Keep this file updated as the project evolves.

---
## 8 · Handy CLI snippets

| Task | Command |
|------|---------|
| List Firebase deploy history | `firebase hosting:channel:list` |
| Emulate Hosting locally (respecting rewrites/headers) | `firebase serve --only hosting` |
| Generate a new CI token | `firebase login:ci` |
| Clear local dev-server cache | Hard-refresh (⌘-Shift-R) or incognito |

---
*Last updated: June 24 2025* 