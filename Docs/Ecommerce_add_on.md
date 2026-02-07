## Briefing package for another agent: E‑commerce + Helcim + your current architecture

### Context summary (current state)
- **Main site**: Static HTML/CSS/JS hosted on **Firebase Hosting** (marketing site, landing pages).
- **Product app(s)**: Separate web apps hosted on **Vercel** (example: **FinDoc Extractor** at `[FinDoc Extractor](https://autobooks-email-scrape-577m.vercel.app/)`), currently using a **license-key activation** flow and Vercel serverless functions.
- **Payment provider preference**: **Helcim** (you do not currently use Stripe; Stripe is not required).
- **Products you plan to sell**:
  - **Digital products** (e.g., Apps Script code, downloadable bundles, script generator access)
  - **Services** (e.g., consulting packages, paid calls, implementation services)
  - **Future**: Subscription/recurring offerings (updates/support, access to a library, etc.)

---

## Goals (what the agent must build toward)
- Add **e-commerce functionality** that supports:
  - **Checkout** (one-time purchases)
  - **Digital product delivery** (links or gated access)
  - **Service registration / purchase** (bookings/intake)
  - **Optional subscriptions** later
- Keep Helcim as the payment processor, using:
  - **Helcim Hosted Payment Pages** initially (fastest path)
  - **Helcim APIs + webhooks** when automation is needed (license issuance, gated access, subscriptions)

---

## Key architectural decision (carryover from this session)
- Prefer a **split architecture**:
  - **Marketing / SEO pages** remain on the Firebase site.
  - **Product apps / portals** (login, generators, dashboards) can live on **separate Vercel apps/subdomains**.
- Marketing pages link/redirect users into the appropriate app or portal:
  - Example: main site “Solutions” page → “Open App / Login” → Vercel app URL.

---

## Helcim integration options to brief
The agent should design for these Helcim-supported patterns:

### 1) Helcim Hosted Payment Pages (recommended MVP)
- Create a hosted checkout page per product/service.
- Embed via:
  - Link/button from your site to Helcim checkout.
- Configure:
  - **Success URL** → your site’s `/thank-you` page (and/or product app page)
  - **Cancel URL** → back to the product landing page
- Good for:
  - One-time purchases
  - Simple service payments
  - Initial validation without backend work

### 2) Helcim API + Webhooks (recommended when automating delivery/access)
- Use Helcim’s **Developer API** and/or **Recurring API** (for subscriptions).
- Use **webhooks** to confirm payment server-side and trigger:
  - License key creation
  - Entitlement creation for a user
  - Email delivery of access instructions
  - Subscription state updates (active/canceled/past-due)

Cite for the agent:
- Helcim Hosted Payment Pages: `[Helcim Hosted Payment Pages](https://www.helcim.com/hosted-payment-pages/)`
- Helcim Developer API: `[Helcim Developer API](https://www.helcim.com/developer-api/)`
- Helcim Recurring API: `[Helcim Recurring API docs](https://devdocs.helcim.com/docs/recurring-api)`

---

## Required product flows (the agent should implement/plan)

### Flow A: Buy digital product → deliver file/link
MVP delivery patterns (pick one per product):
- **A1. “Unguesable link” delivery** (fastest):
  - Host zip/script at a hard-to-guess URL on Firebase/Vercel
  - Show link on thank-you page and/or include in Helcim receipt
  - Risk: link sharing possible
- **A2. Email delivery** (moderate):
  - After payment, send an email with instructions and link
  - Can start manual, later automated via webhook
- **A3. Account-gated delivery** (best long-term):
  - Buyer logs in, entitlement is checked, downloads/generator unlocked

### Flow B: Buy access to a generator app (license key model)
- Keep the current Vercel app model:
  - User enters **license key** on app landing, app validates via backend
- E-commerce on main site:
  - After checkout, user gets a license key
  - Redirect to Vercel app to activate
- License issuance options:
  - Manual issuance (very early)
  - Automated issuance via webhook → store valid keys → email/thank-you display

### Flow C: Service purchase / registration
- Buyer pays for a service (fixed price or deposit).
- After payment:
  - Redirect to an intake form or scheduling link
  - Create a “service order” record for internal tracking (optional at MVP)

### Flow D: Subscription (future)
- Use Helcim recurring plans.
- Webhooks update subscription status → unlock/lock features in portal/app.

---

## Login / customer portal requirements (on main site)
If you want logged-in documentation and a customer portal on the Firebase site:
- Use **Firebase Auth** for login (email/password or magic link).
- Use **Firestore** (or another DB) for:
  - Customer profile
  - Purchased entitlements
  - Tasks / portal content
- Important note for the agent:
  - **Static HTML gating is not true protection**; sensitive gated content should be fetched from Firestore/Storage after auth.

---

## Data model the agent should plan for (minimum viable)
- **Products**
  - `id`, `name`, `type` (digital/service/subscription), `price`, `helcim_payment_page_id/url`
- **Orders**
  - `orderId`, `productId`, `amount`, `currency`, `buyerEmail`, `status`, `createdAt`, `helcimTransactionId`
- **Entitlements / Licenses**
  - Either:
    - `licenseKey`, `productId`, `status`, `issuedToEmail`, `issuedToUserId`, `createdAt`, `expiresAt?`
  - Or:
    - `userId`, `productId`, `status`, `activeUntil?`
- **Subscriptions (future)**
  - `userId/email`, `planId`, `status`, `renewalDate`, `helcimSubscriptionId`

---

## Hosting + deployment expectations
- **Firebase site**:
  - Add new landing pages (solutions, product pages, thank-you pages)
  - Link to Helcim checkout pages
  - Optionally host digital downloads (or host them in the product app)
- **Backend for automation** (when needed):
  - Either Firebase Cloud Functions or Vercel serverless functions
  - Must store Helcim secrets securely (env vars)
  - Must verify webhook signatures (or equivalent Helcim verification) before granting access

---

## Non-negotiable implementation notes / pitfalls to warn about
- **Do not trust client-side “success redirects” alone** for granting access.
  - Use **webhook-confirmed payment** for anything valuable.
- **Email matching** is the simplest identity bridge early:
  - Purchase email = account email
  - Later can migrate to a more robust linking method.
- **License keys** are a good transitional entitlement mechanism:
  - Works even without full login
  - Fits your existing Vercel app pattern
- **Content gating**:
  - Hide/show UI is not protection; fetch protected content from a secured data source.

---

## Specific deliverables to ask the agent for
- **Architecture proposal** (MVP → scalable):
  - Hosted payment pages first
  - Webhooks + entitlements second
  - Subscriptions third
- **Implementation plan**:
  - New pages to add on Firebase site (Solutions, Product detail, Thank-you)
  - Backend endpoints needed (webhook receiver, license generator, entitlement manager)
  - Storage choice for licenses/entitlements (Firestore recommended if using Firebase Auth)
- **Helcim setup checklist**:
  - Hosted payment pages created per product/service
  - Success/cancel URLs configured
  - Webhook endpoints configured and secured
  - Recurring plans created (if subscription phase included)
- **Security checklist**:
  - Webhook verification
  - No secrets in frontend
  - Access grants only after server-confirmed payment

---