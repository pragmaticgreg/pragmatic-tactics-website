# Ops Basecamp — Landing Page Strategy
## Compiled from 3 independent research sources · Decisions made for our context

---

## How to Read This Document

This is the **decision layer** between the raw research and the design brief. Where all three sources agreed, I've adopted the recommendation outright. Where they diverged, I've made a call based on what makes sense for our specific offer, audience, and constraints. Anything cut is noted with reasoning.

---

## Page Structure (Final Recommended Order)

All three sources converged on a similar flow. Here's what we're going with:

1. **Hero** — Headline + subheadline + primary CTA + context line (spots, location, date)
2. **Pain Points** — "Sound Familiar?" section, visible, no accordions
3. **Program Overview** — What this is, 3–4 sentences, grounded and direct
4. **What We Work On** — 4 categories, expandable (collapsed by default)
5. **How It Works** — Visual timeline, 4 steps
6. **What You Get** — 4 deliverables, visible, no accordions
7. **About Greg** — Short founder section with photo
8. **Pricing** — Single card, no tiers, CTA repeated
9. **FAQ** — Accordion format
10. **Final CTA** — Closing line + button

This is unchanged from the design brief, which is a good sign — the research validates the structure.

---

## Decisions: What We're Adopting

### ✅ Sticky Mobile CTA
**All three sources recommended this.** A small fixed button at the bottom of mobile screens once the user scrolls past the hero. This is non-negotiable for mobile conversion at this price point.

**Implementation:** Subtle, doesn't obscure content. Appears after scrolling past the hero section. Same CTA copy as the primary button.

### ✅ Benefit-Driven CTA Copy (4–5 words)
All sources agreed: "Buy Now" and "Get Started" are wrong for a $750 service. Longer, specific CTAs outperform.

**Our CTA:** "Reserve Your Spot — $750"  
**Why:** Includes the action, the scarcity signal (spot), and the price — which removes a click barrier. At $750, showing the price in the CTA is a strength, not a weakness, because it's low enough to be a "no-brainer" for the right person.

**Micro-copy below CTA:** "Pilot cohort · 6–8 spots · Starts late February"

### ✅ Single Pricing Card, No Tiers
Unanimous. One price, one offer. No Gold/Silver/Bronze. No "starting at." This is a fixed-scope program at a fixed price.

**Presentation:** Clean card with price ($750), what's included (short list), payment terms (paid in advance), and CTA button. Include a value-framing line like "6 hours of 1-on-1 consulting + a custom operational roadmap. Future cohorts: $1,500+."

### ✅ Founder Section Instead of Testimonials
All three sources agree: for pilot offers without testimonials, **founder credibility is the #1 trust signal.** Photo + short story + specific experience beats any workaround.

**What to include:**
- Photo (real, not polished headshot — on-brand for your positioning)
- 2–3 sentences: who you are, that you run your own businesses (including manufacturing), that you're local to Revelstoke, and that you're not a traditional consultant
- Tone: "I build things and fix operations. I'm not going to sell you a framework or a mindset shift."

**What to cut:** One source suggested a "Founder's Letter" format. Too much for this page — our audience doesn't want to read a letter. Short and punchy wins.

### ✅ LocalBusiness Schema Markup (JSON-LD)
All three sources flagged this as essential for local SEO in 2026.

**Include in schema:**
- Business name (Pragmatic Tactics)
- Service name (Ops Basecamp)
- Location (Revelstoke, BC)
- Price ($750)
- Service type (Business Consulting / Operational Consulting)

**Also:** Consistent city mention in H1/H2s and body copy. Footer with business name + Revelstoke, BC. Link from Google Business Profile to this page.

### ✅ Accordion Content Is SEO-Safe (With a Caveat)
All three confirmed Google indexes accordion content that's in the DOM on page load. However, two sources noted that **visible content may rank slightly better** for primary keywords.

**Our approach:** Keep all core value prop, outcomes, and pricing visible. Only use accordions for:
- "What We Work On" expanded details
- FAQ answers
- Any deep-dive session details

**Do NOT accordion:** Headlines, pain points, deliverables, pricing, timeline overview. These stay fully visible.

### ✅ Genuine Scarcity Display
All three sources agreed: real scarcity (6–8 spots) is a major advantage. Display it honestly and update it manually as spots fill.

**Implementation:** A simple "X spots remaining" indicator near the pricing section. Update manually. Don't pair it with countdown timers or fake urgency — the hard enrollment deadline is enough.

**Language:** "6–8 spots available for Revelstoke businesses" → updates to "4 spots remaining" as they fill. Tied to quality ("limited to ensure 1-on-1 focus"), not FOMO.

### ✅ CTA Placement: 3–4 Times
Sources agreed on 3–4 CTA placements. More than that feels pushy for a local service page.

**Our placements:**
1. Hero (above the fold)
2. After "How It Works" / timeline section
3. Pricing card
4. Final CTA section
5. Sticky mobile button (passive, doesn't count as a "placement")

### ✅ Local SEO Signals Throughout
All sources emphasized weaving location naturally into the page.

**Specifics:**
- H1 should include "Revelstoke" naturally
- At least one H2 references the local context
- Body copy mentions "Revelstoke" 3–4 times without forcing it
- Footer includes business name + city + province
- Title tag: "Ops Basecamp | Operational Consulting for Revelstoke Small Businesses"
- Meta description: Include "Revelstoke," "8-week," "$750," "small business," "1-on-1"

### ✅ "Who This Is NOT For" in FAQ
Two sources specifically recommended this as both a trust signal and a lead qualifier. Repels bad fits, builds confidence with good fits.

**Already in our FAQ.** Keep it.

### ✅ Process Transparency as Proof
Two sources recommended showing "how you work" as a substitute for testimonials. The timeline/How It Works section already does this. No additional work needed.

---

## Decisions: What We're Cutting

### ❌ Video Introduction (60–90 second face-to-camera)
One source strongly recommended this. It's a good idea in theory, but:
- It's a production barrier that delays launch
- Our audience is arriving via warm referral — they likely already know Greg or know someone who does
- The founder section with photo + direct copy serves the same trust function for this audience

**Revisit for Cohort 2** when we have more time and potentially testimonial clips.

### ❌ Diagnostic Quiz / Mini-Audit Embed
Two sources recommended an interactive quiz ("Is your business ready for Basecamp?"). Cutting it because:
- It adds development complexity for the pilot page
- Our enrollment is first-come-first-served, not qualification-based
- The pain points section already serves as a self-selection filter
- A quiz creates friction before the CTA when our warm audience doesn't need it

**Revisit later** as a standalone lead-gen tool or blog post, not on the landing page.

### ❌ "Chaos vs. Clarity" Before/After Visual
One source recommended a visual before/after contrast section. Cutting it because:
- It risks looking like a course sales page or coaching funnel
- The pain points section already establishes "where you are" and the deliverables section establishes "where you'll be"
- Our audience is skeptical of polished marketing visuals

### ❌ Secondary CTA ("Download Program Outline" PDF)
One source recommended a secondary CTA for people not ready to buy. Cutting for the pilot because:
- This is warm traffic with 6–8 spots — we don't need a nurture funnel
- A PDF download adds production time and splits attention from the primary action
- If someone isn't ready to commit at $750 from a warm referral, a PDF won't close them

**Revisit** if we move to cold traffic or larger cohorts.

### ❌ Supporting Blog Posts for SEO
One source recommended 2–3 supporting blog posts linking to the landing page. Cutting for launch because:
- This is a pilot with a 2-week enrollment window — blog SEO won't rank in time
- Traffic is direct/referral, not organic search
- Focus all content energy on making the landing page excellent

**Revisit** for future cohorts when organic discovery matters more.

### ❌ Embedded Google Map
One source suggested embedding a map of Revelstoke. Cutting because:
- No physical storefront or office to pin
- Adds visual clutter for marginal SEO benefit
- The location is communicated clearly through copy and schema

### ❌ "Feature-Benefit Grid" as a Separate Section
One source recommended a grid mapping features to outcomes. We're already covering this through the "What You Get" deliverables section and the expandable "What We Work On" categories. Adding a separate grid would be redundant.

---

## Decisions: What to Modify From the Design Brief

### 🔄 Hero Headline — Add Location
Research strongly supports including "Revelstoke" in the H1 for local SEO.

**Updated headline options:**
- "Your Business Has Outgrown Your Systems. Let's Fix That." → Still good, but add "For Revelstoke Business Owners" as a pre-headline or eyebrow text above it
- Alternative: "Revelstoke Business Owners: Stop Running Your Business From Your Head"

**Recommendation:** Use an eyebrow line ("For Revelstoke Business Owners with Teams of 3–20") above the main headline. Keeps the headline punchy while getting the local signal in the H1 region.

### 🔄 Accordion Headers — Make Benefit-Driven
Research says accordion headlines should hook interest, not just label content. Update the "What We Work On" headers:

**Current → Updated:**
- "Leveraging What You Already Have" → good as-is, it's already benefit-oriented
- "AI & Modern Tools" → "AI & Modern Tools — Cut Through the Hype"
- "Process & Delegation" → "Process & Delegation — Get It Out of Your Head"
- "Team Capacity & Development" → "Your Team — Do More Without Hiring More"

### 🔄 Pricing Section — Add Value Framing
Research supports framing the price relative to future cost and the value delivered.

**Add near the price:**
- "Pilot pricing — future cohorts will be $1,500+"
- "6 hours of 1-on-1 consulting + custom roadmap + implementation support"
- A simple per-session breakdown can help: "That's less than $125/session for personalized operational consulting"

### 🔄 About Section — Emphasize Anti-Consultant Positioning
Research confirms that for this audience, the "I'm not a coach, I'm a builder" angle is a major trust signal.

**Lean into:**
- Runs his own manufacturing business
- Not a traditional consultant — fills the gap between knowing something needs to change and actually making it happen
- Local to Revelstoke

**Avoid:** Lists of credentials, corporate language, anything that sounds like a LinkedIn bio.

---

## Technical Requirements (From Research)

These are additions to the design brief's functional requirements:

- **Sticky mobile CTA:** Fixed bottom bar on mobile, appears after scrolling past hero
- **Schema markup:** JSON-LD with LocalBusiness + Service + Offer schema
- **Title tag:** "Ops Basecamp | Operational Consulting for Revelstoke Small Businesses"
- **Meta description:** Under 160 chars, include: Revelstoke, 8-week, 1-on-1, $750, limited spots
- **Page URL:** `/ops-basecamp` (clean, distinct)
- **Canonical tag:** Self-referencing on the landing page
- **Spots counter:** A manually updatable "X spots remaining" element near the pricing section
- **CTA placements:** Hero, after timeline, pricing card, final section, plus sticky mobile
- **Open Graph tags:** For social sharing when the link gets texted/DM'd around town

---

## Summary: The 5 Things That Will Make or Break This Page

In priority order:

1. **Greg's photo + 2–3 sentences of real positioning** — This IS the trust signal for a pilot. No testimonials needed if this section is authentic and specific.
2. **Clear, visible program structure** — The timeline/How It Works section must make someone feel confident they know exactly what they're signing up for. This justifies the $750 without a sales call.
3. **Single price, no friction, sticky CTA** — One price, one action, always accessible. "Reserve Your Spot — $750" with spots remaining nearby.
4. **Pain points that feel like their inner monologue** — If they read the "Sound Familiar?" section and think "how do you know my life," you've won.
5. **LocalBusiness schema + Revelstoke throughout** — Even if this pilot fills via word of mouth, the SEO foundation pays off for every future cohort.

Everything else is optimization. Get these five right first.
