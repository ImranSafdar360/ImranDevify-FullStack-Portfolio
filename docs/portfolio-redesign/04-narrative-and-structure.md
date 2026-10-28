# Step 3 — Narrative, Structure & Copy

_Imran Safdar · Portfolio Redesign · Draft v1 · 29 October 2026_

## How to use this file

This file decides **what story the site tells, which pages and sections exist, in what order, what each one must prove, and what it says.** It's built from:

- [`01-profile-brief.md`](01-profile-brief.md): facts, ownership rules, voice
- [`02-references-and-taste.md`](02-references-and-taste.md): requirements
- [`03-reverse-engineering.md`](03-reverse-engineering.md): Rama/Formax patterns and the build direction

**Status of the copy:**

- It's real and follows the brief's ownership rules.
- **[NEED]** marks a fact Imran must supply.
- **[CHOOSE]** marks an option Imran picks.
- All copy will be editable in the admin later.

**Not in this file:** visuals (colours, fonts, exact styling) are Step 4. Tech details are Step 5.

---

## 1. The concept: "Annotated Blueprint"

One idea ties every requirement together.

> **The site is an engineer's blueprint with handwritten notes on it.**
> Precise systems drawn on a grid, annotated by a human.

| Half | What it means | Elements |
|---|---|---|
| **Blueprint** (precision) | "This person builds serious, reliable systems" | Framed grid, `+` crosshair corners, hatch bands, `/ 01 /` mono labels, diagrams, data bento, condensed bold headlines |
| **Annotations** (human) | "…and is a real, likeable person you'd want on your team" | Wiggling handwritten script labels, the buddy mascot that looks like Imran, short honest copy, the journey story |

This is why Rama's handwritten labels and Formax's technical grid belong in **one** site instead of fighting each other.

**Rule:** every annotation points at evidence: a screenshot, a diagram, a fact.

### The one sentence the whole site proves

> **Imran builds and maintains the critical parts of live products: payments, access, real-time features, and mobile apps. He's reliable inside codebases that already have users.**

---

## 2. Visitor journeys

### Recruiter / hiring manager (priority 1)

- **Budget:** about 60 seconds.
- **Path:** Hero (5s) → Featured case studies (30s) → At a glance (10s) → resume / email.
- **Every screen answers one of their questions:**
  - Is this real production experience?
  - What exactly did he own?
  - Does the stack fit?
  - Can he work remotely?

### SaaS founder (priority 2)

- **Budget:** 2–3 minutes.
- **Path:** Hero → Capabilities ("has he built what I need?") → a case study → How I work → Ways to work → contact.

**Both paths reach a call to action within one scroll from anywhere:**

- the nav-chip CTA
- the section CTAs
- the footer

---

## 3. Site map

| Page | Route | Purpose |
|---|---|---|
| Home | `/` | The full pitch (section 4) |
| Work | `/work` | Every project: 3 case studies, project cards, other work |
| Case study | `/work/[slug]` | Deep proof: `clientmanager`, `blarecast`, `your-business-date` |
| Project note | `/work/[slug]` | Short page for tier-2 projects: Learning CMS, E-Axon, Codebase cleanup |
| About | `/about` | Portrait, full story, how I work, skills by evidence, education |
| Contact | `/contact` | Form saved to MongoDB `leads`, both emails, links, local time |
| Resume | `/resume.pdf` | ATS resume (recreated in Step 6) |
| AI/LLM files | `/llms.txt`, `/llms-full.txt` | Plain-text profile for AI assistants and crawlers (Step 5) |
| 404 | — | Buddy goes **dizzy**: "This page doesn't exist. These do:" + links |
| Admin | `/admin` | Private: content, sections, theme, buddy, leads, chat logs |

---

## 4. Homepage, section by section

**Global elements on every page:**

- framed grid frame
- grain overlay
- morphing nav
- the buddy
- Lenis smooth scroll

**Between sections:** a hatch band with `+` corner markers.

### §0. Morphing nav

| | |
|---|---|
| **At top** | Left: wordmark area (empty on Home, because the hero wordmark sits there). Centre: `Work · About · Contact`. Right: CTA **"Download resume"** |
| **After scroll** | The hero wordmark **Flips** into a centred chip: avatar (the buddy face) + **"Imran"** + 3 animated dots |
| **Hover / tap** | The chip expands downward: links + "Download resume" + "Email me" + local time |
| **Mobile** | Starts as the chip. Tap to expand |

### §1. Hero: "Who is this and why should I care" (5 seconds)

**Must prove:** what he does, at what level, that he's real and reachable.

**Layout** (Rama hero logic, framed grid). Two columns.

**Left column:**

- Giant wordmark: **IMRAN SAFDAR**, condensed bold.
- Availability block:
  - `● Open to remote roles`
  - `Lahore · PKT 14:32` (live clock)
- Script label (wiggle): *Hi, I'm Imran*
- **H1:** **Full-stack engineer for products that are already live.**
- **Intro:**

  > I've spent 2+ years shipping inside real SaaS and mobile products: a payment system for five providers, embeddable forms that turn visitors into clients, real-time chat and video calls, and a full music-streaming app I built solo in React Native.

- **CTA bar (full-width accent):** `See the case studies ↗`
- Secondary text link: `Download resume`

**Right column (DECIDED: product composition):**

- 3 real screenshots in bezel frames, slightly layered: a ClientManager screen, a Blarecast phone, a Your Business Date screen.
- Pre-rendered 3D props float around them: a payment card, a play button, a chat bubble.
- The **buddy** peeks over the top frame edge.
- Proof at first glance.
- The portrait lives on the About page.

**Motion:**

- H1 lines reveal (stagger-line)
- screenshots rise with the image-mask
- props float on parallax
- wordmark Flips to the nav chip on scroll

**Buddy:**

- **Dock:** top edge of the right frame.
- **Message:** "Hi! I'm Imbot, Imran's sidekick. I know everything on this site. Want the 60-second tour?" with buttons **[Show me around] [Ask me something]**.

**Admin:**

- availability text and on/off
- H1, intro, CTA labels and targets
- hero images
- right-side variant

### §2. Statement band: "How he thinks", in one line

**Must prove:** the attitude behind the work.

**Layout:** full-width dark band with grunge texture. Huge stacked condensed text, one line in accent.

**The statement (DECIDED):**

> **LIVE PRODUCTS.**
> **REAL USERS.**
> **REAL CONSEQUENCES.**

_Annotation:_ "Most of my work is inside products people already pay for. That changes how carefully you build."

**Motion:** words stagger in; the background parallaxes.

**Buddy:** stays quiet (passes through).

### §3. Featured case studies (the core): "Real production proof"

**Must prove:** real products, clear role, hard problems.

**Layout:**

- Label `/ 01 / Selected work`.
- Marquee title: **CASE STUDIES (03)**.
- Then **Rama's pinned carousel**:
  - **Left:** project name, one-liner, meta rows (odometer swap).
  - **Right:** screenshot (image wipe between projects).
  - **Side:** nav with progress lines.
  - **Button:** "Read case study".

| # | Project | One-liner | Year | Role | Stack |
|---|---|---|---|---|---|
| 1 | **ClientManager** | Payments for five providers, embeddable forms that turn visitors into clients, and project planning inside a live SaaS. | 2025 – now | Full-stack engineer (client work) | React · Node.js · MongoDB · Next.js |
| 2 | **Blarecast** | A pay-per-listen music-streaming app I built solo, from playback engine to payments. | 2025 | Mobile engineer, built solo | React Native · Expo · Supabase · Stripe |
| 3 | **Your Business Date** | A networking platform for professionals: live chat, video calls, and a 9-step signup. | Dec 2024 – Apr 2025 | Frontend engineer | Next.js · Socket.io · Agora · Stripe |

**Ownership tag on each:** `Client work · Contributed` / `Client work · Built solo` / `Client work · Built frontend`.

**Mobile:** no pinning; stacked cards.

**Buddy:**

- **Dock:** beside the carousel nav. The message **changes per project**:
  1. "He designed the payment system here: five providers, one design. And he built the whole Forms module."
  2. "He built this whole app alone, after learning React Native in a week."
  3. "His first real-time chat and video calling. Ask me how he fixed the call bugs."

**Admin:** which projects are featured, their order, every field.

### §4. Capabilities: "Has he built what I need?" (founders)

**Must prove:** each skill is backed by a real project.

**Layout:** Rama's scroll list. Numbered rows; the active row turns white and shifts right; its screenshot or diagram pops in. Each row ends with **"Seen in →"** project links.

**Label:** `/ 02 / What I build`. **Title:** **WHAT I'M GOOD AT**.

| # | Row title | Line | Seen in |
|---|---|---|---|
| 01 | **PAYMENTS & INVOICING** | One payment system for Stripe, PayPal, Square, Authorize.Net, and Venmo. Invoices, recurring billing, and "paid" that's marked exactly once. | ClientManager, Blarecast, Your Business Date |
| 02 | **FORMS, BOOKINGS & CHECKOUT** | Embeddable forms that capture leads, book meetings across time zones, and sell services, straight into the CRM. | ClientManager |
| 03 | **REAL-TIME FEATURES** | Live chat with Socket.io; audio and video calls with Agora; live updates in dashboards. | Your Business Date, ClientManager |
| 04 | **AUTH, ROLES & ACCESS** | JWT, role-based permissions, Google and Apple sign-in that works in production, not just locally. | Blarecast, ClientManager |
| 05 | **MOBILE APPS** | React Native + Expo: background audio, offline downloads, queue and playback control. | Blarecast |
| 06 | **AI AGENTS** _(in development)_ | Claude-based agents that read and change CRM data through safe tools, with user approval before every change. | ClientManager |

_"Existing codebases" moved out of this list. It now lives in How I work (§6) and the FAQ, and Codebase cleanup appears in More work._

**Visual per row:**

- **01:** payment-flow diagram
- **02:** chat/call event diagram
- **03:** auth-flow diagram
- **04:** phone screenshot
- **05:** before/after structure sketch

**Buddy:** "Pick one. Each links to where he actually did it."

### §5. At a glance: "Fast facts" (recruiters)

**Must prove:** scope and seniority, using **verified facts only**.

**Layout:** Formax-style **data bento**. Mixed card sizes, each with a small graphic. Odometer numbers.

| Tile | Content | Graphic |
|---|---|---|
| Large | **2+ years** professional experience · since May 2024 | Timeline bar: Beyonds → Codart → independent |
| Medium | **5** payment providers, one payment system I designed | Five labelled nodes linking to one "invoice" node |
| Medium | **240** automated tests written on shipped modules | Small test-pass grid |
| Small | **~780** commits on ClientManager in ~14 months | Monthly activity sparkline |
| Medium | **Web + mobile** | Browser and phone outline icons |
| Small | **1** app built solo | Phone outline |
| Small | **9-step** signup flow | 9-dot stepper |
| Small | **Promoted** to full-stack | Arrow step-up: Associate FE → Full-stack |
| Medium | **Lahore · UTC+5**: works US and EU hours | Mini world clock with Lahore, London, and New York; the working-hours band covers both EU and US days |
| Wide | Stack I use in production | Grouped text chips (from the brief §6, "proven" tier only) |

**Buddy:** "All numbers here are real. No made-up percentages."

### §6. How I work: "Will working with him be easy?"

**Must prove:** process, communication, honest AI use.

**Layout:** **4 process cards** (screenshot 4 style): tilted, big numbers, faded outline icon, hand-drawn arrows. They activate one by one on scroll (Formax).

**Label:** `/ 03 / Process`. **Title:** **HOW I WORK**.

| # | Card | Text |
|---|---|---|
| 01 | **Understand the system** | I read the product and the code before I change anything. |
| 02 | **Decide the change** | Where it belongs, what it touches, what could break. |
| 03 | **Build with AI, review everything** | Claude Code helps me move fast. I still read, test, and debug every change. |
| 04 | **Ship and explain** | Small pull requests and a plain-English note on what changed and why. |

**Buddy:** "Yes, he uses AI every day. No, it doesn't ship anything he hasn't checked."

### §7. Journey: "Who is he as a person?"

**Must prove:** growth, grit, adaptability. Human, short.

**Layout:**

- Rama's sticky big title, **FROM A BLANK EDITOR / TO LIVE PRODUCTS**, on a grunge texture.
- 6 experience cards scroll past and scale up, one at a time.
- Link: "Full story →" (About).

| Year | Card |
|---|---|
| 2023 | **The blank editor.** Tutorials made sense; a blank file didn't. Three months and 15 small projects later, it clicked. |
| 2024 | **Unpaid start.** An internship at a two-person agency. Learned React in two weeks and shipped my first client site. |
| Dec 2024 | **First real job.** Joined Codart Technologies. A week later I was building Your Business Date. |
| 2025 | **Web to mobile.** Learned React Native in a week, then built Blarecast alone. |
| Jan 2026 | **Promoted.** Associate Front-End → Full-Stack Engineer. |
| 2026 | **Independent.** Working on ClientManager, a live SaaS, on payments, invoices, and subscriptions. |

**Buddy:** "This is the part he's proudest of."

### §8. Testimonials: "Do others trust him?"

**Must prove:** third-party trust.

**Layout:** Rama tabs (quote + name, role, company), or a single large quote.

**Status:** **hidden in the admin until real quotes exist.** Imran is collecting them. Never placeholder quotes in production.

### §9. Ways to work with me: "How do I hire him?"

**Must prove:** clear options, jobs first.

**Layout:** two bezel cards side by side. The left (primary) card is larger and has an accent border.

| Card | Text | CTA |
|---|---|---|
| **Remote full-time** (primary) | I'm looking for a product team where I can own features end to end: web, mobile, and the backend behind them. **No notice period; I can start right away.** | Download resume · Email me |
| **Freelance for SaaS founders** | Payments, subscriptions, new features, or cleaning up a codebase that keeps breaking. **I'm taking on one more freelance project.** | Tell me about your product |

**No prices.**

### §10. FAQ

**Layout:** Rama accordion with drawn dividers. Split into "For companies" / "For founders".

| Question | Draft answer |
|---|---|
| Do you work remotely across time zones? | Yes. I'm in Lahore (UTC+5) and I work US and EU hours comfortably. I do my best work in the evening and at night, my time. |
| What's your strongest stack? | Next.js, React, TypeScript, and React Native, with Node.js/Express, MongoDB, and Supabase on the backend. |
| Can you work in an existing codebase? | Most of my work has been exactly that: products with real users and code written by others. |
| How do you use AI? | Every day, as an implementation tool. I decide what to build, and I review and test everything it writes. |
| Do you do backend too? | Yes: APIs, auth, roles, payments, database design. I've even built a Laravel backend with AI help when a project needed it. |
| When can you start? | Right away. I have no notice period. |

### §11. Footer / contact

**Must prove:** easy to reach.

**Layout:**

- Huge condensed **LET'S TALK.**
- Script annotation: *"I usually reply within a few hours."*
- Two labelled emails:
  - `For hiring: imransafdar360@gmail.com` (name-based, matches the resume)
  - `For projects: imranguru360@gmail.com`
- Buttons: `Download resume` · `LinkedIn` · `GitHub`
- Live local time
- Small sitemap

**Buddy:** waves (heart reaction) and says "Say hi. He actually reads these."

---

## 5. Case-study page template

The structure is from 03 §4.3. **No live links.** Below, each section's content per project, with gaps marked.

| # | Section | ClientManager | Blarecast | Your Business Date |
|---|---|---|---|---|
| 1 | Header meta | 2026–now · Full-stack engineer · Contributed · Web · **[NEED stack]** | 2025 · Mobile engineer · **Built solo** · iOS/Android · RN, Expo, Supabase, Stripe, RTK Query, RN Track Player | 2024–25 · Frontend engineer · Built frontend · Web · Next.js, Redux, Socket.io, Agora, Stripe |
| 2 | Hero screenshot | **[NEED screenshots, redacted]** | **[NEED screenshots]** | **[NEED screenshots]** |
| 3 | Overview | All-in-one SaaS for agencies and freelancers: clients, projects, proposals, contracts, invoices, payments | Music streaming with listening packages instead of a flat subscription, plus AI playlists | Professionals meeting through discovery, chat, calls; subscription tiers |
| 4 | My role | Invoices, forms/embedded forms, questionnaires, projects & tasks, subscriptions, payment providers, production bugs. **[NEED built vs maintained]** | Everything in the app, solo | Frontend architecture and logic; worked with the backend engineer on API contracts |
| 5 | Challenges | **[NEED 2–3 real problems]** (from the repo + your notes) | Expo AV → Track Player migration · Google sign-in broke only in production · SVG plan selector · Stripe + listening logic | 9-step registration state · filter/API mismatch · first Socket.io chat · Agora call stability |
| 6 | Diagrams | Payment-provider flow · invoice → payment state | Playback architecture · OAuth environment config | Registration state split · chat event flow |
| 7 | Result | **[NEED]** what changed for users/the team (qualitative is fine) | Stable full player with background, offline, queue; auth working in production | Consistent signup data; stable chat and calls |
| 8 | Scope facts | 5 providers · **[NEED more]** | Built solo · 1 week to learn RN · 9 reactions… **[from repo]** | 9 steps · 2 real-time systems |
| 9 | Testimonial | if available | if available | if available |

**Project notes** (tier 2) are a short version: header, one screenshot, 3 short paragraphs (context, what I did, what I learned), stack.

---

## 6. About page

1. **Header:** script *About me* + H1 **"I learn by building things people actually use."** + **real portrait** (graded to the theme).
2. **Story:** the full journey (the About text from the brief §9, expanded).
3. **How I work:** reuses §6.
4. **Skills by evidence:** proven / used / exposure (brief §6). Text, not a logo wall.
5. **Education:** BS Computer Science, Virtual University of Pakistan (in progress).
6. **CTA:** ways to work.

---

## 7. Buddy behaviour summary

| Moment | Behaviour |
|---|---|
| First visit | Greets in the hero, offers **[Show me around] [Ask me something]**, then waits. Never auto-starts the tour |
| Scrolling | Glides to each section's dock point; shows that section's message for about 4s. **Max one message per section per visit** |
| Tour | Lenis scrolls section by section; the buddy explains each in one or two lines; "Next / Stop" controls |
| Ask | Chat panel; answers only from approved content; otherwise "I'm not sure. Email Imran: …" |
| Poke | Reactions (blink, heart, wink…); 5 fast pokes = dizzy |
| Settings | Minimise button; remembered per visitor; reduced motion = stays docked bottom-right |
| Name | **Imbot** (Imran + bot). Friendly, and honest that it's an AI helper, which matters because it answers questions. Alternatives: *Immi*, *Stacky* |
| Personality | Friendly and a little witty; always factual. Talks about Imran in the third person ("He built this solo") |

---

## 8. What the admin must edit (feeds Step 5)

- **Every section:** visible, order, variant, all text, CTAs, images.
- **Projects:**
  - featured flag and order
  - all case-study blocks
  - ownership tag
  - screenshots
  - diagrams (uploaded SVG or image)
- **Facts bento tiles:** value, label, graphic type.
- **Journey cards, FAQ, testimonials** (with a visible toggle).
- **Availability:** on/off, text, start date.
- **Buddy:** per-section message, dock position, tour order, chat knowledge base, chat logs.
- **Theme tokens:** accent and others, with a contrast check.
- **SEO:** per-page title, description, OG image.
- **Leads:** contact submissions inbox.

---

## 9. Open items needed from Imran

**Needed to finish this step's copy:**

1. **ClientManager tech stack**, and which payment providers you built vs maintained.
2. **2–3 real ClientManager problems** you solved: what broke or was hard, what you did, what changed. Short notes are enough, or share the repo.
3. **Availability:**
   - when you can start, or your notice period
   - working-hours overlap (EU / US hours?)
   - freelance capacity
   - reply time
4. **Email roles:** which address is for hiring and which for projects.
5. **Your Business Date end month.**
6. **Picks:**
   - hero right side (A product composition / B portrait)
   - statement line (A / B)
   - buddy name and personality

**Needed later** (Step 6 assets; not blocking Step 4):

- Screenshots for all projects (redacted).
- 2–3 photos (portrait and buddy character).
- Repos for the case studies.
- Testimonials.
