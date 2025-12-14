# Footer Restructure — New Layout

## Overview

Complete restructure of the footer layout to improve visual balance and hierarchy. The new layout centers the newsletter as the primary action, groups brand identity elements together, and places navigation columns on the right.

---

## New Layout Structure

```
┌─────────────────────────────────────────────────────────────────────┐
│                           FOOTER TOP                                │
│                                                                     │
│         [  Get practical insights...    ] [Subscribe]               │
│                                                                     │
│                  Talk is cheap. Execution isn't.                    │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                          FOOTER MIDDLE                              │
│                                                                     │
│   [Logo]                                   NAVIGATE       TOOLS     │
│   Based in Revelstoke, BC, Canada          Find Your Fit  FinDoc ↗  │
│   Remote support across Canada             Starter Proj.            │
│                                            The Foundation           │
│   [LinkedIn]                               The Process              │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                          FOOTER BOTTOM                              │
│   © 2025 Pragmatic Tactics. All rights reserved.                    │
└─────────────────────────────────────────────────────────────────────┘
```

---

## HTML — Replace Entire Footer

Remove the existing `<footer>` element and replace with:

```html
<footer class="footer" role="contentinfo">
    <div class="container">
        
        <!-- Footer Top: Newsletter + Tagline -->
        <div class="footer__top">
            <div class="footer__newsletter">
                <form class="signup-form" id="newsletter-form">
                    <div class="signup-form__input-wrapper">
                        <input 
                            type="email" 
                            placeholder="Get practical insights delivered to your inbox" 
                            class="signup-form__input"
                            id="newsletter-email"
                            required
                            autocomplete="email"
                        >
                        <i data-lucide="mail" class="signup-form__icon"></i>
                    </div>
                    <button type="submit" class="signup-form__button" id="newsletter-submit">
                        <i data-lucide="send" class="signup-form__button-icon"></i>
                        <span class="button-text">Subscribe</span>
                    </button>
                </form>
                <div id="newsletter-message" class="newsletter-message" style="display: none;"></div>
            </div>
            <p class="footer__tagline">Talk is cheap. Execution isn't.</p>
        </div>
        
        <!-- Footer Middle: Brand Block + Navigation -->
        <div class="footer__middle">
            
            <!-- Brand Block: Logo, Location, Social -->
            <div class="footer__brand">
                <a href="/" class="footer__logo-link" aria-label="Pragmatic Tactics home">
                    <img 
                        src="assets/logos/Logo - Horizontal vibrant.svg" 
                        alt="Pragmatic Tactics" 
                        class="footer__logo"
                        loading="lazy"
                    >
                </a>
                <div class="footer__location">
                    <p class="footer__location-city">Based in Revelstoke, BC, Canada</p>
                    <p class="footer__location-note">Remote support across Canada</p>
                </div>
                <div class="footer__social">
                    <a href="https://www.linkedin.com/in/greg-fortier-4ta/" class="footer__social-link" target="_blank" rel="noopener noreferrer" aria-label="Connect on LinkedIn">
                        <i data-lucide="linkedin"></i>
                    </a>
                </div>
            </div>
            
            <!-- Navigation Columns -->
            <div class="footer__nav-group">
                <!-- Navigate -->
                <div class="footer__nav">
                    <h4 class="footer__heading">Navigate</h4>
                    <ul class="footer__links">
                        <li><a href="#fit-finder">Find Your Fit</a></li>
                        <li><a href="#starter-projects">Starter Projects</a></li>
                        <li><a href="#foundation">The Foundation</a></li>
                        <li><a href="#process">The Process</a></li>
                    </ul>
                </div>
                
                <!-- Tools -->
                <div class="footer__nav">
                    <h4 class="footer__heading">Tools</h4>
                    <ul class="footer__links">
                        <li>
                            <a href="https://findoc-extractor.app" target="_blank" rel="noopener noreferrer">
                                FinDoc Extractor
                                <svg class="footer__external-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                    <polyline points="15 3 21 3 21 9"></polyline>
                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                </svg>
                            </a>
                        </li>
                        <!-- Future tools go here -->
                    </ul>
                </div>
            </div>
            
        </div>
        
        <!-- Footer Bottom: Copyright -->
        <div class="footer__bottom">
            <p class="footer__copyright">© 2025 Pragmatic Tactics. All rights reserved.</p>
        </div>
        
    </div>
</footer>
```

---

## CSS — Replace All Footer Styles

Remove all existing footer CSS (approximately lines 2823-3066 in `main.css`) and replace with:

```css
/* ============================================= */
/* FOOTER                                        */
/* ============================================= */

.footer {
    background: var(--sand-200);
    color: var(--text-secondary);
    margin-top: 80px;
}

/* ─────────────────────────────────────────────
   FOOTER TOP: Newsletter + Tagline (Centered)
   ───────────────────────────────────────────── */

.footer__top {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 48px 0 40px;
    border-bottom: 1px solid var(--sand-300);
}

/* Newsletter Form */
.footer__newsletter {
    width: 100%;
    max-width: 520px;
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
    text-align: center;
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

/* Tagline */
.footer__tagline {
    font-family: 'Fraunces', serif;
    font-size: 18px;
    font-style: italic;
    font-weight: 400;
    color: var(--charcoal-light);
    margin: 0;
    text-align: center;
}

/* ─────────────────────────────────────────────
   FOOTER MIDDLE: Brand Block + Nav Columns
   ───────────────────────────────────────────── */

.footer__middle {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 64px;
    padding: 40px 0;
    border-bottom: 1px solid var(--sand-300);
}

/* Brand Block */
.footer__brand {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
}

.footer__logo-link {
    display: inline-block;
    transition: opacity 0.3s ease;
}

.footer__logo-link:hover {
    opacity: 0.8;
}

.footer__logo {
    height: 40px;
    width: auto;
}

.footer__location {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.footer__location-city {
    font-weight: 600;
    color: var(--charcoal);
    font-size: 14px;
    margin: 0;
}

.footer__location-note {
    color: var(--charcoal-muted);
    font-size: 13px;
    margin: 0;
}

.footer__social {
    display: flex;
    gap: 12px;
    margin-top: 4px;
}

.footer__social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
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
    width: 18px;
    height: 18px;
}

/* Navigation Group (holds both nav columns) */
.footer__nav-group {
    display: flex;
    gap: 64px;
}

.footer__nav {
    display: flex;
    flex-direction: column;
    gap: 14px;
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
    display: inline-flex;
    align-items: center;
}

.footer__links a:hover {
    color: var(--clay-500);
}

/* External link icon */
.footer__external-icon {
    display: inline-block;
    margin-left: 6px;
    opacity: 0.5;
    vertical-align: middle;
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.footer__links a:hover .footer__external-icon {
    opacity: 1;
    transform: translate(2px, -2px);
}

/* ─────────────────────────────────────────────
   FOOTER BOTTOM: Copyright
   ───────────────────────────────────────────── */

.footer__bottom {
    padding: 24px 0;
}

.footer__copyright {
    font-size: 13px;
    color: var(--charcoal-muted);
    margin: 0;
    text-align: center;
}

/* ─────────────────────────────────────────────
   FOOTER RESPONSIVE
   ───────────────────────────────────────────── */

/* Tablet */
@media (max-width: 900px) {
    .footer__middle {
        flex-direction: column;
        align-items: center;
        gap: 40px;
        text-align: center;
    }
    
    .footer__brand {
        align-items: center;
    }
    
    .footer__nav-group {
        gap: 48px;
    }
    
    .footer__nav {
        align-items: center;
    }
    
    .footer__links {
        align-items: center;
    }
}

/* Mobile */
@media (max-width: 600px) {
    .footer {
        margin-top: 60px;
    }
    
    .footer__top {
        padding: 40px 0 32px;
        gap: 16px;
    }
    
    .footer__newsletter {
        max-width: 100%;
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
    
    .footer__tagline {
        font-size: 16px;
    }
    
    .footer__middle {
        padding: 32px 0;
        gap: 32px;
    }
    
    .footer__nav-group {
        flex-direction: column;
        gap: 32px;
    }
    
    .footer__bottom {
        padding: 20px 0;
    }
}
```

---

## Visual Reference

### Desktop (900px+)

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│            [  Get practical insights...    📧 ] [ ✈ Subscribe ]     │
│                                                                     │
│                   Talk is cheap. Execution isn't.                   │
│                                                                     │
│  ───────────────────────────────────────────────────────────────    │
│                                                                     │
│   [LOGO]                                       NAVIGATE     TOOLS   │
│   Based in Revelstoke, BC, Canada              Find Your Fit  FinDoc↗
│   Remote support across Canada                 Starter Proj.        │
│                                                The Foundation       │
│   [in]                                         The Process          │
│                                                                     │
│  ───────────────────────────────────────────────────────────────    │
│                                                                     │
│                © 2025 Pragmatic Tactics. All rights reserved.       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Tablet (601-900px)

```
┌─────────────────────────────────────────────┐
│                                             │
│    [ Get practical insights... ] [Sub]      │
│                                             │
│      Talk is cheap. Execution isn't.        │
│                                             │
│  ─────────────────────────────────────────  │
│                                             │
│                  [LOGO]                     │
│       Based in Revelstoke, BC, Canada       │
│       Remote support across Canada          │
│                   [in]                      │
│                                             │
│         NAVIGATE          TOOLS             │
│        Find Your Fit    FinDoc Extractor↗   │
│       Starter Projects                      │
│       The Foundation                        │
│        The Process                          │
│                                             │
│  ─────────────────────────────────────────  │
│                                             │
│     © 2025 Pragmatic Tactics...             │
│                                             │
└─────────────────────────────────────────────┘
```

### Mobile (≤600px)

```
┌───────────────────────────┐
│                           │
│  [ Get practical... 📧 ]  │
│  [    ✈ Subscribe     ]   │
│                           │
│  Talk is cheap.           │
│  Execution isn't.         │
│                           │
│  ───────────────────────  │
│                           │
│         [LOGO]            │
│  Based in Revelstoke...   │
│  Remote support...        │
│          [in]             │
│                           │
│        NAVIGATE           │
│      Find Your Fit        │
│     Starter Projects      │
│      The Foundation       │
│       The Process         │
│                           │
│         TOOLS             │
│    FinDoc Extractor ↗     │
│                           │
│  ───────────────────────  │
│                           │
│  © 2025 Pragmatic...      │
│                           │
└───────────────────────────┘
```

---

## Key Changes from Previous Layout

| Aspect | Before | After |
|--------|--------|-------|
| Newsletter position | Top right, beside logo | Centered, prominent |
| Tagline | Below logo ("Strategy is the map...") | Below newsletter, new copy |
| Tagline text | "Strategy is the map. Execution is the journey." | "Talk is cheap. Execution isn't." |
| Logo position | Top left with tagline | Middle section, left side |
| Location | Middle section, centered | Below logo in brand block |
| Social | Middle section, far right | Below location in brand block |
| Nav columns | Spread across middle | Grouped on right side |
| Overall structure | 4-column middle grid | 2-part middle (brand left, nav right) |
| Footer credit | Bottom right | Removed (simplified) |

---

## Verification Checklist

- [ ] Newsletter form is centered at top of footer
- [ ] New tagline "Talk is cheap. Execution isn't." displays below newsletter, centered, italic
- [ ] Logo, location, and LinkedIn are grouped on left side of middle section
- [ ] Navigate and Tools columns are grouped on right side of middle section
- [ ] External link icon appears on FinDoc Extractor link
- [ ] Copyright is centered at bottom
- [ ] Tablet: Everything stacks and centers
- [ ] Mobile: Newsletter input and button stack vertically
- [ ] Mobile: Nav columns stack vertically
- [ ] All hover states work (links to clay, button to clay, social to sage)
- [ ] No horizontal scrolling at any viewport width
- [ ] Divider lines between sections are visible (sand-300)

---

## Notes

- The old tagline "Strategy is the map. Execution is the journey." has been replaced
- The "Built with gruff empathy in the mountains." credit line has been removed to simplify
- If the credit line is wanted back, add it to `.footer__bottom` as a second paragraph
- Update the FinDoc Extractor URL when the production domain is ready
- The `.footer__gradient` element from the old design is no longer needed and has been removed from HTML