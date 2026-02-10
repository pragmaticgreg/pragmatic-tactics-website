# Pragmatic Tactics — Design Review & Redesign Notes

**Reviewed:** Homepage (`/`) and Owner Tactics service page (`/services/owner-tactics.html`)
**Date:** February 2026
**Perspective:** What I would have done differently if building from scratch, evaluated through the lens of visual design, UX, conversion, and brand distinctiveness.

---

## Overall Impression

The site is solidly built. Accessibility is thoughtful, the design system (Sand/Sage/Clay) is cohesive, and the copy is genuinely good — direct, empathetic, and free of consultant jargon. The Fraunces + IBM Plex Sans pairing is a strong choice. What follows isn't a list of problems — it's a list of missed opportunities to make a site that's already good feel *unforgettable*.

---

## 1. HOMEPAGE

### 1.1 Hero — Strong Copy, Underwhelming Stage

**What's there:** A bathymetry SVG background, split headline with slide-in animation, subtitle, and a single CTA.

**What I'd do differently:**

- **The bathymetry background is a missed connection.** It's visually interesting but has no obvious relationship to business consulting. It reads as decorative rather than intentional. I'd replace it with something that reinforces the "chaos to order" narrative — a visual that transitions from tangled/noisy on one side to clean/structured on the other. Could be abstract line art, a topographic contour that resolves into clear paths, or even a simple particle system that organizes itself on scroll. The metaphor should be *felt*, not just read.

- **The hero is too safe spatially.** Everything is centered, stacked vertically, and contained. For a brand that's about *execution* and *action*, the layout should feel more dynamic. I'd consider an asymmetric split — copy on the left with generous whitespace, a strong visual element on the right that anchors the page. Or a full-bleed editorial layout where the headline breaks the grid.

- **The animation is well-crafted but one-and-done.** The slide-in on the title lines is smooth (the cubic-bezier timing is nice), but once it fires, the hero becomes static. A subtle ambient element — the bathymetry lines slowly shifting, a gradient that breathes — would keep the section alive without being distracting.

- **One CTA is the right call, but it could land harder.** "Find Your Starting Point" is good copy. But the button itself (`.cta-primary` with sage background) doesn't contrast enough against the hero backdrop. On a page about *doing things differently*, the primary action should visually *pop*. I'd use the clay/orange accent for the hero CTA specifically, creating an unmistakable focal point.

### 1.2 About Section — Buried Too Deep, Formatted Too Plain

**What's there:** A two-column layout with circular photo and text. Positioned as the second section after the hero.

**What I'd do differently:**

- **This section carries the emotional core of the brand** — the "knowing what to do vs. actually doing it" tension. But it's presented as a standard image-text block that looks like every other consulting site. The inline blockquote with the cliched advisor quotes ("Work on your business, not in it") is self-aware and clever, but the styling (inline `style` attribute, generic formatting) undersells the punch.

- **I'd make this a full-width editorial moment.** Large pull-quote treatment for the cliched advice, crossed out or visually "tired" (muted, slightly rotated, maybe with a hand-drawn strikethrough effect), followed by a crisp, contrasting statement about what Pragmatic Tactics actually does. Make the visitor *feel* the difference between advice and execution.

- **The "Strategy without execution is hope / Execution without strategy is haste" closer** is excellent copy. It deserves to be a standalone visual element — a typographic statement piece with real presence, not a `.conclusion-statement` tucked inside a section. Large Fraunces, dramatic spacing, maybe the words "hope" and "haste" treated with color or weight to create visual tension.

### 1.3 "Sound Familiar?" — Good Mechanism, Rough Execution

**What's there:** A toggle between "Big Picture" and "By Industry" views, with industry selector buttons and pain-point checklists.

**What I'd do differently:**

- **The dual-view toggle is conceptually smart** but creates awkward UI states. The "Select your industry" prompt sits visible even in "Big Picture" mode, and the industry selector buttons appear/disappear with no spatial transition. The toggle-then-select is two interactions where one would do. I'd use the industry view as the default (more specific = more relatable) and let the "big picture" items appear as a universal introduction before the industry grid.

- **The pain-point items are visually monotonous.** Six identical cards with the same structure, same icon treatment, same spacing. After the second one, the eye glazes. I'd vary the visual rhythm — different card sizes, a masonry-style layout, or a conversational "thread" format where each pain point feels like a real person said it (which they did — they're written in first person, so lean into that).

- **The Lucide icons don't add information.** When every item has a small grey icon, none of them stand out. The icons are being used as decoration, not communication. I'd either make them larger and more distinctive (illustration-style, using the brand colors) or remove them entirely and let the copy carry the weight.

### 1.4 "How I Think About Your Business" — Framework Section

**What's there:** Three cards in a row — People, Process, Technology.

**What I'd do differently:**

- **This is the most "template consulting website" section on the page.** Three equal cards with icons and short text is the default layout for every business consultancy. The content is good, but the presentation doesn't earn a pause. I'd either make this a visual system (interconnected diagram, Venn overlap, animated flow between the three) or integrate it more tightly into the surrounding narrative rather than giving it its own section.

- **The `.ps-card` treatment is used here AND in the Foundation section below**, which makes them feel repetitive. If both sections use identical card designs, the visitor starts skipping. Differentiate the visual treatment.

### 1.5 "Find Your Starting Point" — Starter Projects

**What's there:** A horizontal timeline selector (Assess → Enable → Automate → Elevate) with nested project menus and detailed card templates.

**What I'd do differently:**

- **This is the most ambitious and well-built component on the site**, and it mostly works. The timeline metaphor, the nested tabs, the prerequisite pills, the expandable details — there's real thought here. But the information density is high. A first-time visitor hitting this section faces: a 4-step timeline, a horizontal scroll menu within each step, a card with value prop + description + CTA + expandable details. That's 3-4 levels of nesting.

- **I'd simplify the initial view dramatically.** Show the four phases as large, clickable cards with one-line descriptions. On click/selection, smoothly expand to reveal the starter projects within. Don't show everything at once. The progressive disclosure is already built into the `<details>` elements inside cards — extend that philosophy to the section level.

- **The CTA text on starter cards ("Improve Insights by 40%", "Start Your Process Audit") is inconsistent.** Some are benefit-oriented, some are action-oriented. Pick a pattern and stick with it across all cards. For a service-based business, action-oriented ("Start Your Process Audit") builds more trust than manufactured statistics ("Improve Insights by 40%") which feel borrowed from SaaS landing pages.

### 1.6 "The Pragmatic Foundation" — 9-Block Grid

**What's there:** Three tabbed panels (People/Process/Technology), each containing three cards in a grid, bookended by decorative SVG icons.

**What I'd do differently:**

- **Nine blocks across three tabs is too much.** This section asks visitors to click through tabs to read 18 paragraphs about foundational concepts. Most won't. The content is solid (Capacity, Clarity, Ability, Efficiency, Consistency, Sustainability, Utility, Connectivity, Agility) but it reads like a philosophy textbook, not a sales page.

- **I'd distill this to a single visual.** A 3x3 grid where all nine concepts are visible at once — each as a single word with an icon — and hovering/tapping reveals the detail text. Or present it as a layered diagram: People as the foundation, Process as the structure, Technology as the tools. The metaphor of "building from the ground up" is *in the copy* but not *in the design*.

### 1.7 Contact Form & Process Section

**What's there:** A popup contact form ("Let's Trade Insights") and a 4-step process timeline.

**What I'd do differently:**

- **The contact form is strong.** "Not a subscription — this is simply a contact form" is trust-building and genuine. The value exchange framing ("your experience for mine") is smart. No major changes needed here.

- **The Pragmatic Process section** (Discovery Call → Proposal → Map → Build & Launch) uses a central-axis timeline with alternating left/right cards. It's clean but the hexagonal cube decorations feel disconnected from the rest of the design language. I'd simplify to a straight vertical timeline and use the brand colors more intentionally to show progression.

### 1.8 Footer

- **Functional and fine.** One note: the footer has a newsletter signup that references MailerLite, but the main page contact form explicitly says "Not a subscription." Make sure these two mechanisms are clearly differentiated in the visitor's mind.

---

## 2. OWNER TACTICS SERVICE PAGE

### 2.1 Hero — Clean but Underpowered

**What's there:** Centered text with eyebrow, headline, subheadline, CTA, and secondary contact link. No background image or visual element.

**What I'd do differently:**

- **The homepage hero has a full-bleed SVG background. This page has nothing.** The contrast is jarring when navigating between them. The Owner Tactics page hero is a white box with centered text — the most generic landing page layout possible. For a $750 product with limited spots, the hero needs more visual weight and urgency.

- **I'd add a background treatment** — not the bathymetry, but something that visually communicates the "overwhelmed owner finding clarity" narrative. Even a subtle gradient wash from warm clay tones to clean sage would add atmosphere.

- **The eyebrow text ("For Revelstoke Business Owners with Teams of 3-20")** is doing important targeting work but is easy to miss at 14px uppercase. I'd make it more prominent — a badge-style treatment or a contrasting background chip.

- **The secondary CTA ("Not sure yet? Let's see if this is the right fit")** is excellent for conversion — it gives fence-sitters an escape hatch that still captures them. This is smart UX.

### 2.2 Pain Points — Good Content, Samey Cards

**What's there:** A 2-column grid of pain-point cards with left clay border and quotation mark prefix.

**What I'd do differently:**

- **The quotation-mark prefix + italic text is the right idea** — these feel like real things a business owner would say. But all six cards have identical styling, so the section reads as a wall of similar rectangles.

- **I'd pick 2-3 of these and make them visually dominant** (larger, featured), with the rest supporting. Or present them as a flowing conversation — a chat-style layout where each pain point appears as a "message bubble" from a frustrated owner. This format would feel more personal and less like a checklist.

### 2.3 Program Overview ("What This Is")

**What's there:** A single paragraph of body text.

**What I'd do differently:**

- **This is the right content in the wrong format.** A wall of text describing an 8-week engagement buries the key facts. I'd break this into a scannable format: a short intro sentence, then a visual element showing the 8-week arc, with key facts (1-on-1, custom, real changes implemented) called out as pull-quotes or stat blocks.

### 2.4 "What We Work On" — Accordion

**What's there:** Four accordion items with header + hook text + expandable content.

**What I'd do differently:**

- **The accordion is well-built** (good animation, accessible, clear triggers). But four items all collapsed by default means the visitor sees four bars with no content. Consider opening the first item by default so there's something to read without requiring interaction.

- **The hook text under each header is a great pattern** — it provides just enough context to decide whether to expand. This is one of the better UX patterns on the site. Keep it.

### 2.5 "How It Works" — Timeline

**What's there:** A vertical timeline with numbered nodes and expandable detail toggles.

**What I'd do differently:**

- **This is clean and effective.** The "Learn more" toggles with expandable detail content are well-implemented. The one thing I'd change: the timeline nodes are small sage circles. For an 8-week engagement where each phase has real duration, I'd make the timeline more proportional — the 2-week discovery phase should visually *feel* like 2 weeks relative to the 5-week session block. A proportional timeline communicates the time investment honestly.

### 2.6 Pricing Card

**What's there:** A centered card with large price, inclusion list, checkout button, and spots counter.

**What I'd do differently:**

- **The pricing card is solid.** The `$750` in large Fraunces, the per-session breakdown, the included items with checkmarks — it's all there. The hover effect (lift + border-color change to clay) adds a nice touch.

- **What's missing is comparison/anchoring.** The page mentions "future pricing will be $1,000+" but it's buried in small text. I'd make the anchor price more visible — a struck-through "$1,000" above the "$750" creates an immediate value frame. This is basic sales psychology but it works.

- **The spots counter is crucial for urgency** but it's styled as a small pill below the card. I'd integrate it into the card itself as a prominent visual element — maybe a progress-bar style indicator ("3 of 5 spots remaining") that makes scarcity tangible.

### 2.7 FAQ Accordion

- **Straightforward and well-implemented.** Uses the same `ob-accordion` pattern as the "What We Work On" section, which creates consistency. No major changes.

### 2.8 Contact Flow Modal

**What's there:** A multi-step progressive form (name → business type → team size → pain points → outcomes → context) with progress bar.

**What I'd do differently:**

- **This is the most sophisticated UX element on the entire site** and it's genuinely well done. The progressive disclosure, the chip-style selections, the progress bar, the step animations — this is thoughtful conversion design. The fact that it collects structured data (pain points, team size) before the final freeform message means Greg gets actionable context with every submission.

- **One concern: six steps might be too many for mobile.** Each step is lightweight, but the psychological cost of "6 steps" is higher than "3 steps." Consider combining some steps — name+email on step 1, business type+team size on step 2, pain points+outcomes on step 3. Same data, fewer perceived barriers.

### 2.9 Sticky Mobile CTA

**What's there:** A fixed bottom bar on mobile with the primary CTA, controlled by IntersectionObserver.

**What I'd do differently:**

- **This is exactly right.** Mobile visitors who scroll past the hero need a persistent path to action. The implementation (show after hero exits viewport, hide on scroll-up) is clean.

---

## 3. CROSS-CUTTING DESIGN OBSERVATIONS

### 3.1 Typography

- **Fraunces is a distinctive, excellent choice** for headings. It has personality without being decorative. IBM Plex Sans is a strong body font — readable, professional, slightly warmer than geometric sans-serifs.

- **The type scale could be more dramatic.** Section titles, card titles, and body text don't create enough contrast in size. When I scan the page, everything feels like it's in the 16-20px range with occasional bumps to 24-32px. I'd increase the spread: section titles at 40-48px, card titles at 22-24px, body at 16-17px. More contrast = easier scanning = better conversion.

### 3.2 Color

- **The Sand/Sage/Clay palette is genuinely good.** It feels grounded, professional, and distinct — not the blue/purple/white of 90% of consulting sites. But the palette is underutilized. Sage dominates headers and CTAs, clay appears only on the Owner Tactics page CTAs, and sand is everywhere as background. There's room to use clay more aggressively for emphasis and to introduce the deeper sage/sand tones for depth.

- **The alternating section backgrounds (sand-50 / sand-100 / sand-200)** create subtle separation but are so similar they almost blend together. I'd increase the contrast between alternating sections or use a different technique — a thin horizontal rule, a subtle texture change, or generous whitespace.

### 3.3 Spacing & Rhythm

- **Sections feel uniformly spaced.** Every section gets roughly the same padding (60-80px top/bottom), which creates a metronomic rhythm. Varying section padding based on content weight — more generous spacing around pivotal sections (hero, pricing, final CTA), tighter spacing around supporting sections — would create better visual hierarchy.

### 3.4 Motion & Animation

- **The reveal-on-scroll system is well-implemented** with staggered children, delay controls, and `prefers-reduced-motion` support. But the animations are all the same: fade-up with `translateY(20px)`. Every section reveals identically. I'd vary the animation type by section — fade-in for text, scale-up for cards, slide-in from the side for the timeline, etc. — to create more visual interest.

### 3.5 Imagery & Visual Assets

- **The site is almost entirely text + icons.** The only photograph is Greg's headshot. For a site about real businesses with real problems, this feels abstract. I'd add:
  - Contextual imagery in the industry sections (trades, manufacturing, etc.)
  - Before/after visual metaphors (tangled → organized, sticky notes → dashboard)
  - Screenshots or mockups showing what deliverables actually look like

- **The custom SVG illustrations** (cubes, plateau icon, target icon) are interesting but feel disconnected from each other. There's no consistent illustration style. I'd either develop a cohesive icon/illustration system or simplify to a single motif that carries through the site.

### 3.6 Social Proof

- **There is none.** No testimonials, case studies, client logos, or results metrics. For a consulting service — especially one at the pilot stage — this is understandable. But as the business matures, this is the single highest-impact design addition. Even one specific, attributed testimonial in the Owner Tactics pricing section would significantly boost conversion.

### 3.7 Navigation

- **The header has exactly two links: "Services" and "Schedule a Call."** This is admirably minimal. But "Services" currently points directly to the Owner Tactics page, which means there's no services overview. When more offerings are added, this will need a dropdown or intermediate page. Plan for it now to avoid a disruptive restructure later.

---

## 4. IF I WERE BUILDING FROM SCRATCH

### The Core Thesis

Pragmatic Tactics' brand promise is: *"Stop planning, start doing."* The design should embody that. Every element should feel like it's **moving forward** — not sitting still, not waiting for approval, not overthinking. The current design is polished but static. It looks like a site *about* execution rather than a site that *executes*.

### What I'd Change (Priority Order)

1. **Homepage hero:** Replace decorative background with a metaphorical visual that reinforces the chaos-to-order narrative. Make the CTA unmistakably the focal point (clay/orange, larger, more isolated whitespace around it).

2. **Type scale:** Increase contrast dramatically between heading levels. Let section titles command the viewport.

3. **Starter Projects section:** Simplify the initial view to four phase cards. Progressive disclosure for project details within each phase. Current nesting is too deep for first-time visitors.

4. **Pragmatic Foundation section:** Collapse from tabbed 3x3 grid to a single visible visual. Reduce cognitive load.

5. **Owner Tactics hero:** Add a background treatment. The white void doesn't match the investment level of the product being sold.

6. **Program Overview text block:** Restructure into scannable format with visual timeline showing the 8-week arc.

7. **Visual assets:** Develop a consistent illustration style. Add contextual imagery for industry sections. Plan for testimonials/social proof.

8. **Animation variety:** Diversify scroll-reveal animations beyond universal fade-up.

9. **Section spacing:** Vary padding to create visual hierarchy rather than uniform rhythm.

10. **Price anchoring:** Make the "$1,000+ future pricing" comparison more visible on the Owner Tactics pricing card.

---

## Summary

This site is in the top 20% of small-business consulting websites I've seen. The copy is strong, the technical execution is solid, and the design system is coherent. The improvements above are about pushing from "professional and clean" to "distinctive and memorable" — making the design work as hard as the copy already does.
