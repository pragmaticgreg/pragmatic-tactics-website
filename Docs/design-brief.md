# Visual Strategy & Design Brief: Pragmatic Tactics Ecosystem

**Purpose:** This document serves as the "Visual DNA" for the Pragmatic Tactics ecosystem. It is intended for developers and AI agents building new applications, tools, or landing pages.

**The Goal:** New properties should feel like "different rooms in the same building." They do not need to be clones of the main site, but they must share the same foundational aesthetic: **Grounded, Warm, Expert, and Pragmatic.**

---

## 1. The Vibe & Personality

We are building tools for business execution, not generic SaaS products.
*   **We are:** Solid, textured, warm, unhurried, clear.
*   **We are NOT:** Neon, "Tech-bro" minimalist, cold corporate blue/grey, or chaotic.

**Key Aesthetic Principles:**
1.  **Warmth over Coldness:** We use warm "Sand" neutrals instead of stark whites or cold grays.
2.  **Texture & Depth:** We use subtle noise overlays, shadows, and alternating background bands to create a tactile feel.
3.  **Editorial Typography:** Headings feel written, not just labeled.

---

## 2. The Non-Negotiables (Strict Consistency)

To maintain the brand voice, these elements should remain consistent across all apps and sites.

### A. Typography
Our font pairing is the primary identifier of our voice.
*   **Headings:** `Fraunces` (Serif, Google Fonts).
    *   *Why:* It feels editorial, human, and authoritative.
    *   *Usage:* Headings (`h1`-`h6`), big stats, pull quotes.
    *   *Weights:* Mostly 400-600. Use 300 for elegance or 700 for heavy impact sparingly.
*   **Body / UI:** `IBM Plex Sans` (Sans-Serif, Google Fonts).
    *   *Why:* It is highly legible, technical, and "pragmatic."
    *   *Usage:* Long text, UI buttons, forms, nav, labels, data tables.

### B. The "Sand" Foundation (Backgrounds)
Never use pure `#FFFFFF` white or cool `#F0F0F0` gray for main backgrounds. Always start with our warm "Sand" palette.
*   **Page Base:** `--sand-50` (`#fcfbf9`)
*   **Secondary Backgrounds:** `--sand-100` (`#f7f5f2`) to `--sand-300` (`#e4dfd8`)

---

## 3. The Creative Playground (Where to Flex)

Agents and developers have freedom here. You need to solve specific UI problems (dashboards, mobile views, complex forms) that the main marketing site doesn't handle.

### A. Color Extension
*   **Core Colors (The Anchor):** You must include the **Sage** (Primary) and **Clay** (Accent) to tie it back to the brand.
*   **Creative Freedom:** You may introduce **new accent colors** if the application requires it (e.g., a "Gold" for revenue, a "Muted Teal" for progress).
    *   *Rule:* New colors must be **earthy and warm**. Avoid neon/fluorescent saturation. They should sit comfortably next to the "Sand" background.

### B. Layout Patterns
*   **Marketing Site:** Uses alternating full-width bands (Odd: Light / Even: Medium-Dark).
*   **Applications/Tools:** You can break this pattern. A dashboard might need a persistent sidebar and a white card layout.
    *   *Guidance:* Just ensure the container background is "Sand," and the cards are "White" (or vice versa) to maintain depth.

---

## 4. Design Token Reference (Cheatsheet)

Use these values as your starting point.

### Core Palette
```css
:root {
    /* === NEUTRALS: The "Sand" Scale (Warm, Earthy) === */
    --sand-50:  #fcfbf9; /* Main Page Background */
    --sand-100: #f7f5f2; /* Secondary BG */
    --sand-200: #efebe6; /* Borders / UI Elements */
    --sand-300: #e4dfd8; /* Darker Borders / Active States */
    --sand-900: #3d3834; /* Primary Text Color */

    /* === PRIMARY: "Sage" (Grounded, Professional) === */
    --sage-600: #3d5e59; /* Brand Primary / Links */
    --sage-800: #2c4a46; /* Deep Primary / Headings / Buttons */
    --sage-900: #1d3330; /* Darkest accessible green */

    /* === ACCENT: "Clay" (Warmth, Highlights) === */
    --clay-400: #d4906f; /* UI Accents */
    --clay-500: #c27b5e; /* Buttons / Key Highlights */
    --clay-600: #a86348; /* Warnings / Error States */
}
```

### Functional Mappings
*   **Text Primary:** `--sand-900` (`#3d3834`) - *Soft Black*
*   **Text Secondary:** `#2d3748` - *Charcoal*
*   **Primary Action:** `--sage-800` (Background) + `#FFFFFF` (Text)
*   **Secondary Action:** Transparent + Border `--sage-600`
*   **Success:** `--sage-600`
*   **Warning/Attention:** `--clay-600`

### Texture (The "Secret Sauce")
To instantly achieve the brand look, add this noise overlay to the `body` or main container:
```css
/* Subtle paper texture overlay */
body::after {
    content: '';
    position: fixed; inset: 0;
    background-image: url("data:image/svg+xml,..."); /* Standard SVG Noise */
    opacity: 0.025;
    pointer-events: none;
    z-index: 9999;
}
```

---

## 5. UI Component Guidance

### Buttons
*   **Shape:** Slightly rounded but authoritative. `border-radius: 4px` to `8px`. Avoid fully pill-shaped buttons for primary actions unless it's a specific "tag" or "chip" UI.
*   **Style:** Flat colors with subtle hover lifts.
*   **Gradients:** Allowed on "Special" buttons (e.g., 'Get Started'), usually fading from Dark Sage to Lighter Sage.

### Cards & Surfaces
*   **Concept:** "Paper on a desk."
*   **Appearance:**
    *   Background: `--background-white` or `--background-light`.
    *   Border: 1px solid `--border-medium` (`#e4dfd8`).
    *   Shadow: Warm and diffuse. `0px 4px 16px rgba(61, 56, 52, 0.10)`.
*   **Padding:** Generous. Don't cramp the content.

### Iconography
*   **Style:** Line icons (Lucide/Feather) are safe and match the `IBM Plex Sans` vibe.
*   **Color:** Tint icons with `--sage-600` or `--clay-500` rather than plain black.

---

## 6. Implementation Strategy for Agents

When building a new page:
1.  **Set the Stage:** Apply `Fraunces` headers, `IBM Plex` body, and the `Sand` background color immediately.
2.  **Build the Structure:** Create your grid.
3.  **Apply Identity:** Use `Sage` for your main distinct buttons/headers.
4.  **Add Warmth:** Use `Clay` for highlights.
5.  **Refine:** Add the noise texture and ensure spacing is comfortable (not tight).

**Remember:** If the app requires high-density data (like a spreadsheet view), prioritize legibility over decoration. You can drop the `Fraunces` headers in a data table context, but keep the `Sand` warmth in the background/borders to maintain the "room" feel.
