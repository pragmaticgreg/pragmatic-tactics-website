# Phase 2: Checkout Automation (Helcim Webhooks + Entitlements)

This document outlines the next steps after the MVP embedded checkout is live. The MVP only shows **next steps** on `thank-you.html`. Phase 2 adds **automated fulfillment** and **secure access**.

## Goals

- Confirm payment server-side using Helcim webhooks.
- Create and store entitlements (license keys or time-limited download links).
- Send automated email delivery with the correct next steps.
- Add response hash validation if we begin to show sensitive data in the UI.

## Webhook flow (source of truth)

1. **Helcim sends a webhook event** to your secure endpoint when a transaction completes.
2. Your backend **verifies the webhook signature** using the Helcim Verifier Token.
3. Use the transaction ID to **pull full transaction details** from Helcim (amount, status, email).
4. Match the purchase to an `offerId`, then create an entitlement and trigger email delivery.

References:
- Helcim Webhooks: https://devdocs.helcim.com/docs/webhooks

## Required backend endpoints (Phase 2)

- `POST /api/helcim/webhook`
  - Verify signature using the `webhook-signature`, `webhook-id`, `webhook-timestamp` headers.
  - Reject requests that fail verification.
  - Call Helcim API to fetch transaction details.
  - Create order + entitlement.
  - Trigger email delivery.

- (Optional) `POST /api/checkout/validate`
  - Use the HelcimPay.js `secretToken` to validate the response hash.
  - Only required if we display sensitive content on the thank-you page.

## Data storage (recommended)

Use Firestore (or another DB) with TTL for short-lived items.

Suggested collections:
- `orders`
  - `orderId`, `offerId`, `amount`, `currency`, `buyerEmail`, `status`, `createdAt`, `helcimTransactionId`
- `entitlements`
  - `type` (`license` | `download` | `service`)
  - `offerId`, `userEmail`, `status`, `createdAt`, `expiresAt?`, `payload` (license key or download URL)
- `checkoutSessions` (optional, if validating response hashes)
  - `checkoutToken`, `secretToken`, `offerId`, `createdAt`

## Email delivery

Use an email provider (Postmark/SendGrid/Mailgun) to send transactional emails:

- **Service intake**: send intake form link and scheduling instructions.
- **Download**: send time-limited signed URL with expiration.
- **App access**: send license key and activation steps.

## Entitlement patterns

- **Download**: generate a signed URL with a short expiration window.
- **License key**: generate a unique key tied to the buyer email; store it server-side.
- **Service**: store the order and send the intake link automatically.

## Security checklist (Phase 2)

- Verify webhook signatures (HMAC with Helcim Verifier Token).
- Do not trust client-side success redirects for access.
- Do not store Helcim secrets in `public/`.
- Use HTTPS-only endpoints.
- Use least-privilege API tokens for Helcim.

