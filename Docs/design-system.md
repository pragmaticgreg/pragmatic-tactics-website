# Pragmatic Tactics — Design System
## Option B: Grounded & Textured ("Jeans & Flannel")

**Brand Essence:** Gruff empathy. The bilingual operator who speaks fluent "shop floor" and fluent "systems architecture." Calm, curious, direct. Earned trust through competence, not polish.

**Visual Translation:** Warm but not soft. Analog textures meeting clean digital lines. Generous whitespace, unhurried typography, no visual shouting.

---

## Color Palette

### Sand — The Foundation
Warm backgrounds that replace sterile white. Think manila folders, craft paper.

| Token | Hex | Usage |
|-------|-----|-------|
| `--sand-50` | `#fcfbf9` | Primary background |
| `--sand-100` | `#f7f5f2` | Secondary sections |
| `--sand-200` | `#efebe6` | Borders, subtle dividers, card backgrounds |
| `--sand-300` | `#e4dfd8` | Medium borders, hover states |
| `--sand-900` | `#3d3834` | High contrast text (softer than pure black) |

### Sage — The Shop Floor
Deep forest greens for primary actions, buttons, and grounding elements.

| Token | Hex | Usage |
|-------|-----|-------|
| `--sage-600` | `#3d5e59` | Lighter sage, secondary buttons |
| `--sage-700` | `#2f4f4a` | Mid-tone |
| `--sage-800` | `#2c4a46` | **Primary buttons, icons, strong headers** |
| `--sage-900` | `#1d3330` | Deepest accent, hover states on sage elements |

### Clay — The Warmth
Terracotta/copper for highlights, accents, and warm calls to action.

| Token | Hex | Usage |
|-------|-----|-------|
| `--clay-400` | `#d4906f` | Lighter clay, some hover states |
| `--clay-500` | `#c27b5e` | **Primary accent, italic emphasis, card hover borders** |
| `--clay-600` | `#a86348` | Deeper clay, hover states |
| `--clay-700` | `#8f5239` | Darkest clay |

### Text
| Token | Hex | Usage |
|-------|-----|-------|
| `--charcoal` | `#2d3748` | Body copy, high readability |
| `--charcoal-light` | `#4a5568` | Secondary text |
| `--charcoal-muted` | `#718096` | Tertiary text, captions, metadata |

---

## CSS Variables (Root Block)

Drop this into your `main.css` `:root` to replace existing color variables:

```css
:root {
    /* === OPTION B: GROUNDED & TEXTURED === */
    
    /* Sand — The Foundation */
    --sand-50: #fcfbf9;
    --sand-100: #f7f5f2;
    --sand-200: #efebe6;
    --sand-300: #e4dfd8;
    --sand-900: #3d3834;
    
    /* Sage — The Shop Floor */
    --sage-600: #3d5e59;
    --sage-700: #2f4f4a;
    --sage-800: #2c4a46;
    --sage-900: #1d3330;
    
    /* Clay — The Warmth */
    --clay-400: #d4906f;
    --clay-500: #c27b5e;
    --clay-600: #a86348;
    --clay-700: #8f5239;
    
    /* Text */
    --charcoal: #2d3748;
    --charcoal-light: #4a5568;
    --charcoal-muted: #718096;
    
    /* === MAPPED TO EXISTING VARIABLE NAMES === */
    
    /* Primary brand colors */
    --primary-navy: #2c4a46;           /* Sage - "Shop Floor" green */
    --secondary-blue: #3d5e59;         /* Lighter sage */
    --accent-orange: #c27b5e;          /* Clay - warm terracotta */
    --accent-red: #a86348;             /* Deeper clay */
    --success-green: #2c4a46;          /* Sage (matches primary) */
    
    /* Text hierarchy */
    --text-primary: #3d3834;           /* Sand-900 - warm dark */
    --text-secondary: #2d3748;         /* Charcoal */
    --text-tertiary: #718096;          /* Muted charcoal */
    
    /* Backgrounds */
    --background-white: #fcfbf9;       /* Sand-50 - warm white */
    --background-light: #f7f5f2;       /* Sand-100 */
    --background-medium: #efebe6;      /* Sand-200 - manila folder */
    
    /* Borders */
    --border-light: #efebe6;           /* Sand-200 */
    --border-dark: #2c4a46;            /* Sage */
    --border-medium: #e4dfd8;          /* Sand-300 */
    
    /* Shadows - warm earth tone */
    --shadow-subtle: 0px 4px 16px rgba(61, 56, 52, 0.06);
    --shadow-medium: 0px 4px 16px rgba(61, 56, 52, 0.10);
    --shadow-heavy: 0px 12px 35px rgba(61, 56, 52, 0.14);
    --shadow-inset: inset 0 0px 12px rgba(61, 56, 52, 0.12);
    
    /* Filters */
    --filter-charcoal: brightness(0) saturate(100%) invert(20%) sepia(15%) saturate(600%) hue-rotate(150deg) brightness(95%) contrast(90%);
    --filter-white: brightness(0) saturate(100%) invert(99%) sepia(3%) saturate(150%) hue-rotate(20deg) brightness(103%) contrast(98%);
    --filter-grey: brightness(0) saturate(100%) invert(50%) sepia(5%) saturate(300%) hue-rotate(180deg) brightness(90%) contrast(85%);
}
```

---

## Typography

### Font Pairing

| Role | Font | Weight | Notes |
|------|------|--------|-------|
| **Display/Headlines** | Fraunces | 400-600 | Variable "old style" serif with character. Quirky, hand-crafted feel. Italic has real personality. |
| **Body** | IBM Plex Sans | 300-600 | Industrial heritage, clean but with technical precision. Pairs well with Fraunces warmth. |

### Google Fonts Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
```

### CSS Font Variables

```css
:root {
    --font-display: 'Fraunces', Georgia, serif;
    --font-body: 'IBM Plex Sans', -apple-system, sans-serif;
}

body {
    font-family: var(--font-body);
    line-height: 1.7;
}

h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-display);
}
```

### Headline Styling

```css
.hero__title {
    font-family: var(--font-display);
    font-size: clamp(40px, 5.5vw, 68px);
    font-weight: 500;
    line-height: 1.15;
    letter-spacing: -0.02em;
}

.hero__title em {
    font-style: italic;
    color: var(--clay-500);  /* Warm accent on emphasized words */
    font-weight: 400;
}
```

---

## Section Backgrounds

### Alternating Pattern

```css
/* Light sections (odd) - Sand foundation */
main > .section:nth-of-type(odd) { 
    background: linear-gradient(0deg, var(--background-medium) 0%, var(--background-light) 100%); 
}

/* Slightly darker sections (even) - Subtle contrast */
main > .section:nth-of-type(even) { 
    background: linear-gradient(180deg, #e8e4da 0%, #ded9ce 100%);
}
```

### Card Backgrounds (contrast with parent)

```css
/* Cards in odd (lighter) sections */
main > .section:nth-of-type(odd) .card,
main > .section:nth-of-type(odd) .quote-block { 
    background: var(--background-white); 
}

/* Cards in even (slightly darker) sections */
main > .section:nth-of-type(even) .card,
main > .section:nth-of-type(even) .quote-block { 
    background: var(--background-light); 
}
```

---

## Animation & Interaction Patterns

### General Principle
Warm, unhurried transitions. Gentle lifts on hover. Color shifts toward clay (warm) rather than darker shades.

### Standard Transition

```css
transition: all 0.4s ease;
```

### Card Hover Pattern

```css
.card {
    background: var(--background-white);
    padding: 40px 32px;
    border-radius: 12px;
    border: 1px solid var(--border-light);
    box-shadow: 0 2px 8px rgba(61, 56, 52, 0.04);
    transition: all 0.4s ease;
}

.card:hover {
    border-color: var(--clay-500);           /* Warm border on hover */
    transform: translateY(-4px);              /* Gentle lift */
    box-shadow: 0 20px 60px rgba(61, 56, 52, 0.1);  /* Soft shadow */
}
```

### Button Hover Pattern

**Primary (Sage) Buttons:**
```css
.btn-primary {
    padding: 18px 36px;
    background: var(--sage-800);
    color: var(--sand-50);
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.02em;
    border-radius: 8px;
    transition: all 0.4s ease;
}

.btn-primary:hover {
    background: var(--clay-500);              /* Shift to warm */
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(194, 123, 94, 0.25);
}
```

**Nav CTA (smaller):**
```css
.nav__cta {
    padding: 12px 28px;
    background: var(--sage-800);
    color: var(--sand-50);
    font-size: 14px;
    font-weight: 600;
    border-radius: 6px;
    transition: all 0.3s ease;
}

.nav__cta:hover {
    background: var(--clay-500);
    transform: translateY(-1px);
}
```

### Icon Containers

```css
.icon-container {
    width: 48px;
    height: 48px;
    background: var(--sand-200);              /* Sand background */
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--clay-500);                   /* Clay icon color */
}
```

### Arrow/Chevron Animation (in buttons)

```css
.btn svg {
    width: 18px;
    height: 18px;
    transition: transform 0.3s ease;
}

.btn:hover svg {
    transform: translateX(4px);
}
```

---

## Component Patterns

### Eyebrow Text (above headlines)

```css
.eyebrow {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--sage-800);
    margin-bottom: 28px;
    display: flex;
    align-items: center;
    gap: 16px;
}

.eyebrow::before {
    content: '';
    width: 32px;
    height: 2px;
    background: var(--sage-800);
}
```

### Section Dividers

```css
.section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 10%;
    right: 10%;
    height: 1px;
    background: var(--border-light);
}
```

### Subtle Paper Texture (optional)

```css
body::after {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    opacity: 0.025;
    pointer-events: none;
    z-index: 9999;
}
```

---

## Quick Reference

### Do's
- Use clay (`--clay-500`) for hover states and warm accents
- Use sage (`--sage-800`) for primary buttons and strong elements
- Let typography breathe with generous line-height (1.7+)
- Keep transitions at 0.3s-0.4s, ease timing
- Use soft, warm shadows (rgba based on `61, 56, 52`)

### Don'ts
- Don't use pure black (`#000`) — use `--sand-900` or `--charcoal`
- Don't use pure white (`#fff`) — use `--sand-50`
- Don't use harsh/cool shadows
- Don't speed up transitions below 0.3s
- Don't add complex animations (accent bars, gradient reveals) — keep it simple

---

## Files

- **Prototype:** `/reference/pragmatic-tactics-exploration.html` — working example with all three theme options (toggle to Option B)
- **This document:** `/docs/design-system.md`