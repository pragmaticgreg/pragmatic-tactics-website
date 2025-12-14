# Footer CSS Revision — Pragmatic Tactics

## Problem Analysis

The current footer has styling issues:
1. The dark navy background may not be rendering correctly
2. Layout is collapsing to single-column inappropriately  
3. Elements lack proper visual grouping and hierarchy
4. The tagline floats awkwardly next to logo instead of below it
5. Middle section elements are scattered

## Solution

**No HTML changes required.** Replace the existing footer CSS (lines 2823-3066 in `main.css`) with the revised styles below.

---

## CSS — Replace Footer Styles

Find and replace everything from `.footer {` through the footer responsive media query (approximately lines 2823-3066).

```css
/* ============================================= */
/* FOOTER                                        */
/* ============================================= */

.footer {
    position: relative;
    background: var(--sand-200);
    color: var(--text-secondary);
    margin-top: 80px;
}

.footer__gradient {
    display: none; /* Remove the cyan gradient - doesn't fit sand theme */
}

/* ─────────────────────────────────────────────
   FOOTER TOP: Logo/Brand + Newsletter
   ───────────────────────────────────────────── */

.footer__top {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 48px;
    align-items: center;
    padding: 48px 0 40px;
    border-bottom: 1px solid var(--sand-300);
}

.footer__brand {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
}

.footer__logo {
    height: 44px;
    width: auto;
    transition: opacity 0.3s ease;
}

.footer__logo:hover {
    opacity: 0.8;
}

.footer__tagline {
    font-family: 'Fraunces', serif;
    font-size: 17px;
    font-style: italic;
    font-weight: 400;
    color: var(--charcoal);
    line-height: 1.4;
    margin: 0;
    max-width: 260px;
}

/* Newsletter Signup */
.footer__signup {
    width: 100%;
    max-width: 100%;
}

.signup-form {
    display: flex;
    gap: 0;
}

.signup-form__input-wrapper {
    position: relative;
    flex: 1;
}

.signup-form__input {
    width: 100%;
    padding: 14px 44px 14px 18px;
    background: var(--sand-50);
    border: 1px solid var(--sand-300);
    border-right: none;
    border-radius: 10px 0 0 10px;
    color: var(--charcoal);
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 14px;
    transition: all 0.2s ease;
}

.signup-form__input:focus {
    outline: none;
    border-color: var(--sage-600);
    background: var(--background-white);
    box-shadow: 0 0 0 3px rgba(61, 94, 89, 0.08);
}

.signup-form__input::placeholder {
    color: var(--charcoal-muted);
}

.signup-form__icon {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    width: 18px;
    height: 18px;
    color: var(--charcoal-muted);
    pointer-events: none;
}

.signup-form__button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 24px;
    background: var(--sage-800);
    color: var(--sand-50);
    border: 1px solid var(--sage-800);
    border-radius: 0 10px 10px 0;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
}

.signup-form__button:hover {
    background: var(--clay-500);
    border-color: var(--clay-500);
}

.signup-form__button:active {
    transform: scale(0.98);
}

.signup-form__button-icon {
    width: 16px;
    height: 16px;
}

.signup-form__button.loading {
    opacity: 0.7;
    cursor: not-allowed;
}

.signup-form__button.loading .button-text {
    display: none;
}

.signup-form__button.loading::after {
    content: '';
    width: 16px;
    height: 16px;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: footer-spin 1s linear infinite;
}

@keyframes footer-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.newsletter-message {
    margin-top: 12px;
    padding: 10px 14px;
    border-radius: 8px;
    font-size: 14px;
}

.newsletter-message.success {
    background: rgba(44, 74, 70, 0.08);
    color: var(--sage-800);
    border: 1px solid rgba(44, 74, 70, 0.2);
}

.newsletter-message.error {
    background: rgba(168, 99, 72, 0.08);
    color: var(--clay-700);
    border: 1px solid rgba(168, 99, 72, 0.2);
}

/* ─────────────────────────────────────────────
   FOOTER MIDDLE: Nav + Location + Social
   ───────────────────────────────────────────── */

.footer__middle {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 64px;
    align-items: start;
    padding: 40px 0;
    border-bottom: 1px solid var(--sand-300);
}

/* Navigation */
.footer__nav {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.footer__heading {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--sage-700);
    margin: 0;
}

.footer__links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.footer__links li {
    margin: 0;
    padding: 0;
}

.footer__links a {
    color: var(--charcoal);
    text-decoration: none;
    font-size: 15px;
    font-weight: 500;
    transition: color 0.2s ease;
}

.footer__links a:hover {
    color: var(--clay-500);
}

/* Location */
.footer__location {
    display: flex;
    align-items: center;
    justify-content: center;
}

.footer__location-text {
    color: var(--charcoal-light);
    font-size: 14px;
    line-height: 1.6;
    margin: 0;
    text-align: center;
}

.footer__location-text strong {
    color: var(--charcoal);
    font-weight: 600;
    display: block;
    margin-bottom: 2px;
}

/* Social */
.footer__social {
    display: flex;
    align-items: center;
    gap: 12px;
}

.footer__social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: var(--sand-300);
    border-radius: 10px;
    color: var(--charcoal-light);
    text-decoration: none;
    transition: all 0.25s ease;
}

.footer__social-link:hover {
    background: var(--sage-800);
    color: var(--sand-50);
    transform: translateY(-2px);
    box-shadow: var(--shadow-medium);
}

.footer__social-link i {
    width: 20px;
    height: 20px;
}

/* ─────────────────────────────────────────────
   FOOTER BOTTOM: Copyright + Credit
   ───────────────────────────────────────────── */

.footer__bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 0;
    font-size: 13px;
    color: var(--charcoal-muted);
}

.footer__copyright {
    margin: 0;
}

.footer__credit {
    margin: 0;
    font-style: italic;
}

.footer__legal {
    display: flex;
    gap: 20px;
}

.footer__legal-link {
    color: var(--charcoal-muted);
    text-decoration: none;
    transition: color 0.2s ease;
}

.footer__legal-link:hover {
    color: var(--clay-500);
}

/* ─────────────────────────────────────────────
   FOOTER RESPONSIVE
   ───────────────────────────────────────────── */

/* Tablet */
@media (max-width: 900px) {
    .footer__top {
        grid-template-columns: 1fr;
        gap: 32px;
        text-align: center;
    }
    
    .footer__brand {
        align-items: center;
    }
    
    .footer__tagline {
        max-width: 100%;
    }
    
    .footer__signup {
        max-width: 480px;
        margin: 0 auto;
    }
    
    .footer__middle {
        grid-template-columns: 1fr 1fr;
        gap: 40px;
    }
    
    .footer__location {
        grid-column: 1 / -1;
        order: -1;
    }
    
    .footer__nav {
        justify-self: start;
    }
    
    .footer__social {
        justify-self: end;
    }
}

/* Mobile */
@media (max-width: 600px) {
    .footer {
        margin-top: 60px;
    }
    
    .footer__top {
        padding: 40px 0 32px;
        gap: 28px;
    }
    
    .signup-form {
        flex-direction: column;
        gap: 12px;
    }
    
    .signup-form__input {
        border-radius: 10px;
        border-right: 1px solid var(--sand-300);
    }
    
    .signup-form__button {
        border-radius: 10px;
        justify-content: center;
        padding: 14px 20px;
    }
    
    .footer__middle {
        grid-template-columns: 1fr;
        gap: 32px;
        padding: 32px 0;
        text-align: center;
    }
    
    .footer__nav {
        align-items: center;
        justify-self: center;
    }
    
    .footer__links {
        align-items: center;
    }
    
    .footer__location {
        order: 0;
    }
    
    .footer__social {
        justify-self: center;
    }
    
    .footer__bottom {
        flex-direction: column;
        gap: 8px;
        text-align: center;
        padding: 20px 0;
    }
}
```

---

## HTML — One Small Addition

Add a tagline paragraph to the brand section if not already present. Your current HTML shows the tagline is already there, but make sure it has the class:

```html
<div class="footer__brand">
    <img src="assets/logos/Logo - Horizontal vibrant.svg" alt="Pragmatic Tactics" class="footer__logo" loading="lazy">
    <p class="footer__tagline">Strategy is the map. Execution is the journey.</p>
</div>
```

Also add the `.footer__credit` class to the credit line in footer bottom:

```html
<div class="footer__bottom">
    <p class="footer__copyright">© 2025 Pragmatic Tactics. All rights reserved.</p>
    <p class="footer__credit">Built with gruff empathy in the mountains.</p>
</div>
```

---

## Visual Result

### Desktop (769px+)
```
┌─────────────────────────────────────────────────────────────────────┐
│  [Sand-200 background]                                              │
│                                                                     │
│  [Logo]                              [Email input          ][Subscribe]
│  Strategy is the map.                                               │
│  Execution is the journey.                                          │
│                                                                     │
│  ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│  NAVIGATE                    Based in Revelstoke, BC           [in] │
│  Find Your Fit               Remote support across Canada           │
│  Starter Projects                                                   │
│  The Foundation                                                     │
│  The Process                                                        │
│                                                                     │
│  ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│  © 2025 Pragmatic Tactics...     Built with gruff empathy...        │
└─────────────────────────────────────────────────────────────────────┘
```

### Tablet (601-900px)
- Top section stacks (brand centered, then newsletter)
- Middle becomes 2-column (nav left, social right, location spans top)
- Bottom stays horizontal

### Mobile (≤600px)  
- Everything single column, centered
- Newsletter input and button stack vertically
- All sections centered

---

## Key Changes from Original

| Aspect | Before | After |
|--------|--------|-------|
| Background | Dark navy (`--primary-navy`) | Warm sand (`--sand-200`) |
| Text color | White with opacity | Charcoal variants |
| Gradient overlay | Cyan radial gradient | Removed |
| Newsletter button | Cyan background | Sage, hover to clay |
| Layout | Flexbox column | CSS Grid for structure |
| Tagline | Inline with logo | Below logo, italic serif |
| Social icon | Circle with rgba | Rounded square, solid colors |
| Dividers | rgba white | Sand-300 solid |
| Input/button join | Gap between | Flush (border-radius: 0) |

---

## Verification Checklist

- [ ] Footer has warm sand background (not dark navy)
- [ ] Logo and tagline stack vertically in brand area
- [ ] Newsletter input and button are flush (no gap between)
- [ ] Three distinct rows: top (brand + newsletter), middle (nav + location + social), bottom (copyright)
- [ ] Navigation links are left-aligned with "NAVIGATE" heading
- [ ] Location text is centered in middle section
- [ ] LinkedIn icon is in rounded square, not circle
- [ ] Hover states work: links turn clay, button turns clay, social icon turns sage
- [ ] Mobile: everything centers and stacks properly
- [ ] No horizontal scrolling on any viewport