# Pragmatic Tactics HTML Improvements

## Implementation Brief for Developer Agent

**Project:** PragmaticTactics.com HTML & Accessibility Enhancements  
**Target Files:** `index.html` (and other HTML pages as applicable)  
**Priority:** SEO, Accessibility, and Structure improvements  
**Approach:** Incremental changes; test after each task

---

## Context

The Pragmatic Tactics website has recently received CSS styling improvements. This brief covers HTML structure enhancements to improve:

1. **SEO** — Structured data, meta tags, semantic markup
2. **Accessibility** — ARIA attributes, landmarks, keyboard navigation
3. **Performance** — Lazy loading, optimized asset references
4. **Completeness** — Footer content, social proof structure

The site uses vanilla HTML/CSS/JS. Changes should maintain compatibility with existing JavaScript functionality.

---

## Implementation Tasks

Complete each task in order. Test after each change before proceeding.

---

### Task 1: Add Skip Link for Keyboard Navigation

**Goal:** Allow keyboard users to bypass navigation and jump directly to main content.

**Location:** Immediately after opening `<body>` tag

#### 1.1 Add skip link HTML

Add this as the **first element** inside `<body>`:

```html
<body>
    <a href="#main-content" class="skip-link">Skip to main content</a>
    
    <!-- Rest of existing content -->
```

#### 1.2 Add ID to main element

Find the `<main>` element and add the ID:

```html
<main id="main-content" role="main">
```

#### 1.3 Add skip link CSS

Add to `main.css` (or inform that CSS team should add):

```css
/* Skip link for keyboard accessibility */
.skip-link {
    position: absolute;
    top: -100%;
    left: 16px;
    padding: 12px 24px;
    background: var(--sage-800);
    color: var(--sand-50);
    border-radius: 0 0 8px 8px;
    font-weight: 600;
    text-decoration: none;
    z-index: 10000;
    transition: top 0.2s ease;
}

.skip-link:focus {
    top: 0;
    outline: 3px solid var(--clay-300);
    outline-offset: 2px;
}
```

**Verification:** 
1. Load the page and press Tab key once
2. "Skip to main content" link should appear at top of page
3. Press Enter — page should scroll to main content area
4. Press Tab again — focus should be on first interactive element in main content

---

### Task 2: Improve Landmark Structure

**Goal:** Ensure proper ARIA landmarks for screen reader navigation.

#### 2.1 Update header element

```html
<header role="banner">
    <nav role="navigation" aria-label="Main navigation">
        <!-- Existing nav content -->
    </nav>
</header>
```

#### 2.2 Update main element

```html
<main id="main-content" role="main">
    <!-- Existing main content -->
</main>
```

#### 2.3 Update footer element

```html
<footer role="contentinfo">
    <!-- Existing footer content -->
</footer>
```

#### 2.4 Add aria-labelledby to major sections

For each major `<section>`, link it to its heading:

```html
<section id="hero" class="hero" aria-labelledby="hero-title">
    <h1 id="hero-title" class="hero__title">
        You don't need more strategy...
    </h1>
    <!-- Rest of hero -->
</section>

<section id="fit-finder" class="section" aria-labelledby="fit-finder-title">
    <h2 id="fit-finder-title" class="section-title">Sound Familiar?</h2>
    <!-- Rest of section -->
</section>

<section id="framework" class="section" aria-labelledby="framework-title">
    <h2 id="framework-title" class="section-title">How I Think About Your Business</h2>
    <!-- Rest of section -->
</section>

<section id="starter-projects" class="section" aria-labelledby="starter-projects-title">
    <h2 id="starter-projects-title" class="section-title">Find Your Starting Point</h2>
    <!-- Rest of section -->
</section>

<section id="foundation" class="section" aria-labelledby="foundation-title">
    <h2 id="foundation-title" class="section-title">The Pragmatic Foundation</h2>
    <!-- Rest of section -->
</section>

<section id="contact" class="section" aria-labelledby="contact-title">
    <h2 id="contact-title" class="section-title">Let's Trade Insights</h2>
    <!-- Rest of section -->
</section>

<section id="process" class="section" aria-labelledby="process-title">
    <h2 id="process-title" class="section-title">The Pragmatic Process</h2>
    <!-- Rest of section -->
</section>
```

**Note:** Match the `id` values to your actual section IDs. The pattern is:
- Section gets `aria-labelledby="[section-name]-title"`
- Heading inside gets `id="[section-name]-title"`

**Verification:** 
1. Use a screen reader (or browser accessibility inspector)
2. Navigate by landmarks — all major sections should be announced
3. Each section should announce its heading when entered

---

### Task 3: Add Schema.org Structured Data

**Goal:** Help search engines understand the business for better SEO and rich results.

**Location:** Inside `<head>`, before closing `</head>` tag

#### 3.1 Add LocalBusiness/ProfessionalService schema

```html
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Pragmatic Tactics",
    "description": "Strategic execution consulting helping small-medium businesses in trades, construction, manufacturing, and professional services turn strategy into action.",
    "url": "https://pragmatictactics.com",
    "logo": "https://pragmatictactics.com/assets/logos/Logo - Horizontal vibrant.svg",
    "image": "https://pragmatictactics.com/assets/images/Greg Fortier - Freelance business systems support 1200x72dpi.png",
    "telephone": "",
    "email": "greg@pragmatictactics.com",
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Revelstoke",
        "addressRegion": "BC",
        "addressCountry": "CA"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": 50.9981,
        "longitude": -118.1957
    },
    "areaServed": [
        {
            "@type": "GeoCircle",
            "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": 50.9981,
                "longitude": -118.1957
            },
            "geoRadius": "500000"
        },
        {
            "@type": "Country",
            "name": "Canada"
        }
    ],
    "serviceType": [
        "Business Consulting",
        "Process Optimization", 
        "Digital Transformation",
        "Operations Consulting",
        "Business Systems Implementation"
    ],
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Consulting Services",
        "itemListElement": [
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Process Audit",
                    "description": "Rapid review of core workflows to find bottlenecks and deliver a priority fix-list."
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Digital Snapshot",
                    "description": "Lightweight assessment of your tech stack to identify what's working and what isn't."
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "CRM Implementation",
                    "description": "Process-first CRM configuration and phased rollout for real adoption."
                }
            }
        ]
    },
    "founder": {
        "@type": "Person",
        "name": "Greg Fortier",
        "jobTitle": "Principal Consultant"
    },
    "priceRange": "$$",
    "openingHours": "Mo-Fr 09:00-17:00",
    "sameAs": [
        "https://www.linkedin.com/in/gregfortier/"
    ]
}
</script>
```

**Note:** 
- Update `telephone` if you want to display a phone number
- Update `email` to your actual contact email
- Update `sameAs` with any social media profile URLs
- Verify the LinkedIn URL is correct

**Verification:**
1. Use Google's Rich Results Test: https://search.google.com/test/rich-results
2. Enter your URL after deployment
3. Should show "ProfessionalService" detected with no errors

---

### Task 4: Add Open Graph & Twitter Meta Tags

**Goal:** Control how the site appears when shared on social media.

**Location:** Inside `<head>`, after existing meta tags

#### 4.1 Add Open Graph tags

```html
<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://pragmatictactics.com/">
<meta property="og:title" content="Pragmatic Tactics | Strategic Execution for Growing Businesses">
<meta property="og:description" content="Stop working IN your business. Let's work ON it. Strategic execution consulting for trades, manufacturing, and professional services across Canada.">
<meta property="og:image" content="https://pragmatictactics.com/assets/images/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="en_CA">
<meta property="og:site_name" content="Pragmatic Tactics">
```

#### 4.2 Add Twitter Card tags

```html
<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="https://pragmatictactics.com/">
<meta name="twitter:title" content="Pragmatic Tactics | Strategic Execution for Growing Businesses">
<meta name="twitter:description" content="Stop working IN your business. Let's work ON it. Strategic execution consulting for trades, manufacturing, and professional services.">
<meta name="twitter:image" content="https://pragmatictactics.com/assets/images/og-image.jpg">
```

#### 4.3 Create OG image (separate task)

**Required:** Create an image file at `assets/images/og-image.jpg`

**Specifications:**
- Dimensions: 1200 x 630 pixels
- Format: JPG (for smaller file size)
- Content suggestions:
  - Brand logo
  - Tagline: "Stop working IN your business. Let's work ON it."
  - Warm sand/sage color background matching site
  - Professional but approachable feel

**Verification:**
1. Use Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
2. Use Twitter Card Validator: https://cards-dev.twitter.com/validator
3. Enter URL and verify image/text appear correctly

---

### Task 5: Add Complete Favicon Set

**Goal:** Ensure proper icons across all devices and contexts.

**Location:** Inside `<head>`, replace any existing favicon references

#### 5.1 Add favicon link tags

```html
<!-- Favicons -->
<link rel="icon" type="image/svg+xml" href="/assets/logos/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/logos/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/logos/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/logos/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#2c4a46">
<meta name="msapplication-TileColor" content="#2c4a46">
```

#### 5.2 Create site.webmanifest file

Create a new file at root: `/site.webmanifest`

```json
{
    "name": "Pragmatic Tactics",
    "short_name": "Pragmatic",
    "description": "Strategic execution consulting",
    "icons": [
        {
            "src": "/assets/logos/android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "/assets/logos/android-chrome-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ],
    "theme_color": "#2c4a46",
    "background_color": "#fcfbf9",
    "display": "standalone",
    "start_url": "/"
}
```

#### 5.3 Required favicon files (separate asset task)

Generate these files from the logo/brand mark:

| File | Size | Format |
|------|------|--------|
| `favicon.svg` | Vector | SVG |
| `favicon-16x16.png` | 16x16 | PNG |
| `favicon-32x32.png` | 32x32 | PNG |
| `apple-touch-icon.png` | 180x180 | PNG |
| `android-chrome-192x192.png` | 192x192 | PNG |
| `android-chrome-512x512.png` | 512x512 | PNG |

**Tip:** Use https://realfavicongenerator.net/ to generate all sizes from the SVG logo.

**Verification:**
1. Check browser tab — favicon should display
2. Add site to phone home screen — icon should appear
3. No 404 errors in browser console for favicon files

---

### Task 6: Improve Contact Form Accessibility

**Goal:** Make the contact form fully accessible with proper labels, error handling structure, and autocomplete.

**Location:** Find the contact form in the HTML (in the "Let's Trade Insights" section)

#### 6.1 Replace existing form with accessible version

```html
<form class="contact-form" id="contact-form" action="YOUR_FORM_ENDPOINT" method="POST" novalidate>
    
    <!-- Name Field -->
    <div class="form-group">
        <label for="contact-name" class="form-label">
            Name 
            <span class="required" aria-hidden="true">*</span>
            <span class="visually-hidden">(required)</span>
        </label>
        <input 
            type="text" 
            id="contact-name" 
            name="name" 
            required
            autocomplete="name"
            aria-required="true"
            aria-describedby="name-hint name-error"
            placeholder="Your name"
        >
        <span id="name-hint" class="form-hint visually-hidden">Enter your full name</span>
        <span id="name-error" class="form-error" role="alert" aria-live="polite" hidden></span>
    </div>
    
    <!-- Email Field -->
    <div class="form-group">
        <label for="contact-email" class="form-label">
            Email 
            <span class="required" aria-hidden="true">*</span>
            <span class="visually-hidden">(required)</span>
        </label>
        <input 
            type="email" 
            id="contact-email" 
            name="email" 
            required
            autocomplete="email"
            aria-required="true"
            aria-describedby="email-hint email-error"
            placeholder="you@company.com"
        >
        <span id="email-hint" class="form-hint visually-hidden">Enter your email address</span>
        <span id="email-error" class="form-error" role="alert" aria-live="polite" hidden></span>
    </div>
    
    <!-- Business Type Field -->
    <div class="form-group">
        <label for="contact-business" class="form-label">
            Type of Business 
            <span class="required" aria-hidden="true">*</span>
            <span class="visually-hidden">(required)</span>
        </label>
        <select 
            id="contact-business" 
            name="business_type" 
            required
            aria-required="true"
            aria-describedby="business-error"
        >
            <option value="" disabled selected>Select your business type</option>
            <option value="trades">Trades (construction/service)</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="ecommerce">E-commerce</option>
            <option value="product">Product based</option>
            <option value="professional">Professional services</option>
            <option value="other">Other</option>
        </select>
        <span id="business-error" class="form-error" role="alert" aria-live="polite" hidden></span>
    </div>
    
    <!-- Challenge/Message Field -->
    <div class="form-group">
        <label for="contact-challenge" class="form-label">
            Tell me about your biggest challenge
        </label>
        <textarea 
            id="contact-challenge" 
            name="challenge" 
            rows="4"
            aria-describedby="challenge-hint"
            placeholder="What's keeping you up at night? What would change if you solved it?"
        ></textarea>
        <span id="challenge-hint" class="form-hint">Optional, but helps me prepare thoughtful ideas for you.</span>
    </div>
    
    <!-- Submit Button -->
    <div class="form-group form-group--submit">
        <button type="submit" class="cta-primary" id="contact-submit">
            <span class="button-text">Start the Conversation</span>
            <span class="button-loading hidden" aria-hidden="true">
                <svg class="spinner" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="31.4 31.4" />
                </svg>
                Sending...
            </span>
        </button>
    </div>
    
    <!-- Form Status Messages -->
    <div id="form-status" class="form-status" role="status" aria-live="polite" hidden>
        <p class="form-status__message"></p>
    </div>
    
    <!-- Privacy Note -->
    <p class="form-note">
        <strong>Not a subscription.</strong> This is simply a contact form to start a conversation. 
        I'll respond personally within 24 hours.
    </p>
    
</form>
```

#### 6.2 Add supporting CSS for form elements

```css
/* Form error styles */
.form-error {
    display: block;
    color: #c45a5a;
    font-size: 14px;
    margin-top: 6px;
}

.form-error[hidden] {
    display: none;
}

.form-hint {
    display: block;
    color: var(--text-tertiary);
    font-size: 13px;
    margin-top: 6px;
}

.form-group input:invalid:not(:placeholder-shown),
.form-group select:invalid:not([value=""]),
.form-group textarea:invalid:not(:placeholder-shown) {
    border-color: #c45a5a;
}

.form-group input:valid:not(:placeholder-shown),
.form-group select:valid:not([value=""]) {
    border-color: var(--sage-600);
}

/* Required asterisk */
.required {
    color: #c45a5a;
    margin-left: 2px;
}

/* Loading spinner */
.spinner {
    width: 18px;
    height: 18px;
    animation: spin 1s linear infinite;
    margin-right: 8px;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.button-loading {
    display: inline-flex;
    align-items: center;
}

.button-text.hidden,
.button-loading.hidden {
    display: none;
}

/* Form status messages */
.form-status {
    padding: 16px;
    border-radius: 8px;
    margin-top: 16px;
}

.form-status--success {
    background: var(--clay-100);
    border: 1px solid var(--sage-600);
    color: var(--sage-800);
}

.form-status--error {
    background: #fdf2f2;
    border: 1px solid #c45a5a;
    color: #a84848;
}

.form-status[hidden] {
    display: none;
}
```

**Verification:**
1. Tab through all form fields — focus order should be logical
2. Screen reader should announce labels and required status
3. Submit with empty required fields — errors should be announced
4. Autocomplete should suggest name/email from browser

---

### Task 7: Add Lazy Loading to Below-Fold Images

**Goal:** Improve initial page load performance.

**Location:** All `<img>` tags throughout the HTML

#### 7.1 Keep eager loading for above-fold images

Images visible on initial load should NOT have lazy loading:

```html
<!-- Hero section image - keep eager (or omit loading attribute) -->
<img 
    src="assets/images/Greg Fortier - Freelance business systems support 1200x72dpi.png" 
    alt="Greg Fortier, Principal Consultant at Pragmatic Tactics"
    loading="eager"
    decoding="async"
>

<!-- Logo in header - keep eager -->
<img 
    src="assets/logos/Logo - Horizontal vibrant.svg" 
    alt="Pragmatic Tactics"
    loading="eager"
>
```

#### 7.2 Add lazy loading to below-fold images

All images below the initial viewport:

```html
<!-- Section icons -->
<img 
    src="assets/images/Icon - Target blk-wht.svg" 
    alt="" 
    loading="lazy"
    decoding="async"
>

<img 
    src="assets/images/Icon - Plateau color.svg" 
    alt="" 
    loading="lazy"
    decoding="async"
>

<!-- Framework/foundation icons -->
<img 
    src="assets/images/Cube - People.svg" 
    alt="" 
    loading="lazy"
    decoding="async"
>

<!-- Any other decorative or below-fold images -->
```

#### 7.3 Add dimensions to prevent layout shift

Where possible, add explicit dimensions:

```html
<img 
    src="assets/images/Icon - Target blk-wht.svg" 
    alt=""
    width="120"
    height="120"
    loading="lazy"
    decoding="async"
>
```

**Note:** For SVGs that scale, you can use CSS to control final display size while the attributes prevent layout shift.

**Verification:**
1. Open Network tab in browser DevTools
2. Filter by "Img"
3. Scroll down the page slowly
4. Below-fold images should load as they come into view, not all at once

---

### Task 8: Add Hero Text Emphasis

**Goal:** Add styling hooks to emphasize key words in the hero headline.

**Location:** Hero section `<h1>`

#### 8.1 Wrap emphasis word in styled element

```html
<h1 class="hero__title">
    You don't need more strategy. 
    <span class="hero__title-right">It's time to <em class="highlight-clay">execute</em>.</span>
</h1>
```

#### 8.2 Ensure CSS class exists

The CSS brief included this class, but verify it exists:

```css
.highlight-clay {
    background: linear-gradient(
        to top,
        var(--clay-200) 0%,
        var(--clay-200) 30%,
        transparent 30%
    );
    padding: 0 4px;
    margin: 0 -4px;
    font-style: normal; /* Override italic from <em> if desired */
}
```

**Verification:** The word "execute" should have a subtle clay-colored underline/highlight effect.

---

### Task 9: Expand Footer Content

**Goal:** Make the footer more useful and warmer.

**Location:** `<footer>` element

#### 9.1 Replace minimal footer with expanded version

```html
<footer role="contentinfo">
    <div class="container">
        <div class="footer__grid">
            
            <!-- Brand Column -->
            <div class="footer__brand">
                <a href="/" class="footer__logo-link">
                    <img 
                        src="assets/logos/PT-logo-white-panels-only.svg" 
                        alt="Pragmatic Tactics" 
                        class="footer__logo"
                        width="48"
                        height="48"
                    >
                </a>
                <p class="footer__tagline">Strategy is the map.<br>Execution is the journey.</p>
            </div>
            
            <!-- Quick Links Column -->
            <div class="footer__nav">
                <h4 class="footer__heading">Navigate</h4>
                <ul class="footer__links">
                    <li><a href="#fit-finder">Find Your Fit</a></li>
                    <li><a href="#starter-projects">Starter Projects</a></li>
                    <li><a href="#foundation">The Foundation</a></li>
                    <li><a href="#process">The Process</a></li>
                </ul>
            </div>
            
            <!-- Contact Column -->
            <div class="footer__contact">
                <h4 class="footer__heading">Let's Connect</h4>
                <p class="footer__location">
                    <svg class="footer__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    Revelstoke, BC, Canada
                </p>
                <p class="footer__service-area">Remote consulting across Canada</p>
                <a href="booking.html" class="footer__cta">Schedule a Call</a>
            </div>
            
        </div>
        
        <!-- Bottom Bar -->
        <div class="footer__bottom">
            <p class="footer__copyright">© 2025 Pragmatic Tactics. All rights reserved.</p>
            <p class="footer__credit">Built with gruff empathy in the mountains.</p>
        </div>
        
    </div>
</footer>
```

#### 9.2 Add footer CSS

```css
/* Footer Layout */
footer {
    background: var(--sand-200);
    border-top: 1px solid var(--sand-300);
    padding: 48px 24px 32px;
}

.footer__grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr;
    gap: 48px;
    max-width: 1200px;
    margin: 0 auto;
}

@media (max-width: 768px) {
    .footer__grid {
        grid-template-columns: 1fr;
        gap: 32px;
        text-align: center;
    }
}

/* Footer Brand */
.footer__brand {
    display: flex;
    flex-direction: column;
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
    height: 48px;
    width: auto;
}

.footer__tagline {
    font-family: 'Fraunces', serif;
    font-size: 16px;
    font-style: italic;
    color: var(--charcoal-light);
    line-height: 1.5;
    margin: 0;
}

/* Footer Navigation */
.footer__heading {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--sage-700);
    margin: 0 0 16px 0;
}

.footer__links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.footer__links a {
    color: var(--charcoal);
    text-decoration: none;
    font-size: 15px;
    transition: color 0.2s ease;
}

.footer__links a:hover {
    color: var(--clay-500);
}

/* Footer Contact */
.footer__contact {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.footer__location {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--charcoal);
    font-size: 15px;
    margin: 0;
}

.footer__icon {
    color: var(--sage-600);
    flex-shrink: 0;
}

.footer__service-area {
    color: var(--charcoal-muted);
    font-size: 14px;
    margin: 0;
}

.footer__cta {
    display: inline-block;
    margin-top: 8px;
    padding: 10px 20px;
    background: var(--sage-800);
    color: var(--sand-50);
    text-decoration: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    transition: all 0.3s ease;
    width: fit-content;
}

.footer__cta:hover {
    background: var(--clay-500);
    transform: translateY(-1px);
}

@media (max-width: 768px) {
    .footer__contact {
        align-items: center;
    }
    
    .footer__cta {
        margin-top: 16px;
    }
}

/* Footer Bottom */
.footer__bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 40px auto 0;
    padding-top: 24px;
    border-top: 1px solid var(--sand-300);
}

@media (max-width: 768px) {
    .footer__bottom {
        flex-direction: column;
        gap: 8px;
        text-align: center;
    }
}

.footer__copyright {
    color: var(--charcoal-muted);
    font-size: 14px;
    margin: 0;
}

.footer__credit {
    color: var(--charcoal-muted);
    font-size: 13px;
    font-style: italic;
    margin: 0;
}
```

**Verification:**
1. Footer should have three-column layout on desktop
2. Should stack to single column on mobile
3. All links should be functional
4. "Schedule a Call" button should link to booking page

---

### Task 10: Add Starter Card ARIA Improvements

**Goal:** Improve screen reader experience for the expandable starter project cards.

**Location:** All `.starter-card` elements with `<details>`

#### 10.1 Add JavaScript to manage aria-expanded

Add this script before closing `</body>` tag (or in your existing JS file):

```javascript
// Manage aria-expanded for starter card details
document.querySelectorAll('.starter-card__details').forEach(details => {
    const summary = details.querySelector('.starter-card__details-toggle');
    
    if (summary) {
        // Set initial state
        summary.setAttribute('aria-expanded', details.open ? 'true' : 'false');
        
        // Update on toggle
        details.addEventListener('toggle', () => {
            summary.setAttribute('aria-expanded', details.open ? 'true' : 'false');
        });
    }
});
```

#### 10.2 Ensure summary has proper role

The `<summary>` element should already be accessible, but add explicit button semantics if needed:

```html
<details class="starter-card__details">
    <summary 
        class="starter-card__details-toggle" 
        aria-expanded="false"
        aria-controls="card-details-[unique-id]"
    >
        What's included, timeline & ideal fit
    </summary>
    <div class="starter-card__details-content" id="card-details-[unique-id]">
        <!-- Card details content -->
    </div>
</details>
```

**Note:** Replace `[unique-id]` with unique identifiers for each card (e.g., `process-audit`, `digital-snapshot`, etc.)

**Verification:**
1. Use screen reader to navigate to a starter card
2. Details toggle should announce as expandable/collapsible
3. State should update when opened/closed

---

## Testing Checklist

After completing all tasks, verify:

### Accessibility
- [ ] Skip link appears on Tab and works correctly
- [ ] All landmark regions are properly defined
- [ ] Form fields have associated labels
- [ ] Required fields are properly indicated
- [ ] Error messages are announced to screen readers
- [ ] Focus states are visible on all interactive elements
- [ ] Page is navigable by keyboard alone

### SEO
- [ ] Schema.org structured data validates without errors
- [ ] Open Graph image displays correctly in Facebook debugger
- [ ] Twitter Card displays correctly in validator
- [ ] All pages have unique, descriptive titles

### Performance
- [ ] Below-fold images lazy load correctly
- [ ] No layout shift when images load
- [ ] Favicon displays in browser tab

### Visual/Functional
- [ ] Footer displays correctly on desktop and mobile
- [ ] Hero emphasis styling appears correctly
- [ ] No JavaScript errors in console
- [ ] All internal links work correctly

---

## Files Modified/Created Summary

| File | Action | Notes |
|------|--------|-------|
| `index.html` | Modified | Multiple changes throughout |
| `main.css` | Modified | New styles for footer, forms, skip link |
| `site.webmanifest` | Created | New file in root |
| `assets/images/og-image.jpg` | Created | Social sharing image (1200x630) |
| `assets/logos/favicon-*.png` | Created | Multiple favicon sizes |

---

## Notes for Developer

1. **Test incrementally** — Complete and verify each task before moving to the next.

2. **Preserve existing functionality** — The site has JavaScript for the timeline, fit-finder, and other interactive elements. Ensure HTML changes don't break these.

3. **ID uniqueness** — When adding IDs (for aria-labelledby, form fields, etc.), ensure they are unique across the page.

4. **Mobile testing** — Test all changes at 375px and 768px breakpoints minimum.

5. **Screen reader testing** — If possible, test with VoiceOver (Mac), NVDA (Windows), or use browser accessibility inspector.

6. **Commit strategy** — Commit after each major task for easy rollback if needed.

---

## Questions?

If any task is unclear or conflicts with existing structure, flag it for review before proceeding. When in doubt, prioritize accessibility and SEO tasks over visual enhancements.