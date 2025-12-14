# Pragmatic Tactics Website Styling Improvements

## Implementation Brief for Developer Agent

**Project:** PragmaticTactics.com Visual Refinements  
**Target File:** `main.css` (and minimal HTML if needed)  
**Priority:** Aesthetic polish — no functional changes required  
**Approach:** Incremental CSS updates; test each change before proceeding

---

## Context

The Pragmatic Tactics website is a consulting business site with a "gruff empathy" brand personality — practical, direct, warm, and trustworthy. The current design uses a Sand/Sage/Clay color palette with Fraunces (serif) for headings and IBM Plex Sans for body text.

The site is static HTML/CSS with vanilla JavaScript for interactions. All styling changes should be made in `main.css` using the existing CSS custom properties (variables) defined in `:root`.

### Existing Color Variables Reference
```css
/* Sand — The Foundation */
--sand-50: #fcfbf9;
--sand-100: #f7f5f2;
--sand-150: #f5f3ef;
--sand-200: #efebe6;
--sand-300: #e4dfd8;
--sand-900: #3d3834;

/* Sage — The Shop Floor */
--sage-600: #3d5e59;
--sage-700: #2f4f4a;
--sage-800: #2c4a46;
--sage-900: #1d3330;

/* Clay — The Warmth */
--clay-100: #f5e8df;
--clay-200: #ead0bf;
--clay-300: #dfb89f;
--clay-400: #d4906f;
--clay-500: #c27b5e;
--clay-600: #a86348;
--clay-700: #8f5239;

/* Text */
--charcoal: #2d3748;
--charcoal-light: #4a5568;
--charcoal-muted: #718096;
```

---

## Implementation Tasks

Complete each task in order. Test visually after each change before proceeding.

---

### Task 1: Hero Section Enhancement

**Goal:** Improve text readability over the bathymetry background while maintaining the unique visual.

**File:** `main.css`  
**Section:** Look for `.hero` styles (around line 1500-1700)

#### 1.1 Add gradient overlay to hero background

Add a pseudo-element to create a subtle fade that pushes the bathymetry back:

```css
.hero {
    position: relative; /* Ensure this is set */
}

.hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
        to bottom,
        rgba(252, 251, 249, 0.3) 0%,
        rgba(252, 251, 249, 0.7) 100%
    );
    z-index: 1;
    pointer-events: none;
}

/* Ensure hero content sits above the overlay */
.hero__content {
    position: relative;
    z-index: 2;
}
```

#### 1.2 Add subtle text shadow to hero title

Locate `.hero__title` and add:

```css
.hero__title {
    text-shadow: 0 2px 30px rgba(252, 251, 249, 0.9);
}
```

**Verification:** Hero headline should feel more "lifted" from the background. The bathymetry should still be visible but not competing with text.

---

### Task 2: Card Shadow Refinement

**Goal:** Give cards more depth and a "paper on desk" quality.

**File:** `main.css`  
**Sections:** `.starter-card`, `.ps-card`, `.grid__item--card`, `.fit-finder__checklist-container`

#### 2.1 Update the shadow variables in `:root`

Locate the shadow variables and update:

```css
/* Enhanced shadow system - warmer, more layered */
--shadow-subtle: 0 1px 3px rgba(61, 56, 52, 0.04),
                 0 4px 12px rgba(61, 56, 52, 0.06);
--shadow-medium: 0 2px 4px rgba(61, 56, 52, 0.04),
                 0 8px 24px rgba(61, 56, 52, 0.08);
--shadow-heavy:  0 4px 8px rgba(61, 56, 52, 0.06),
                 0 16px 40px rgba(61, 56, 52, 0.12);
```

#### 2.2 Add inner highlight to cards

Add a subtle top inner highlight to key card classes:

```css
.starter-card,
.ps-card,
.grid__item--card,
.fit-finder__checklist-container {
    box-shadow: var(--shadow-medium),
                inset 0 1px 0 rgba(255, 255, 255, 0.5);
}
```

**Verification:** Cards should appear slightly more dimensional, as if they're paper sitting on a surface. The effect should be subtle, not dramatic.

---

### Task 3: Strategic Clay Accent Usage

**Goal:** Use the clay color more intentionally to guide attention and add warmth.

#### 3.1 Create a highlight utility class

Add this new utility class (place near other utility classes, around line 170-180):

```css
/* Highlight text with clay underline effect */
.highlight-clay {
    background: linear-gradient(
        to top,
        var(--clay-200) 0%,
        var(--clay-200) 30%,
        transparent 30%
    );
    padding: 0 4px;
    margin: 0 -4px;
}
```

**Note:** This is a utility class for optional HTML use. No immediate HTML changes required unless specifically requested.

#### 3.2 Add clay left border to active fit-finder container

Locate `.fit-finder__checklist-container` and update:

```css
.fit-finder__checklist-container {
    /* Keep existing styles, add: */
    border-left: 3px solid var(--clay-500);
}
```

#### 3.3 Enhance section divider with clay alternation

Locate `.section.section--with-separator::after` and add an alternating variant:

```css
/* Clay variant for alternating sections */
.section.section--with-separator.separator--clay::after {
    background: var(--clay-500);
}
```

**Verification:** The fit-finder checklist container should have a warm clay accent on the left edge. The highlight class is ready for use if needed.

---

### Task 4: Link Hover Animation

**Goal:** Add animated underlines to links for more personality.

#### 4.1 Add animated underline to content links

Add styles for links within content areas (not navigation or buttons):

```css
/* Animated underline for content links */
.section a:not(.cta-primary):not(.cta-secondary):not(.nav-link):not(.starter-card__pill),
.starter-card__value a,
.ps-card__text a,
.faq-answer a {
    position: relative;
    text-decoration: none;
    color: var(--sage-700);
    transition: color 0.2s ease;
}

.section a:not(.cta-primary):not(.cta-secondary):not(.nav-link):not(.starter-card__pill)::after,
.starter-card__value a::after,
.ps-card__text a::after,
.faq-answer a::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--clay-500);
    transition: width 0.3s ease;
}

.section a:not(.cta-primary):not(.cta-secondary):not(.nav-link):not(.starter-card__pill):hover,
.starter-card__value a:hover,
.ps-card__text a:hover,
.faq-answer a:hover {
    color: var(--clay-600);
}

.section a:not(.cta-primary):not(.cta-secondary):not(.nav-link):not(.starter-card__pill):hover::after,
.starter-card__value a:hover::after,
.ps-card__text a:hover::after,
.faq-answer a:hover::after {
    width: 100%;
}
```

**Verification:** Hover over any text link in content sections. The underline should animate from left to right in clay color.

---

### Task 5: Button Micro-Interactions

**Goal:** Add tactile "press" feedback to buttons.

#### 5.1 Add active/pressed state to primary CTA

Locate `.cta-primary` styles and add:

```css
.cta-primary:active {
    transform: translateY(0);
    box-shadow: var(--shadow-subtle);
    transition: all 0.1s ease;
}
```

#### 5.2 Add active state to secondary CTA

Locate `.cta-secondary` styles and add:

```css
.cta-secondary:active {
    transform: translateY(0);
    background: var(--sage-700);
    transition: all 0.1s ease;
}
```

#### 5.3 Add active state to timeline and fit-finder buttons

```css
.timeline-selector__button:active,
.fit-finder__button:active {
    transform: translateY(0) !important;
    box-shadow: var(--shadow-subtle);
    transition: all 0.1s ease;
}

/* Adjust for timeline button's translateX */
.timeline-selector__button:active {
    transform: translateX(-50%) translateY(0) !important;
}
```

**Verification:** Click and hold any button. It should feel like it "presses down" slightly before releasing.

---

### Task 6: Fit-Finder Breathing Room

**Goal:** Reduce density in the fit-finder checklist area.

#### 6.1 Increase gap between checklist items

Locate `.fit-finder__checklist` and update the gap:

```css
.fit-finder__checklist {
    /* Update existing gap value */
    gap: 24px; /* Was 20px */
}
```

#### 6.2 Increase padding on checklist items

Locate `.fit-finder__item` and update:

```css
.fit-finder__item {
    /* Update existing padding */
    padding: 18px 20px; /* Was 16px */
}
```

#### 6.3 Slow down the reveal animation

Locate `.fit-finder__item` transition and update:

```css
.fit-finder__item {
    /* Update existing transition */
    transition: opacity 0.6s ease-out, transform 0.5s ease-out;
}
```

**Verification:** The fit-finder checklist should feel less cramped. Items should animate in slightly slower, creating a more "considered" feel.

---

### Task 7: Footer Enhancement

**Goal:** Make the footer feel warmer and more intentional.

#### 7.1 Create distinct footer styling

Locate the footer styles (search for `footer` in the CSS) and update/add:

```css
footer {
    background: var(--sand-200);
    border-top: 1px solid var(--sand-300);
    padding: 48px 24px 32px;
    margin-top: 0;
}

footer .container {
    max-width: 1200px;
    margin: 0 auto;
}

/* Footer logo/brand area */
footer img,
footer svg {
    opacity: 0.7;
    transition: opacity 0.3s ease;
}

footer img:hover,
footer svg:hover {
    opacity: 1;
}

/* Footer text styling */
footer p,
footer span {
    color: var(--charcoal-muted);
    font-size: 14px;
}

/* Footer links if any */
footer a {
    color: var(--sage-700);
    text-decoration: none;
    transition: color 0.2s ease;
}

footer a:hover {
    color: var(--clay-500);
}
```

**Note:** Adjust selectors based on actual footer HTML structure. The goal is a warm sand background with muted text.

**Verification:** Footer should feel like a warm, grounded conclusion to the page rather than an afterthought.

---

### Task 8: Focus State Accessibility

**Goal:** Improve keyboard navigation visibility.

#### 8.1 Add visible focus states to interactive elements

Add these focus-visible styles:

```css
/* Enhanced focus states for accessibility */
.cta-primary:focus-visible {
    outline: 3px solid var(--clay-300);
    outline-offset: 3px;
}

.cta-secondary:focus-visible {
    outline: 3px solid var(--sage-600);
    outline-offset: 3px;
}

.timeline-selector__button:focus-visible,
.fit-finder__button:focus-visible {
    outline: 3px solid var(--clay-300);
    outline-offset: 2px;
}

.starter-card__pill:focus-visible {
    outline: 2px solid var(--sand-50);
    outline-offset: 2px;
}

/* Form inputs */
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
    outline: none;
    border-color: var(--sage-600);
    box-shadow: 0 0 0 3px rgba(61, 94, 89, 0.15);
}
```

**Verification:** Tab through the page using keyboard only. All interactive elements should have visible focus indicators.

---

### Task 9: Text Contrast Accessibility Fix

**Goal:** Ensure muted text meets WCAG AA contrast requirements.

#### 9.1 Darken the muted text color

In `:root`, update:

```css
--charcoal-muted: #5a6778; /* Was #718096 - now darker for better contrast */
--text-tertiary: #5a6778;  /* Update if this variable exists separately */
```

**Verification:** Use a contrast checker tool to verify the new color against `--sand-100` (#f7f5f2) meets 4.5:1 ratio for normal text.

---

### Task 10: Icon Container Hover Enhancement

**Goal:** Add subtle rotation/scale to icon hovers for more personality.

#### 10.1 Enhance icon container hover

Locate `.icon-container` hover styles and update:

```css
.icon-container {
    /* Add to existing styles */
    transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.icon-container:hover {
    background: var(--clay-500);
    color: var(--sand-50);
    transform: scale(1.08) rotate(3deg);
}
```

#### 10.2 Add similar effect to card icons

```css
.ps-card__icon,
.starter-card__icon {
    transition: transform 0.3s ease, color 0.3s ease;
}

.ps-card:hover .ps-card__icon,
.starter-card:hover .starter-card__icon {
    transform: scale(1.1);
    color: var(--clay-500);
}
```

**Verification:** Hover over icon containers and cards with icons. Icons should subtly scale and/or rotate.

---

## Testing Checklist

After completing all tasks, verify:

- [ ] Hero text is clearly readable over bathymetry background
- [ ] Cards have subtle depth and inner highlight
- [ ] Clay accent appears on fit-finder container left border
- [ ] Text links animate with underline on hover
- [ ] Buttons feel "pressable" with active states
- [ ] Fit-finder checklist feels less dense
- [ ] Footer has warm sand background
- [ ] All interactive elements have visible focus states (test with Tab key)
- [ ] No visual regressions on mobile (test at 375px and 768px widths)
- [ ] Reduced motion preference is respected (test with `prefers-reduced-motion: reduce`)

---

## Notes for Developer

1. **Preserve existing functionality** — These are purely visual changes. Do not modify JavaScript or HTML structure unless explicitly needed.

2. **Mobile responsiveness** — All changes should work within existing responsive breakpoints. Test thoroughly.

3. **CSS specificity** — Some styles may need adjustment based on existing specificity. Use browser DevTools to verify styles are applying correctly.

4. **Incremental commits** — Commit after each major task for easy rollback if needed.

5. **Performance** — The shadow changes add minimal overhead. The animated underlines use transforms which are GPU-accelerated.

---

## Questions?

If any task is unclear or conflicts with existing styles, flag it for review before proceeding. The goal is polish, not overhaul—when in doubt, err on the side of subtlety.