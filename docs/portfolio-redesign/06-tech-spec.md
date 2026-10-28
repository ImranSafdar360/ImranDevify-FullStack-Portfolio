# Step 5 — Technical Spec & Capability Map

_Imran Safdar · Portfolio Redesign · v2 (Imran's answers applied) · 29 October 2026_

Written with the `spec-driven-development` skill. **Status: SPECIFY phase.** Nothing here is built.

- **v2 changes:** Imran's 7 answers (§10).
- **Next.js 16 adjustments**, verified against the official v16 upgrade and caching docs on 29 Oct 2026.
- **Auth library change:** Auth.js v5 is still beta (`5.0.0-beta.32`), so this spec uses **Better Auth 1.7 (stable)**. The behaviour Imran asked for is the same.

- **After approval:** the plan and task breakdown (`planning-and-task-breakdown`) are written into `tasks/plan.md` and `tasks/todo.md`, followed by a `plan-eng-review` pass.
- **Inputs:**
  - [01 profile brief](01-profile-brief.md)
  - [02 taste](02-references-and-taste.md)
  - [03 reverse-engineering](03-reverse-engineering.md)
  - [04 narrative & structure](04-narrative-and-structure.md)
  - [05 theme](05-theme.md)
  - [case-studies/](case-studies/)
  - the existing repo

---

## 0. Assumptions (correct any of these before approval)

1. **One Next.js app** holds the public site, `/admin`, and the API (Imran's decision).
2. **Upgrade first (decided):** Next.js **16.4.x** + React **19.3**, TypeScript **5.9** (strict), Tailwind **4.3**.
   - TypeScript 7 is skipped for now: it's brand new, and Next 16 only promises "TypeScript 5.1+".
   - The upgrade is the **first build task**, done with the official codemod before any new code.
3. **Hosting (decided):** **Vercel Hobby (free)** + **MongoDB Atlas M0 (free)** in AWS us-east-1, close to Vercel's default region.
   - The **Hostinger domain** `imrandevify.online` points to Vercel via DNS (A record on the root, CNAME for `www`), set in Hostinger's DNS panel.
   - Note: Vercel's Hobby plan is meant for personal, non-commercial projects. A personal portfolio fits; if the site later becomes a sales site for a business, Vercel Pro may be required.
4. **The old wireframe code is deleted** at the start (`src/components/sections/*`, `src/styles/*` except what's reused). It stays recoverable in git history.
5. **English only, dark theme only, no blog** in v1. The content model leaves room for a blog later.
6. **Imran is the only admin user** at launch. Roles still exist (owner/editor) so the RBAC is real and testable.
7. **Content is seeded from the `docs/` files.** The site never shows a fact that isn't in 01-profile-brief or a case-study file.
8. **Screenshots arrive after** the projects section and case-study page are built (Imran's decision). Until then, placeholders in the same frames.

---

## 1. Capability map

| Module id | Responsibility | Depends on |
|---|---|---|
| `foundation` | App shell, theme tokens (05), fonts, framed grid / hatch / `+` markers / grain, layout and UI primitives (buttons, badges, cards), **motion system** (GSAP + Lenis providers, `data-anim` reveals, reduced motion), morphing nav, footer, test and CI harness | — |
| `content-model` | MongoDB connection, Mongoose models, Zod schemas (shared validation), typed read layer with **cache tags**, seed script from `docs/` | — |
| `public-site` | Home (11 sections, 04 §4), Work index, case-study template, project-note template, About, Contact (form → leads), 404 | foundation, content-model |
| `seo-ai` | Metadata, generated OG images, sitemap, robots, JSON-LD (Person, CreativeWork), **`/llms.txt` + `/llms-full.txt` generated from content** | content-model, public-site |
| `admin-auth` | Admin sign-in, sessions, roles (owner/editor), `/admin` route protection, permission checks used by every mutation | content-model |
| `media` | Image upload, storage, transforms (AVIF/WebP, sizes), required alt text, redaction checklist on upload | admin-auth |
| `admin-cms` | `/admin` UI: edit every collection, section order/visibility/variant, case-study block editor, **theme token editor with contrast check**, leads inbox, drafts + preview, on-save revalidation | admin-auth, content-model, media |
| `imbot` | **Face:** page-mascot sprites. **Guide:** section docks, messages, tour. **Chat:** grounded LLM route, rate limit, monthly cost cap, chat logs | foundation, content-model (admin-cms only for editing messages and reading logs) |

**Build order:**

```
foundation + content-model
  → public-site (static seeded content first)
  → seo-ai
  → admin-auth → media → admin-cms
  → imbot (guide first, then chat)
  → launch hardening
```

**Why this order:** the public site is the product, so it ships first and reads from the database from day one. The admin then edits what already exists. Imbot comes last because it depends on finished sections.

Each module gets its own short `SPEC-<module-id>.md` beside this file during the PLAN phase. This document is the shared contract they all follow.

---

## 2. Objective

Build Imran's portfolio as a fast, accessible, animated site. It must prove, through **verified evidence**, that he builds and maintains critical parts of live products. The site is managed through his own admin app.

**Users:**

- **Recruiters / hiring managers** (priority 1): reach proof and the resume in under 60 seconds.
- **SaaS founders** (priority 2): find a matching capability and a case study, then contact him.
- **Imran** (admin): change any content, section, or theme token without a deploy.
- **AI assistants and crawlers:** read the whole profile cheaply through `llms.txt`.

**Product requirements** (from 01–05; this list is the source of truth):

- **Every page:** Annotated-Blueprint visual system, morphing nav, Imbot.
- **Content honesty:** ownership labels on every project (Built / Extended / In development); "no live links" on case studies.
- **Admin:** controls content, sections, and theme; is **not** a free-form page builder.
- **Imbot:** guides by section and answers questions **only** from approved content.

---

## 3. Tech stack

Versions are the latest stable at install time unless pinned.

| Area | Choice | Notes |
|---|---|---|
| Framework | **Next.js 16.4** (App Router, Turbopack default), React 19.3, TypeScript 5.9 strict | Upgraded with `npx @next/codemod@canary upgrade latest`. **Changes from v15:** async `params`/`cookies`; `middleware` → **`proxy.ts`** (Node runtime); `next lint` removed, so ESLint runs as the CLI with **flat config**. `npx @next/codemod@canary agents-md` adds an `AGENTS.md` pointing coding agents at the version-matched docs bundled in `node_modules/next/dist/docs/` |
| Styling | Tailwind CSS 4 + CSS variables from 05-theme | Tokens in `src/styles/tokens.css`. Components use tokens, never raw hex |
| Fonts | `next/font/google`: Mohave, Rock Salt · `next/font/local`: Satoshi woff2 (Fontshare licence) · `geist`: Geist Mono | Self-hosted, `display: swap`, preloaded where above the fold |
| Motion | `gsap` (ScrollTrigger, SplitText, Flip, CustomEase), `@gsap/react` (`useGSAP`), `lenis` | **Remove `motion`.** One engine |
| Mascot | `page-mascot` | Loaded after the main content |
| Database | MongoDB Atlas + `mongoose` 9 | One cached connection per server instance. Better Auth reuses the same MongoDB client |
| Validation | `zod` 4 | The same schema validates the admin form, the server action, and the model |
| Auth | **Better Auth 1.7** with **GitHub + Google** sign-in, MongoDB adapter, **allowlist of exactly two emails**: `imransafdar360@gmail.com`, `imranguru360@gmail.com`. Role field: owner \| editor | No passwords stored. Any sign-in whose verified email isn't on the allowlist is rejected before a user record is created. **The GitHub account must have one of these emails verified** |
| Route guard | `src/proxy.ts` does a fast cookie check and redirects `/admin` → sign-in | **Not the security boundary:** every admin page and server action re-checks the session and role on the server |
| Mutations | Server Actions (admin) · Route Handlers (`/api/chat`, contact submit) | Every mutation: Zod parse → permission check → write → **`updateTag(tag)`** (read-your-writes, Next 16) |
| Caching | **Cache Components**: `cacheComponents: true`, `partialPrefetching: true`; reads use `'use cache'` + `cacheLife('max')` + `cacheTag('content:projects')` etc. | Public pages prerender to a static shell on the CDN; admin saves expire exactly the affected tags |
| Media | **Cloudinary (decided)**: signed uploads, auto AVIF/WebP, `res.cloudinary.com` as the only remote image host | URLs and metadata stored in MongoDB. The old Unsplash/Freepik/Webflow image hosts are removed from `next.config` |
| Contact email | **Resend (decided)** notifies Imran of each new lead. Sender `notify@imrandevify.online` after domain verification (SPF/DKIM records added in Hostinger DNS). Resend's test sender is used until DNS is verified | Leads are always stored in MongoDB first, so a failed email never loses a lead |
| Bot protection | Cloudflare **Turnstile** (real server-side verification) + honeypot + rate limit | On contact and chat |
| Imbot chat | Anthropic SDK; model set by `IMBOT_MODEL` (default **Claude Haiku 5.5**, `claude-haiku-5-5`); prompt caching of the knowledge base; streamed responses | Grounding pack built from published content. **Budget (decided): US $10/month (about PKR 3,000)**, enforced in code (see below) |
| Imbot budget guard | Each reply's real token usage × the model's per-token prices (kept in one config file, copied from Anthropic's pricing page when set up, never guessed) → added to the monthly `usage` meter | At **80%**, warning in the admin. At **100%**, chat is disabled until next month and Imbot says: **"I've hit my chat limit for this month. Please email Imran at imransafdar360@gmail.com."** The guide and tour keep working (no AI cost). **Second safety net:** Imran also sets a $10 spend limit in the Anthropic Console |
| Analytics | Vercel Web Analytics + Speed Insights | Cookie-free; real-user Core Web Vitals |
| Testing | Vitest + React Testing Library · `mongodb-memory-server` · `@playwright/test` + `@axe-core/playwright` · `playwright-cli` for exploratory QA · Lighthouse CI | See §7 |
| CI | GitHub Actions | typecheck, lint, unit/integration tests, build, e2e on the Vercel preview, Lighthouse budgets |

**Packages added:** gsap, @gsap/react, lenis, page-mascot, mongoose, mongodb, zod, better-auth, cloudinary, resend, @anthropic-ai/sdk, @vercel/analytics, @vercel/speed-insights, plus dev tools: vitest, @testing-library/react, jsdom, mongodb-memory-server, @playwright/test, @axe-core/playwright, @lhci/cli, tsx.

**Packages upgraded:** next 16.4, react / react-dom 19.3, eslint-config-next 16.4, eslint (flat config), typescript 5.9, tailwindcss 4.3.

**Packages removed:** motion, plus `tw-animate-css`, `@next/bundle-analyzer`, `clsx`, `tailwind-merge`, `lucide-react` unless a component still needs them after the wireframe is deleted.

**Mascot drawing (decided: free tool):**

- The two page-mascot sprite sheets (3×3 head directions + 3×3 reactions) are drawn from Imran's photos with a **free** image generator: **Google Gemini image generation** (free in the Gemini app / Google AI Studio), with **Microsoft Designer** as a fallback.
- Claude writes the prompts from page-mascot's sheet spec.
- Claude then aligns, slices, and checks the grid with `sharp` (already a dependency).
- This is a Step 6 asset task. No OpenAI key is needed.

---

## 4. Commands

```bash
npm run dev            # next dev  (Turbopack is the default in v16; uses .env.local)
npm run build          # next build
npm run start          # next start
npm run lint           # eslint .   (flat config: eslint.config.mjs; `next lint` no longer exists)
npm run typecheck      # tsc --noEmit
npm run test           # vitest run            (unit + integration)
npm run test:watch     # vitest
npm run test:e2e       # playwright test        (needs a running app or BASE_URL)
npm run lhci           # lhci autorun           (Lighthouse budgets)
npm run seed           # tsx scripts/seed.ts    (loads content/seed/*.json into MongoDB; idempotent)
npm run check          # typecheck && lint && test && build   (run before every commit)
```

**Environment** (`.env.example` lists names only; values never committed):

| Purpose | Variables |
|---|---|
| Database | `MONGODB_URI` |
| Auth | `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `ADMIN_EMAILS=imransafdar360@gmail.com,imranguru360@gmail.com` |
| Media | `CLOUDINARY_URL` |
| Contact email | `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL` |
| Bot protection | `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` |
| Imbot chat | `ANTHROPIC_API_KEY`, `IMBOT_MODEL`, `IMBOT_MONTHLY_BUDGET_USD=10` |
| Site | `NEXT_PUBLIC_SITE_URL` |

---

## 5. Project structure

```
src/
  app/
    (site)/                     → public pages: page.tsx (home), work/, work/[slug]/, about/, contact/, not-found.tsx
    (admin)/admin/              → admin UI (protected by middleware + server checks)
    api/chat/route.ts           → Imbot chat (streamed)
    api/auth/[...all]/route.ts  → Better Auth handler
    llms.txt/route.ts           → generated plain-text profile
    llms-full.txt/route.ts
    robots.ts  sitemap.ts  opengraph-image.tsx  layout.tsx
  features/
    home/          → one folder per homepage section (hero, statement, case-carousel, capabilities, bento, process, journey, testimonials, ways-to-work, faq)
    case-study/    → templates + blocks (header, overview, role, challenges, diagram, scope-facts, testimonial, stack)
    imbot/         → face, guide (docks, tour), chat
    admin/         → editors per collection, theme editor, leads inbox
  components/
    layout/        → Frame, Section (rails, hatch, + markers), Nav (morphing), Footer, Grain
    ui/            → Button, CtaBar, Badge, Pill, BezelCard, ProcessCard, BentoTile, MetaTable, ScriptLabel
  lib/
    db/            → mongoose connection
    content/       → typed read functions + cache tags
    auth/          → session helpers, can(role, action)
    motion/        → gsap registration, eases, data-anim reveal engine, lenis provider
    theme/         → token derivation (hover/pressed/soft/ink), contrast ratio
    imbot/         → grounding-pack builder, rate limit, cost meter
  models/          → Mongoose models
  schemas/         → Zod schemas (shared)
  styles/          → tokens.css, base.css
  proxy.ts         → optimistic /admin redirect (Next 16 replacement for middleware)
eslint.config.mjs  → ESLint flat config
AGENTS.md          → points agents at version-matched Next.js docs
content/seed/      → initial JSON built from docs/ (the reviewed source of truth for first launch)
scripts/seed.ts
tests/unit/  tests/integration/   → Vitest
e2e/                               → Playwright specs
docs/portfolio-redesign/           → specs and decisions (this folder)
```

### Content model (MongoDB collections)

| Collection | Holds |
|---|---|
| `settings` | Singleton: availability, contact emails, socials, SEO defaults, **theme tokens**, grain, feature flags |
| `sections` | Page, type, order, visible, variant, content (typed per section type via a Zod discriminated union) |
| `projects` | slug, kind (`case-study` \| `note` \| `other`), featured, order, title, oneLiner, year, role, ownership, platform, stack[], blocks[] (typed case-study blocks), scopeFacts[], media refs, status (`draft` \| `published`) |
| `experience` | Journey cards |
| `testimonials` | quote, name, role, company, projectRef, permission flag, visible |
| `faqs` | audience (company \| founder), q, a, order |
| `buddyMessages` | sectionKey, dock, message, tourOrder |
| `media` | url, publicId, width, height, alt (**required**), redactionConfirmed (**required for client screenshots**) |
| `users` | email, role (owner \| editor) · plus Better Auth's session/account collections |
| `leads` | name, email, intent (hiring \| project \| other), message, createdAt, status |
| `chatLogs` | session hash, question, answer, tokens, createdAt (TTL 180 days; no IP stored) |
| `usage` | Monthly token meter for the Imbot cost cap |

---

## 6. Code style

**Conventions:**

- **Naming:**
  - Files: `kebab-case.tsx`
  - Components: `PascalCase`
  - Hooks: `useCamelCase`
  - Zod schemas: `xSchema`
  - Models: singular `Project`
- **Components:**
  - Server Components by default.
  - `"use client"` only for motion, nav, Imbot, and admin forms.
  - Animation code never lives in Server Components.
- **Tokens only:** `var(--accent)`, never `#3D7BFF`. No inline magic numbers for motion; use `lib/motion` constants.
- **Motion opt-in:** `data-anim="lines|words|stagger|slide|mask|draw"`. One engine scans and animates; it no-ops when the visitor prefers reduced motion.
- **Mutations:** follow parse → authorise → write → revalidate → return a typed result. Errors are values, not thrown strings.
- **Copy** lives in the database or seed JSON, never hard-coded in components (except UI microcopy).
- **Formatting:** Prettier defaults, 2-space indent, single quotes off (match the repo), ESLint `next/core-web-vitals`.

**Example** (the pattern every admin mutation follows):

```ts
// src/features/admin/projects/actions.ts
'use server';

import { updateTag } from 'next/cache';
import { requireRole } from '@/lib/auth/session';
import { projectSchema } from '@/schemas/project';
import { Project } from '@/models/project';

export async function saveProject(input: unknown) {
  await requireRole('editor');
  const parsed = projectSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, errors: parsed.error.flatten() };

  const doc = await Project.findOneAndUpdate({ slug: parsed.data.slug }, parsed.data, {
    upsert: true,
    new: true,
  }).lean();

  updateTag('content:projects');
  return { ok: true as const, id: String(doc._id) };
}
```

```ts
// src/lib/content/projects.ts: public reads are cached and tagged (Cache Components)
import { cacheLife, cacheTag } from 'next/cache';

export async function getFeaturedProjects() {
  'use cache';
  cacheLife('max');
  cacheTag('content:projects');
  return Project.find({ featured: true, status: 'published' }).sort({ order: 1 }).lean();
}
```

---

## 7. Testing strategy

| Level | Tool | What it covers | Location |
|---|---|---|---|
| Unit | Vitest | Theme derivation and contrast math, Zod schemas, grounding-pack builder, rate limiter, cost meter, `can()` permissions | `tests/unit` |
| Integration | Vitest + mongodb-memory-server | Server actions: validation failure, unauthorised user, success + revalidate called. Seed script idempotency. Chat route: cap enforced, out-of-scope refusal path | `tests/integration` |
| Component | Vitest + RTL | MetaTable, Badge ownership mapping, nav chip states, reduced-motion behaviour of the motion provider | `tests/unit` |
| E2E | @playwright/test (Chrome desktop + Pixel/iPhone emulation) | Home renders all sections; nav morphs and expands by mouse and keyboard; case study opens from the carousel; contact form submits (Turnstile test keys); admin sign-in guard; edit a project → change visible on the site; theme accent change applies; Imbot tour runs | `e2e/` |
| Accessibility | @axe-core/playwright | Every public page: **0 serious/critical** issues | `e2e/a11y.spec.ts` |
| Performance | Lighthouse CI | Budgets in §9 on `/`, `/work/clientmanager`, `/about`, mobile preset | `lighthouserc.json` |
| Exploratory | `playwright-cli` skill + gstack `/qa` | Before every milestone: click through flows, check console errors, mobile widths | — |
| Imbot eval | Fixed set of 25 questions (in-scope, out-of-scope, trick questions such as "did he found ClientManager?") | **0 invented claims**; correct refusals | `tests/imbot-eval/` |

**Coverage:** no blanket percentage. Every `lib/` module and server action has tests; every bug fix gets a failing test first (`test-driven-development`).

---

## 8. Boundaries

**Always:**

- Run `npm run check` before every commit.
- Validate every input with Zod, and check permissions **on the server** in every mutation.
- Use tokens, `next/image`, and `data-anim`, and respect `prefers-reduced-motion`.
- Keep ownership labels and the "no live links" rule exactly as in 01 / case studies.
- Run the **humanizer** skill on all user-facing copy before it ships.
- Verify UI changes in a real browser (`playwright-cli`) at 1440px and about 390px before calling them done.
- Build one module slice at a time (`incremental-implementation`); show Imran each finished section.

**Ask first:**

- Any dependency not listed in §3.
- Changing a collection schema after the seed has run in production.
- A Next.js major upgrade.
- Any paid service or plan upgrade.
- Adding copy, numbers, or claims that aren't in `docs/`.
- Changing the build order or merging modules.
- Anything that sends email outside the contact-notification flow.

**Never:**

- Commit secrets or `.env*`.
- Put ClientManager or any client source code or customer data in this repo or in the Imbot knowledge base.
- Show an unredacted client screenshot.
- Invent metrics or testimonials.
- Ship the chat without the rate limit and monthly cap.
- Use white text on the blue accent.
- Weaken or skip tests or lint rules to get green.
- Let Imbot answer from the open web.

---

## 9. Success criteria (testable)

**Performance** (Lighthouse CI, mobile, on Vercel preview):

| Check | Target |
|---|---|
| Performance | **≥ 90** |
| Accessibility | **≥ 95** |
| Best Practices | **≥ 95** |
| SEO | **100** |
| LCP | **< 2.5s** |
| CLS | **< 0.1** |
| TBT | **< 200ms** |
| Field INP (Speed Insights, after launch) | < 200ms |
| JavaScript transferred on `/` (Lighthouse "total byte weight" for scripts; Next 16 no longer prints First Load JS) | ≤ 200 KB gzipped |

Imbot, mascot, chat, and any WebGL load after the main content and **don't count toward the LCP/JS budget**.

**Accessibility:**

- 0 serious/critical axe issues on public pages.
- Every interaction works by keyboard, including the nav chip, the carousel, and Imbot.
- Every page reads correctly with reduced motion (pinned sections become a stacked layout).

**Content:**

- Every claim on the site traces to `01-profile-brief.md` or `case-studies/*`.
- The humanizer pass is done on all copy.
- Case studies show ownership badges and no live links.

**Admin:**

- Editing any text, project, FAQ, or section visibility/order, or **the accent token**, is visible on the public site within **60 seconds** without a deploy.
- Non-allowlisted accounts can't reach `/admin` (e2e-tested).
- Every mutation rejects invalid input and unauthorised users (integration-tested).

**Imbot:**

- The eval set passes with 0 invented claims.
- Spend never exceeds **US $10 per calendar month**. An integration test simulates a meter at 100% and asserts the email fallback message with no API call made.
- Rate limit is ≤ 10 messages per session per 10 minutes.

**SEO / AI:**

- `/llms.txt` and `/llms-full.txt` are generated from published content.
- Valid JSON-LD (Person + projects).
- Every page has unique metadata and an OG image.
- `robots.txt` and `sitemap.xml` are valid.

**Ops:**

- CI is green on `main`.
- Vercel preview per PR.
- Atlas backups on.
- Errors are visible (Vercel logs and Speed Insights).

---

## 10. Decisions (Imran, 29 Oct 2026)

| # | Question | Decision |
|---|---|---|
| 1 | Hosting | **Vercel (free) + Hostinger domain** pointed by DNS · MongoDB Atlas free tier |
| 2 | Media | **Cloudinary** |
| 3 | Admin sign-in | **GitHub + Google**, only `imransafdar360@gmail.com` and `imranguru360@gmail.com`. Library: Better Auth (stable) instead of the beta Auth.js v5 |
| 4 | Lead notifications | **Resend** (first time; DNS records added in Hostinger) |
| 5 | Imbot budget | **US $10/month (about PKR 3,000), Haiku.** At the limit Imbot replies with "email Imran". Mascot sheets drawn with a **free** image tool (Gemini / Microsoft Designer) |
| 6 | Next.js | **Upgrade to the latest (16.4) first**, then start the work |
| 7 | Old wireframe code | **Delete it** at the start (kept in git history) |

## 10b. Original open questions (answered above)

1. **Hosting.** Vercel (free Hobby plan) + MongoDB Atlas (free M0 to start)? `imrandevify.online` points to Vercel today; I'm assuming that's still true.
2. **Media storage.**
   - **Cloudinary** (recommended): free tier, automatic AVIF, cropping, signed uploads.
   - **Vercel Blob:** simpler, but no transformation features.
3. **Admin sign-in.**
   - **Auth.js with GitHub/Google** (recommended): no passwords to protect; only your allowlisted emails get in.
   - **Custom JWT login:** shows off your own auth skills, but it's more code to secure.
4. **Lead notifications.**
   - **Resend email** to you when someone uses the contact form (needs a DNS record on your domain).
   - **Admin inbox only:** you check `/admin`.
5. **Imbot chat budget.**
   - You'll need an **Anthropic API key**. What monthly limit do you want? (The cap is enforced in code; when reached, Imbot says "email Imran" instead.)
   - Drawing your **mascot** with the page-mascot skill needs an **OpenAI API key** (image generation), or another image tool you prefer.
6. **Next.js version.** Stay on 15.5 (recommended for now) or upgrade to the latest major first?
7. **Delete the old wireframe code** at the start of the build (recoverable in git history)? I'm assuming yes.
