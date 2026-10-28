# Step 2 — References & Taste

_Imran Safdar · Portfolio Redesign · v1 · 28 October 2026_

This file records what Imran wants the portfolio to look and feel like. **Everything in section 2 is a requirement from Imran**, not a suggestion. Section 4 adds Claude's guardrails, so the requirements work together without hurting performance or credibility.

All references are **inspiration only, never copied**. Screenshots are in [`references/`](references/).

---

## 1. Reference images: what to take from each

| # | File | Take this | Leave this |
|---|---|---|---|
| 1–2 | `01-hero-grid-frame-1.png`, `02-hero-grid-frame-2.png` | (see list below) | Their copy, their image placeholder |
| 3 | `03-soft-cards.png` | (see list below) | Light theme, "Book a Free Call" agency tone, tool-logo row |
| 4 | `04-process-cards.png` | (see list below) | Light theme, generic icons |
| 5 | `05-grain-overlay-and-pill-nav.png` | (see list below) | Lime accent colour, condensed display font |
| 6–7 | `06-compact-nav-chip.png`, `07-compact-nav-and-case-study-header.png` | (see list below) | Light theme |

**What to take, per reference:**

- **Images 1–2 (hero with grid frame):**
  - the **framed grid layout**: the whole page sits in a bordered column
  - vertical rails running top to bottom
  - horizontal lines between sections
  - **diagonal hatch bands** as spacers between sections
  - **corner markers** at section corners
  - a two-column hero
  - small **monospace label + breadcrumb** above the headline ("#1 Global partner / WEALTH MANAGEMENT FIRM")
  - pill buttons: one solid, one ghost
- **Image 3 (soft cards):** the **card style**:
  - soft layered surface
  - inner border / bezel (a card inside a card edge)
  - large radius
  - icon tile at the top
  - title + short description
- **Image 4 (process cards):** the **process-card format**:
  - big step numbers (01 / 02 / 03)
  - slightly rotated cards
  - large faded outline icon in the background
  - hand-drawn connecting arrows
- **Image 5 (grain + pill nav):**
  - the **grain (noise) texture overlay** across the whole page
  - nav pill with a round avatar on the left
- **Images 6–7 (compact nav + case-study header):**
  - the **compact nav chip**: avatar + name + animated 3 dots
  - the **case-study header**: big headline, meta row (Client · Year), short intro, "Scope of Work"

---

## 2. Imran's requirements

### 2.1 Theme and colour

- **Dark theme only.**
  - Background: black or a black variant (near-black).
  - Text: white or a white variant (off-white).
- **The brand/accent colour is customizable from the admin app**, so Imran can test colours live.
- Styling should also be customizable from the admin side.

### 2.2 Global layout: the "framed grid"

- The whole site sits inside a **bordered frame**.
- **Vertical rails** run from the top of the page to the bottom.
- **Horizontal lines** separate sections.
- Between sections there's a **spacer band with a pattern**: diagonal hatch lines (as in images 1–2).
- **Corners are highlighted** at every section: **"+" crosshair markers** or corner ticks where lines meet.
- _Common names:_ framed / bordered grid layout, "blueprint" style, hatch separators, crosshair corner marks.

### 2.3 Background texture

- A subtle **overlay above all content** that is purely visual and can't be clicked.
- The reference (image 5) is a **grain / film-noise overlay**.
- If a regular dot pattern is preferred, that's a **dot-grid pattern** (Step 4 decides).
- Intensity: **slight**, much lighter than the reference.

### 2.4 Typography

- **Bold display font** for headlines.
- A **creative signature / script font** in a few places, for example a signature in About or handwritten notes beside screenshots.
- Monospace labels for small metadata (from image 1).

### 2.5 Navbar: "morphing nav"

1. **At the top of the page:** logo on the left, nav links in the centre, CTA button on the right.
2. **On scroll:** it compacts into a small **chip / pill**. The chip shows the logo or avatar, a word (name), and **3 animated dots** (images 6–7).
3. **On hover:** the chip **expands downward** and reveals the nav links.

_Common name:_ morphing / collapsing pill nav, similar to the iPhone's "Dynamic Island".

### 2.6 Cards, grids, and graphics

- **Bento grid** where the content suits it.
- **Soft layered cards** (image 3 style, in a dark version).
- **Process cards** (image 4 format) where something happens in steps.
- **Vector forms and graphics driven by the data and content**, where a section needs them. Examples: flow diagrams, architecture sketches, small charts.

### 2.7 Motion

- **GSAP** for all animation types:
  - scroll animation
  - text animation
  - section animation
- **Lenis** for smooth scrolling.

### 2.8 3D

- **3D visuals, shapes, patterns, and 3D touches**, only where they're needed.

### 2.9 Interactive character

- **AI clone avatar.** An avatar of Imran, made with AI, that **visitors can interact with**. Used where it suits.
- **Page mascot.** Like [koboyo.com/page-mascot](https://koboyo.com/page-mascot): a **React mascot that follows the visitor's cursor and blinks when poked**. It comes with 52 drawn characters, and an agent skill can draw a new one, **including one that looks like a real person**.

### 2.10 Admin app

An **advanced admin app inside the portfolio** to control everything:

- content
- sections
- pages
- styling, including the brand colour

---

## 3. Glossary (names of the effects)

| What Imran described | Name to use with designers / AI |
|---|---|
| Lines around the whole site, top to bottom | Framed grid layout / vertical rails / guide lines |
| Striped band between sections | Diagonal hatch separator (`repeating-linear-gradient`) |
| Highlighted "+" corners | Crosshair / plus markers, corner ticks, registration marks |
| Dotted/noisy overlay above everything | Grain / noise overlay (or dot-grid pattern) |
| Card with an edge inside the edge | Bezel card / inset border / layered card |
| Tilted numbered step cards with arrows | Process / step cards with connector arrows |
| Nav that shrinks into a pill and expands on hover | Morphing pill nav / "Dynamic Island" nav |
| Mixed-size card layout | Bento grid |
| Text appearing line by line | Split-text reveal (GSAP SplitText) |
| Smooth scrolling | Lenis smooth scroll |

---

## 4. Claude's guardrails (keep the wishlist working together)

### 4.1 One character, not two

- The **AI clone avatar** and the **page mascot** should be **the same character**: a mascot drawn to look like Imran, which follows the cursor and reacts when poked.
- Two characters on one page compete for attention and look gimmicky to recruiters.
- **"Interactive"** could also mean an **"Ask my AI" chat**: visitors ask "Has Imran worked with Stripe?" and get answers **only from the profile brief**.
  - This is genuinely useful for recruiters.
  - It needs an LLM API with a cost cap, rate limiting, and strict grounding, so it never invents claims.
- **DECIDED (29 Oct):** a **portfolio buddy**. A mascot that looks like Imran, knows about him, guides visitors through each section, and moves with the page; plus chat. Full design in [`03-reverse-engineering.md` §4.4](03-reverse-engineering.md).

### 4.2 The avatar must be clearly a character

- A **stylized/illustrated** avatar is fine and fun.
- A **photorealistic AI "clone"** that looks almost real reads as fake.
- The real portrait (from the Step 1 asset list) still appears, for example in About.

### 4.3 Motion budget, not "animation everywhere"

- Every section gets **one main motion idea** with a purpose:
  - reveal the headline
  - show a project
  - draw a diagram
- Small hover details are fine on top of that.
- If everything moves, nothing stands out, and recruiters scanning quickly get slowed down.
- **`prefers-reduced-motion` is respected everywhere.** Lenis and heavy scroll effects turn off for users who ask for less motion.
- **Stack note:** the repo currently uses the `motion` package. If GSAP becomes the main engine, we use one animation library, not two. GSAP and all its plugins (ScrollTrigger, SplitText) are free.

### 4.4 3D only where it earns its place

- **At most one or two 3D moments** on the home page. For example, a hero accent object, or a 3D treatment of one case study.
- They are **lazy-loaded**, with a static image fallback on low-end devices and reduced motion.
- The 3D-heavy site analysed in the video scored **68** on Lighthouse performance. That's the trap to avoid.

### 4.5 Performance budget (agreed now, checked in Step 8)

- **Mobile Lighthouse:**
  - Performance ≥ 90
  - Accessibility ≥ 95
  - SEO ≥ 95
- **Core Web Vitals:**
  - LCP < 2.5 s
  - CLS < 0.1
  - INP < 200 ms
- **Implementation rules:**
  - The grain overlay is a **static tiled texture**. Animated noise burns CPU on every frame.
  - The mascot, chat, and 3D load **after** the main content.

### 4.6 Admin app: content-driven, not a free-form page builder

- The animated sections are carefully designed components. A drag-anything page builder would break the design.
- **The admin controls:**
  - **Content:** all text, projects, case studies, screenshots, testimonials, experience, links, SEO fields
  - **Sections:** order, show/hide, which variant
  - **Pages:** case-study pages created from a template
  - **Styling:** brand colour, and possibly secondary tokens (radius, grain intensity, mascot on/off), through **design tokens**. A **contrast check** warns when a colour is unreadable.
- **The site stays fast:** pages are statically generated and refresh when the admin saves (Next.js revalidation), not built on every visit.
- **DECIDED (29 Oct):** **(A) custom, full-stack inside the same Next.js app, with MongoDB.** Design in [`03-reverse-engineering.md` §4.5](03-reverse-engineering.md). The options considered were:
  - **(A) Custom admin.** Built by Imran with Next.js, auth, RBAC, and a database.
    - It becomes **its own portfolio piece**: it shows exactly the skills the site claims.
    - Larger effort.
  - **(B) Payload CMS.** Runs inside the same Next.js app and gives a full admin quickly.
    - Less to show off.

### 4.7 Credibility check

- Every effect must make the evidence (case studies, screenshots, problems solved) **easier** to see, never harder.
- If an effect competes with a case study, the case study wins.

---

## 5. Still missing (fill in Step 3 or Step 4, no need to hunt now)

| Gap | Why it matters | Plan |
|---|---|---|
| **Case-study page** beyond the header | The most important page type | Image 7 gives the header. Claude proposes the full page structure in Step 3 |
| **Accent colour** | Brand feel | Pick 3–4 candidates in Step 4; Imran tests them live via the admin later |
| **Display + signature fonts** | Personality | Claude proposes 2–3 font pairings in Step 4 with previews |
| **What kind of 3D** | Avoid random 3D | Decided per section in Step 3 |
| **Mascot vs chat** | Scope and cost | Decision 4.1 |
| **Admin approach** | Effort and timeline | Decision 4.6 |
