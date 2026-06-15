# Formix Template Audit — Reference for Imran's Portfolio Polish

Source: https://formix.framer.website/ (Framer design-subscription agency template)
Purpose: Extract elements worth adopting for Imran's AI-product-engineer portfolio. Filtered through one question: does this make a technical SaaS founder trust Imran more, or less?

---

## CRITICAL CONTEXT — read before adopting anything

Formix is an **agency sales template**, light theme, built to sell a design *subscription*. Imran's site is a **dark, editorial, senior engineer's portfolio**. So we adopt *techniques and structure*, never the literal look. Copying Formix's light theme, its agency voice, or its maximalism would undo the positioning. We translate each idea into Imran's dark + coral + Instrument Serif + Geist system.

---

## ELEMENT-BY-ELEMENT VERDICT (Imran's 9 points)

### 1. Border/grid lines framing the whole page + each section — ADOPT (high value)
The faint dotted/solid border lines wrapping the layout and sections give a "blueprint / engineered" feel. This is PERFECT for an engineer's positioning — it reads technical and intentional. Translate to: subtle 1px border-border vertical rails at the container edges + faint section dividers. Keep it whisper-quiet (low opacity) so it's atmosphere, not a cage.

### 2. Hero layout — ADOPT SELECTIVELY
Formix hero: eyebrow badge, huge headline with two-tone (black + gray) emphasis, subhead, two CTAs, a large product visual on the right. Imran already has a strong hero with the chat. DO NOT replace the chat — it's the signature. But worth borrowing: the two-tone headline emphasis (we use Instrument Serif italic instead of gray, already doing this) and the availability badge concept (see point 5).

### 3. Opacity/scroll-reveal paragraph (the "Why Formix" big text that fills in as you scroll) — ADOPT for About
Large paragraph where words shift from muted to full opacity as you scroll through it. This is a genuinely premium effect (GSAP ScrollTrigger, word-by-word opacity). GREAT fit for Imran's About section — turns a static paragraph into a moment. Adopt.

### 4. Services sticky-scroll cards — ALREADY HAVE (don't duplicate)
Formix uses sticky-scroll stacking cards for Services. Imran ALREADY built sticky-scroll for Selected Work. Adopting it again for another section = two sticky-scroll sections = repetitive. Verdict: do NOT add a second sticky-scroll. The Selected Work one is enough. Maybe borrow the card *styling* (the "what's included" checklist sub-list) for richness, but not the scroll mechanic again.

### 5. Rounded section badges (/ 002 / WHY FORMIX etc.) — ADOPT (high value, easy)
Each section has a small rounded pill badge with a number + label (e.g. "/ 003 / SERVICES"). This is cohesive, editorial, and adds the "designed" feel cheaply. Imran already uses mono eyebrows — upgrade them to rounded pill badges with section numbers. Low effort, high polish. Adopt.

### 6. Card UI/layout/colors/focus/background — ADOPT the PRINCIPLE
Formix cards: clean, generous padding, clear focus, product imagery, light bg with one dark "featured" card. Translate to Imran's dark system: he already has good cards. Borrow the idea of ONE featured/inverted card in a group (Formix inverts the middle pricing card to black) — Imran could invert one card to coral-tinted or lighter to create focus. Adopt selectively.

### 7. Scrolling marquee strips with horizontal animation — ADOPT (with caution)
Formix uses horizontal scrolling strips (logos, "Book an intro call" repeating text, stats). These add energy and motion. Imran can use a strip for: a stats/credibility bar, or a repeating-text strip near the CTA. CAUTION: Imran has no client logos worth showing (established earlier), so NO logo marquee. A *stats* strip or a *repeating-CTA-text* strip works. Adopt 1 strip max, not everywhere.

### 8. Extra trust sections (Benefits, Pricing, FAQs, comparison) — ADOPT SOME, REJECT OTHERS
- Benefits section (6-card bento "More design, fewer headaches"): ADOPT as a bento — good fit, see below.
- FAQ section: ADOPT — Imran CUT this earlier, but a short FAQ genuinely reduces client hesitation. Reintroduce a tight 5-6 question FAQ. Reverses an earlier decision, justified.
- Pricing section: REJECT (mostly). Imran does custom project work, not fixed monthly tiers. Publishing fixed prices can hurt high-value custom deals. Could do a "engagement models" section (fractional / MVP / integration) WITHOUT hard prices. Adopt as engagement-models, not pricing.
- Comparison section: OPTIONAL — "me vs hiring a dev + an AI engineer separately" could be a strong comparison framing his unique value. Consider.

### 9. Footer layout — ADOPT
Formix footer: newsletter, multi-column nav/resources/contact, big wordmark, social icons. Imran's footer is currently simple. Borrow the multi-column structure + the large wordmark flourish. Drop the newsletter (Imran has no newsletter; friction without value). Adopt structure, skip newsletter.

---

## BENTO GRID — where it actually fits on Imran's site

Imran wants bento. Formix's Benefits section is the right model (6 cards, numbered, icon + title + desc). On Imran's site, bento fits BEST for:
- A NEW "Why work with me" / benefits section (predictable, fast, AI-native, senior, etc.) — bento-grid of 4-6 cards. This is the natural bento home.
- NOT for Process (sequential, has the line), NOT Testimonials (text), NOT About (prose).
One bento section, well-placed. Not bento everywhere.

---

## ADOPT LIST (final, prioritized)

HIGH VALUE:
1. Page border/grid rails (engineered feel) — translate to dark, subtle
2. Rounded numbered section badges (replace plain eyebrows)
3. Scroll-reveal opacity paragraph for About
4. New bento "Why work with me" section
5. Reintroduce a tight FAQ section (trust)
6. Richer footer (multi-column + wordmark, no newsletter)

MEDIUM VALUE:
7. One animated strip (stats or repeating CTA text) — not logos
8. One inverted/featured card in a card group for focus
9. "What's included" checklist sub-lists inside service cards
10. Engagement-models section (NOT fixed pricing)

REJECT / CAUTION:
- Second sticky-scroll section (already have one)
- Logo marquee (no recognizable client logos)
- Fixed monthly pricing tiers (hurts custom deals)
- Light theme, agency voice, any literal visual copying
- Maximalism — adopt techniques, keep the editorial restraint

---

## LOCKED DECISIONS (confirmed by Imran)
- PRICING: No fixed price tiers. Build an "Engagement models" section instead — fractional engineering / MVP build / AI integration — described WITHOUT hard numbers. Preserves value-based pricing leverage.
- FAQ: Reintroduce a tight FAQ section (5-6 questions) for client-hesitation reduction. Reverses the earlier cut, justified by trust-building goal.

## TRANSLATION RULES (how Formix → Imran)
- Formix light bg  →  Imran #0A0A0A dark
- Formix black accents  →  Imran #E97757 coral
- Formix generic sans  →  Geist + Instrument Serif
- Formix agency "we" voice  →  Imran first-person "I"
- Formix stock 3D product renders  →  Imran's REAL project screenshots
- Formix subscription/pricing framing  →  Imran's custom engagement framing

Every borrowed element gets recolored, re-typed, and re-voiced into Imran's system. Never copy the surface.

---
---

# TEMPLATE 2 — RAMA (rama.framer.media) — the Work section

What Imran wants: the Work section's pinned-card scroll behavior. ADOPT — this is an UPGRADE to the existing sticky-scroll, not a second one.

How Rama's works section behaves (per Imran's breakdown, confirmed by structure):
- ONE main sticky case-study card pinned in view.
- Left = case study details (title, year, timeline, services, read-case-study). Right = image block.
- The image block is the FULL height/width of the card's right side — a real image block, NOT a small framed screenshot floating in space (this fixes Imran's earlier complaint that the image side looked weak).
- On scroll: the right image animates — current image slides up/out from bottom while the next image is revealed beneath it (a vertical reveal/cover transition between projects). When the new image is fully in place, the LEFT text block swaps to the new project's details.
- So scrolling drives: image transition → text swap → next project, all within one pinned card.

VERDICT: This REPLACES Imran's current sticky-scroll Selected Work implementation with a better version. Key improvements to make:
1. Image becomes a full-bleed block filling the card's right half (no inner frame, no floating screenshot) — solves the weak-image-side problem directly.
2. Add the vertical image cover/reveal transition between projects (GSAP).
3. Text block animates/swaps in sync with the image change.
This is the single biggest visual upgrade available. Keep the Problem/Decision/Outcome content; just upgrade the container + transitions.

Translate: Rama is dark already (good), but recolor accents to coral, keep Geist + Instrument Serif.

# TEMPLATE 3 — SKYRIS (skyris.framer.website) — Bento grid

What Imran wants: the bento grid layout for a section that needs it.
Skyris bento ("Launch Your Website Fast & Smart"): asymmetric grid — one wide card top-left, a tall image card top-right, two small cards bottom-left, one dark featured card bottom-right. Mixed sizes, icons, one inverted dark card for focus.

VERDICT: This is the model for Imran's NEW bento section. Best home (confirmed from Formix audit): a "Why work with me" / benefits bento — 4-6 cards, mixed sizes, one inverted/coral-featured card. Adopt the asymmetric-sizing + one-featured-card principle. NOT bento everywhere — one bento section only.

# TEMPLATES 4 & 5 — LINEAR + RESEND (already primary references)

Already locked as reference sites in the design phase. Roles confirmed:
- LINEAR: typographic hierarchy, generous whitespace, restraint, the feature-grid bento sensibility, the "looks like a tool founders trust" credibility.
- RESEND: dark + technical with one or two live product moments; restraint elsewhere so the moments land.
No new extraction needed — these set the overall taste bar (senior, restrained, confident) that everything else is filtered through.

---
---

# CONSOLIDATED POLISH PLAN (all templates reconciled)

Ordered by impact. Each is a build-phase task, dark + coral + Geist/Instrument Serif, first-person voice, real screenshots.

## TIER 1 — biggest visual upgrades
1. REBUILD Selected Work with Rama-style pinned card: full-bleed image block (no floating frame), vertical image cover/reveal transition between projects, text swaps in sync. Replaces current sticky-scroll. (Fixes the weak image side.)
2. Page border/grid rails (Formix) — subtle dark blueprint framing on container + section dividers.
3. Numbered rounded section badges (Formix) — replace plain mono eyebrows site-wide.

## TIER 2 — new sections (trust + richness)
4. NEW bento "Why work with me" section (Skyris model) — 4-6 mixed-size cards, one coral-featured, with the spotlight/glow language already built.
5. Reintroduce tight FAQ section (5-6 founder questions) — LOCKED.
6. NEW engagement-models section (fractional / MVP / AI integration), NO fixed prices — LOCKED.
7. Scroll-reveal opacity paragraph for About (Formix "why" effect).

## TIER 3 — polish details
8. One animated strip (stats or repeating-CTA text) — NOT logos. One only.
9. Richer multi-column footer + large wordmark flourish (Formix/Rama) — no newsletter.
10. "What's included" checklist sub-lists inside relevant cards (Formix).

## REJECTED (do not build)
- Second sticky-scroll (Rama upgrade replaces, doesn't add)
- Logo marquee (no recognizable logos)
- Fixed pricing tiers (all three templates show them; all wrong for custom work)
- Newsletter signup
- Light theme / agency voice / literal copying / blog section (no content to sustain it)

## STILL-PENDING CONTENT (separate from polish, needed for launch)
- 3 remaining real project screenshots (now full-bleed blocks — even more important)
- SEO metadata rewrite (still old "Full-Stack Developer" positioning) — LAUNCH BLOCKER
- Real booking link, real WhatsApp number, OG image
- Decide "Read full case study" → real pages or remove dead # links
