# Step 2b — Reference Reverse-Engineering & Build Direction

_Imran Safdar · Portfolio Redesign · v1 · 29 October 2026_

## How to read this file

This file breaks down Imran's three linked references, taken from their real code (HTML, CSS, animation configs and scripts), and records **how we will build** using what we learned.

- It extends [`02-references-and-taste.md`](02-references-and-taste.md), which covers the screenshot references and Imran's requirements.
- **Rama is the primary reference.** Imran likes it most: sections, animations, image scroll effects, and especially the project/case-study presentation.
- **Formax** and **page-mascot** are secondary references.

**Rule:** we take **concepts, structure, motion values and design logic**. We never take their code, images, logos or copy. Rama and Formax are commercial templates. Everything gets rebuilt in our own Next.js code.

Screenshots: `references/08-rama-hero.png`, `references/09-rama-case-study.png`, `references/10-formax-hero.png`.

---

## 1. Rama: https://rama-agency.webflow.io (primary)

### 1.1 Stack (from the page source)

- **Animation:** GSAP 3.15 with **ScrollTrigger, SplitText, Flip, CustomEase**
- **Smooth scroll:** **Lenis 1.2**
- **3D:** **no WebGL / Three.js.** The "3D look" comes from rendered images and video.
- **Platform:** Webflow interactions. Small custom scripts handle the wiggle text, counters, marquee, services rows, video toggle, and the logo flip.

> Key insight: Rama's 3D feel (puffy inflated objects, a smiley, a lightning bolt) is **pre-rendered media, not real-time 3D**. That's why it looks rich without heavy GPU cost. We copy that approach (see 4.6).

### 1.2 Design tokens (from its CSS variables)

**Colour**

| Token | Value | Role |
|---|---|---|
| `--black-solid` | `#000000` | Page background |
| `--dark-grey` | `#151515` | Raised surfaces |
| `--grey-100` | `#333333` | Lines, borders, idle card border |
| `--grey-200` | `#6e6e6e` | Inactive text (services rows) |
| `--grey-300` | `#8a8a8a` | Muted text |
| `--grey-400` | `#a4a4a4` | Secondary text |
| `--white` | `#eeeeee` | Main text (off-white, never pure white) |
| `--primary` | `#e5b60c` | **The only accent** (gold/yellow) |
| `--primary-dark` | `#bf9600` | Accent hover/pressed |

The colour logic: **black + a grey ramp + off-white + exactly one accent.** The accent is used for:

- CTA fills
- script labels
- availability dots
- card borders on hover
- links

**Typography**

| Role | Font | Notes |
|---|---|---|
| Display / headings | **Mohave** (400/600/700) | Condensed, bold, often UPPERCASE. Tight letter-spacing −0.07em, line-height 0.9 |
| Body / UI | **Satoshi** (400/500/700) | Letter-spacing −0.04em, line-height 1.4. Satoshi is already loaded in our repo |
| Script labels | **Rock Salt** (`Rocksalt`) | Handwritten "signature" font for small labels: "We are", "Manifesto", "The Challenges". Coloured with the accent |

**Type scale** (desktop / tablet / mobile)

| Style | Desktop | Tablet | Mobile | Line-height |
|---|---|---|---|---|
| H1 | 8.75rem | 6.875rem | 4.5rem | 0.9 |
| H2 | 5.5rem | 4.375rem | 3.125rem | 1.1 |
| Display-1 | 5.5rem | — | 4rem | — |
| H3 | 2.5rem | — | — | — |
| Subheading-1 | 3rem | — | 2rem | — |
| Body | 1.125rem | — | — | — |
| Body-large | 1.5rem | — | — | — |
| Label | 0.875rem | — | — | — |

**Spacing**

- Section padding: **9.375rem** desktop, **4rem** mobile.
- Steps: 0.25 / 0.5 / 0.75 / 1 / 1.25 / 1.5 / 1.75 / 2rem.

### 1.3 Homepage sections

| # | Section | What it is | How it moves |
|---|---|---|---|
| 1 | **Nav** | Hamburger at top-right opens a full menu with big links, socials, and email | Hover rolls the label; the menu opens with a timeline |
| 2 | **Hero** | **Left:** a giant wordmark logo, then an availability block ("● Open for project / Jan '26" and local time "08:46 Jakarta"), a script label "We are", a bold H1, one line of copy, and a **full-width accent CTA bar**. **Right:** a large hero video with pause/play | **The giant hero logo flies into the navbar on scroll (GSAP Flip, 0.45s).** Text reveals in lines |
| 3 | **Manifesto** | Full-bleed parallax photo with a huge stacked statement, "NO / BORING / STUFF", and a short line | Background parallax; words stagger in |
| 4 | **Works: "Top Picks" (pinned)** | A marquee title "WORKS (03)" scrolls endlessly. Then a **pinned case-card** shows one featured project at a time: logo, heading, Year / Timeline / Services, and "Read Case Study" | As you scroll, **project info rolls up like an odometer**, the **image wipes** to the next project (the image moves up while its mask moves down), and **progress lines** fill in the side nav |
| 5 | **Work grid** | Cards with logo, title, image | Hover: the background fills upward, the border turns accent, the image scales |
| 6 | **Services (scroll list)** | Numbered rows ("(01) BRANDING", "(02) SOCIAL MEDIA"…), each with an image | The row at screen centre activates: **its image pops in** (scale 0.5→1, slides in, fades in) and the **text shifts right and turns white**. Inactive rows are grey |
| 7 | **Why us** | Short statement, parallax photos, and **counters** (90 / 100% / 14M+) | Counters count up on enter. The stats column scrolls at an offset (parallax column) |
| 8 | **Testimonials** | Quote tabs switched by client-logo tabs and arrows | Quote fades in, rising 12px |
| 9 | **Team (sticky)** | Sticky big title "THE CHOSEN ONES" over a grunge texture; member cards scroll past | Background rotates −9°→0° and scales 0.7→1; cards scale 0.7→1 (scroll-linked) |
| 10 | **Pricing** | Monthly/yearly toggle, 3 plans | Toggle switch |
| 11 | **FAQ** | Accordion with dividers | Opens on click |
| 12 | **Blog** | 3 cards | Hover |
| 13 | **Footer** | Big CTA link with arrow, menus, socials, newsletter with marquee and video, huge email link | Marquee; link hovers |

### 1.4 Case-study page (Imran's favourite part)

Structure, top to bottom:

1. **Header.**
   - **Left:** script label ("We are"), the **project name as a huge uppercase H1** ("BIMA"), and a one-line summary.
   - **Right:** a meta table separated by divider lines: **Year · Timeline · Services (pill tags) · Live Website**.
2. **Main image.** Full-width, with parallax.
3. **Overview.** A big uppercase H2, a paragraph, and **2 images side by side**.
4. **The Challenges.** A dark band with a grunge texture: script label on the left, text on the right.
5. **The Result.** Text on the left, a large image on the right.
6. **Numbers.** An image on the left; **3 counters with dividers** on the right (+33% / +51% / +26%).
7. **Credits.** Role → name list.
8. **More projects.** Work-card grid.
9. **Footer.**

### 1.5 Motion system (exact values to re-create in GSAP)

**Global eases** (CustomEase SVG paths)

- **Reveal ease:** `M0,160 C40,144 40,0 160,0`. A fast start with a long soft settle (expo-out feel). Used for every scroll reveal.
- **Hover/mask ease:** `M0,160 C99.2,160 54.4,1.6 160,0`. A strong ease-in-out. Used for button fills, card fills, and image masks.
- **Services ease:** `cubic-bezier(0.62, 0, 0.34, 0.99)`, 0.3s.

**Scroll reveals** (applied through attributes, so any element can opt in)

| Attribute | Effect | Values |
|---|---|---|
| `stagger-line` | SplitText **lines** | opacity 0→1, y 1.25rem→0, scale 0.9→1, 1s, stagger 0.1, start `top 75%` |
| `stagger-word` | SplitText **words** | Same values |
| `stagger-slide-in` | Direct children, one after another | Same values |
| `slide-in` | Single element | Same values, no stagger |
| `.image-mask` | **Image curtain reveal** | Overlay height 100%→0, 1.3s, start `top 90%` |
| `.divider` | **Line draws across** | Width 0→100%, 1s, start `top 75%` |

**Scroll-linked effects** (scrub)

| Element | Effect |
|---|---|
| `.image-parallax` | y 0 → 12.5rem |
| `.image-parallax_medium` | y 0 → 6.25rem |
| `.image-parallax_small` (works) | y 0 → −6.25rem |
| Why-us stats column | y 12.5rem → −12.5rem (offset column) |
| Team background | rotate −9°→0°, scale 0.7→1; inner image scale 1.3→1, rotate 9°→0° |
| Member cards | scale 0.7 → 1 |

**Pinned works carousel**

- Each project has an invisible scroll "trigger" block.
- Entering a trigger:
  - moves the logo, overview and heading text up −100% / −150% (odometer swap)
  - fills that project's nav line
  - wipes the image: wrapper y 0→−50rem while its mask goes y 0→+50rem
- A ticker marks the active "Read Case Study" button by checking which heading position is closest (0 / −150 / −300%).

**Hovers**

- **Button.**
  - The background fills from the bottom (height 0→100%).
  - The label **rolls up** (y 0→−100%, swapping to a duplicate label).
  - The arrow moves diagonally (+1rem x, −1rem y).
- **Work card.**
  - The background fills upward.
  - The border colour goes `--grey-100` → `--primary`.
  - The image scales.

**Signature details**

- **Wiggle text.** An inline SVG filter (`feTurbulence` + `feDisplacementMap`, scale 1) is applied to every script label. Its `seed` changes every **120ms**, so the handwriting "boils" like hand-drawn animation. It's cheap, and it's the site's personality.
- **Hero logo → navbar.**
  - `Flip.getState(heroImage)` captures the logo's position.
  - The logo element moves into the navbar slot.
  - `Flip.from(state, { duration: 0.45, ease: 'power2.inOut', scale: true })` animates it there.
  - It triggers past 10px of scroll and reverses at the top.
- **Counters.** Count up from `start-number` to `end-number`, 2s, `power2.out`, once, at `top 80%`.
- **Marquee.** Clones the item to fill the screen; endless x scroll at **150px/s**.

**Lenis config**

```
duration: 2.0
easing: t => min(1, 1.001 - 2^(-10t))
smoothWheel: true
smoothTouch: false
```

- Driven by `gsap.ticker`.
- `lagSmoothing(0)`.
- `data-lenis-prevent` on scrollable panels.

### 1.6 Take / leave

**Take:**

- black + grey ramp + off-white + **one accent**
- the condensed bold display + Satoshi + handwritten script trio
- wiggle script labels
- availability + local-time block
- hero logo → nav Flip
- full-width accent CTA bar
- the pinned works carousel with odometer meta and image wipe
- the services scroll list
- counters
- line-draw dividers
- the image-mask reveal
- the parallax tiers
- the button roll/fill hovers
- the **case-study page structure**
- the sticky big-title section
- the footer's big email CTA

**Leave:**

- pricing, blog (for now), team section, newsletter
- agency copy
- fashion/model photography
- the hamburger-only nav (we use Imran's morphing nav instead)
- Lenis `duration: 2.0`, which feels floaty for recruiters scanning; **we use ~1.1**
- the "Live Website" link (case studies have no live links)

---

## 2. Formax: https://formax-template.webflow.io (secondary)

### 2.1 Stack

- GSAP 3.15 with **ScrollTrigger, SplitText, CustomEase**
- No Lenis
- Font: **Host Grotesk** only

### 2.2 What it does well (our reasons to use it)

1. **Framed dashed grid.**
   - The whole page sits between **dashed vertical rails**.
   - **Dashed horizontal lines** run under the nav and between sections.
   - The logo strip is split into **cells with dividers**.
   - This is a working version of Imran's "framed grid" requirement (screenshot 10).
2. **Numbered section labels:** `/ 001 / About Us`, `/ 002 / Services`… Small, technical, and they make the page feel structured.
3. **Data bento ("About")**. Small cards that **visualise data**:
   - "6 / 8 client slots filled" as a progress graphic
   - "Turnaround by request type" as a mini bar chart (Logo / Page / Site / Brand)
   - "15+ years" / "100+ brands" stats

   This is Imran's "graphics according to data" idea.
4. **Process cards** (`/01 Subscribe → /02 Request → /03 Receive`) that **become active one by one as you scroll**.
5. **Rolling-number counters** (`is-counter-wheel`, the digit column scrolls yPercent 0→−90). These are odometer-style, not count-up.
6. **Case-study page:**
   - "Back to projects"
   - huge H1 project name
   - a one-liner
   - meta with `//` markers: **Industry · Stack · Timeline**
   - **Project Goals** → **The Result**
   - **a client review inside the case study** (rating, quote, name, role)
   - rolling result counters
   - related work
7. **Theme tokens with semantic names.** Examples:
   - `surface/base`, `surface/panel`, `surface/inverse`
   - `text/primary`, `text/secondary`, `text/label`
   - `border/subtle`, `border/default`
   - `accent/brand`, `state/success`

   Plus radius tokens, including a **"nested" radius** for card-inside-card bezels. **This is the model for the admin's theme editor:** Imran changes one token and the whole site follows.
8. **Hovers:**
   - button label letters roll up one by one (SplitText **chars**, yPercent 0→−100)
   - fill-up backgrounds (scaleY 0→1)
   - ticker cards scale to 1.06
9. **Reveals:** `data-reveal="up"` / `"stagger"`, opacity + y 40→0.

### 2.3 Take / leave

**Take:**

- the framed dashed grid
- `/ 00X /` section labels
- the data bento with mini charts
- scroll-activated process cards
- odometer counters
- the char-roll button hover
- the semantic token architecture
- the "review inside the case study" idea
- the case-study meta row

**Leave:**

- light theme
- orange accent
- the design-subscription/pricing content
- "Book an intro call" agency tone
- the logo-wall emphasis

---

## 3. page-mascot: https://koboyo.com/page-mascot

### 3.1 What it actually is

- **Package:** `page-mascot` on npm, by Kamran Ahmed. **MIT licence.** Source: github.com/nilbuild/page-mascot.
- **Usage:**

  ```tsx
  <Mascot directions="…-directions.webp" reactions="…-reactions.webp" size={140} label="Imran's buddy" />
  ```

- **How it works:**
  - **Two 3×3 sprite sheets per character:**
    - 9 **head directions**: up-left … down-right
    - 9 **reactions**: blink, heart, sparkle, surprised, wink, bashful, sleepy, dizzy, delighted
  - The cursor angle picks the head-direction cell, with a dead zone near the face.
  - A click shows a reaction for about 0.5s. **Rapid repeated pokes make it dizzy.**
  - It listens to `pointermove` and `scroll`.
  - It turns cursor tracking off on touch devices.
  - It respects `prefers-reduced-motion`.
- **Custom character:**
  - The skill `npx skills add nilbuild/page-mascot --skill page-mascot` draws a character, including **"one that looks like me" from a photo**.
  - Styles: colour, ink, sketch, riso, paper, pixel.
  - Drawing needs an image API (`OPENAI_API_KEY`).
- **Performance:** very light. Two small WebP images, no 3D.

### 3.2 What it does **not** do

- It doesn't talk.
- It doesn't know anything.
- It doesn't move around the page.
- It doesn't guide.

It's **a face that looks at the cursor and reacts.** Imran's "portfolio buddy" needs a layer on top: see 4.4.

---

## 4. How we will build

These are decisions, not final code. Exact sections and copy come in Step 3, final visuals in Step 4, and the final tech plan in Step 5.

### 4.1 Visual DNA

| Area | Decision | Source |
|---|---|---|
| Base colours | `#000000` page, `#151515` surface, `#333333` lines, grey ramp `#6e6e6e / #8a8a8a / #a4a4a4`, text `#eeeeee` | Rama |
| Accent | **One accent only**, editable in the admin. Step 4 compares candidates: **Rama gold `#e5b60c`** vs **electric blue** (from the original brand brief) vs 1–2 others | Rama + Imran |
| Fonts | **Condensed bold display** for headlines (Mohave or similar, uppercase for section titles) · **Satoshi** for body · **a handwritten script** for small labels (Rock Salt or similar) with the **wiggle effect** · monospace for small meta | Rama + Imran |
| Layout | **Framed dashed grid**: vertical rails, horizontal section lines, **diagonal hatch spacer bands**, **"+" corner markers** | Formax + screenshots 1–2 |
| Section labels | `/ 01 / Case studies` style, plus a script word above big headings | Formax + Rama |
| Texture | Static **grain overlay**, very light; grunge texture behind 1–2 "dark band" sections | Imran + Rama |
| Cards | Dark **bezel cards** (nested radius) and **process cards** (numbered, tilted, outline icon, arrows) | Screenshots 3–4 + Formax |
| Data graphics | **Bento** with mini charts and diagrams (payment flow, auth flow, playback architecture) | Formax + Imran |

### 4.2 Proposed homepage map (Rama → Imran)

To be confirmed in Step 3.

| Rama section | Becomes |
|---|---|
| Hero | **Hero.** Name/wordmark big on the left. Availability "● Open to remote roles" + **local time "Lahore, PKT"**: useful for remote hiring. Script label "I'm" + headline + one line + **full-width accent CTA bar** ("View case studies"). Right: portrait/avatar or a product-screen composition with pre-rendered 3D accents. **On scroll the wordmark Flips into the morphing nav chip.** This joins Rama's Flip with Imran's chip nav |
| Manifesto | **Statement.** One huge stacked line about how Imran works (e.g. "LIVE PRODUCTS. REAL USERS. NO GUESSWORK."; copy decided in Step 3) |
| Works "Top Picks" (pinned, 03) | **Featured case studies (03):** ClientManager · Blarecast · Your Business Date. Pinned carousel with odometer meta **Year · Role · Stack** and the image wipe between **real screenshots** |
| Work grid | **More work:** Learning CMS · E-Axon · Servease cleanup · other work |
| Services scroll list | **Capabilities:** (01) Payments & subscriptions · (02) Real-time chat & calling · (03) Auth & access control · (04) Mobile apps · (05) Fixing & cleaning existing codebases. Each row pops a screenshot or diagram |
| Formax data bento | **At a glance:** bento of scope facts with mini graphics (2+ years · 5 payment providers · web + mobile · 1 solo-built app · 9-step flow) |
| Formax process cards | **How I work:** understand the system → decide the change → build with AI, review everything → ship and explain |
| Why-us counters | Folded into "At a glance" (no fake metrics) |
| Team sticky title | **Journey:** sticky big title ("FROM A BLANK EDITOR") with experience cards scaling past: Beyonds Logic → Codart (promotion) → independent |
| Testimonials | **Testimonials** (when Imran collects them) |
| Pricing | **Two ways to work with me:** remote full-time (primary) / freelance for SaaS founders. No prices |
| FAQ | **FAQ** for recruiters and founders (time zone, availability, stack, how AI is used) |
| Footer | **Big contact footer:** huge email(s), CTA, resume, LinkedIn, GitHub |

### 4.3 Case-study page template

This merges Rama, Formax, and screenshot 7. **No live links.**

1. **Header:**
   - **Left:** back link, script label, **HUGE PROJECT NAME**, one-liner.
   - **Right:** a meta table with drawn dividers: **Year · Role · Ownership (Built solo / Built / Contributed) · Platform · Stack (pill tags)**.
2. **Hero screenshot** with image-mask reveal and parallax.
3. **Overview:** big H2, text, and 2 screenshots side by side.
4. **My role:** what Imran did and didn't own. This is the credibility section.
5. **Challenges** (dark grunge band): sticky script label on the left. On the right, each challenge as **Problem → Approach → Result**, with a **diagram** where it helps.
6. **The result:** text plus a large screenshot.
7. **Scope facts:** odometer counters with **verified scope facts only**.
8. **Testimonial:** if one exists for the project.
9. **Stack:** grouped list.
10. **More case studies.**

### 4.4 Portfolio buddy (Imran's decision: a mascot that knows him and guides visitors)

Three layers, built so it stays accurate and fast:

1. **Face: `page-mascot`.**
   - A character **drawn to look like Imran** from his photos, in the site's style.
   - It follows the cursor and reacts to pokes.
   - It's stylized, not photoreal.
2. **Guide (built by us).**
   - The buddy **moves with the page.**
   - Each section defines a **dock point** and a **short message**, for example "This is Blarecast, the music app Imran built solo. Scroll to see how he rebuilt the audio engine."
   - GSAP + ScrollTrigger move the buddy to each section's dock point; a speech bubble shows the message.
   - **Messages are written in the admin**, not generated by AI, so they're always accurate and free.
   - A **"Show me around" tour** uses Lenis `scrollTo` to walk visitors section by section.
3. **Chat ("Ask me anything about Imran").**
   - It answers **only from approved content**: the profile brief, case studies, and FAQ.
   - A Next.js server route calls a fast, low-cost LLM.
   - **Guards:**
     - rate limit per visitor
     - monthly cost cap
     - polite "I don't know, email Imran" when an answer isn't in the content
     - never invents facts
   - **Questions are logged to MongoDB**, so Imran can see what recruiters and founders ask.

**Rules for the buddy:**

- It loads **after** the main content.
- It can be dismissed.
- It's keyboard accessible.
- It never covers content.
- With reduced motion it **stays docked** instead of travelling.
- On mobile it's smaller and opens on tap.

### 4.5 Admin app (Imran's decision: inside the same Next.js app, MongoDB)

- **One Next.js full-stack app.**
  - Public site at `/`, admin at **`/admin`**.
  - Owner login. RBAC-ready roles (owner/editor), which is itself a skill showcase.
- **MongoDB** (Atlas) with these collections:
  - `settings`: theme tokens, SEO, contact
  - `sections`: type, order, visible, variant, content
  - `projects` / `caseStudies`
  - `experience`
  - `testimonials`
  - `faqs`
  - `buddyMessages`
  - `chatLogs`
  - `leads`: contact form
- **Images and screenshots** go in a media service (Cloudinary / UploadThing / S3), **not** in MongoDB. MongoDB stores their URLs.
- **Theme editor:**
  - edits **semantic tokens** (Formax-style)
  - output as CSS variables
  - live preview
  - a **contrast warning** when the accent or text becomes hard to read
- **Sections:**
  - reorder, show/hide, and switch variants of **coded section components**
  - not a drag-anything builder, which would break the animations
- **Speed:**
  - The public pages stay static.
  - Saving in the admin triggers **on-demand revalidation**, so visitors always get fast cached pages.
- **Drafts:** draft vs published, plus a preview mode.

### 4.6 Motion and 3D plan

- **One motion system in GSAP** (ScrollTrigger, SplitText, Flip, CustomEase), plus **Lenis (~1.1 duration)**.
  - Reveals are opt-in through attributes, like Rama: `data-anim="lines|words|stagger|slide|mask|draw"`.
  - This replaces the current `motion` package, so we keep one engine.
- **Signature moments** (one per section; see 02 §4.3):
  - hero wordmark → nav chip (Flip)
  - pinned case-study carousel
  - capabilities scroll list
  - sticky journey title
  - odometer counters
  - wiggle script labels
- **3D the Rama way:**
  - **pre-rendered 3D objects** (inflated/puffy tech props: a payment card, a play button, a chat bubble, `{ }`) as AVIF/WebM
  - floated with GSAP parallax
  - **at most one real-time WebGL moment** (lazy-loaded), and only if it earns its place in Step 4
- **Reduced motion** turns off Lenis, wiggle, travel, and pinning (pinned sections become a normal stacked list).

### 4.7 Dependency changes (planned for Step 5, nothing installed yet)

- **Add:**
  - `gsap`
  - `lenis`
  - `page-mascot`
  - `mongoose`
  - auth (Auth.js or custom JWT)
  - a media upload service
  - an LLM SDK for the buddy chat
- **Maybe:** `@react-three/fiber` for a single WebGL moment.
- **Remove:** `motion`.
- **Keep:** Tailwind 4 and TypeScript.

---

## 5. Open items carried forward

| Item | Step |
|---|---|
| Accent colour (gold vs electric blue vs others), tested live via the admin | 4 |
| Exact display and script fonts (Mohave / Rock Salt or alternatives) with previews | 4 |
| Hero right side: portrait, avatar, or product composition | 3 |
| Statement line and all section copy | 3 |
| Pre-rendered 3D props: which objects and the style | 4 |
| LLM provider and monthly cost cap for buddy chat | 5 |
| Media storage service | 5 |
| Buddy character drawing (needs Imran's 2–3 photos and an image API) | 6 |
