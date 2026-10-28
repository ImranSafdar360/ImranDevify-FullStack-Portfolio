# Task List: Portfolio V4

**Plan:** [`tasks/plan.md`](plan.md) · **Spec:** [`docs/portfolio-redesign/06-tech-spec.md`](../docs/portfolio-redesign/06-tech-spec.md)

Every task also meets the **Definition of Done** in plan.md:

- `npm run check` passes.
- Logic is tested.
- UI is checked in a browser at 1440 / ~520 px, by keyboard, and with reduced motion.
- Tokens only; copy only from docs.

**Sizes:** S = 1–2 files · M = 3–5 files · L = split further.

**Shorthand used in tasks below:**

- **check:** `npm run check` passes.
- **test:** `npm run test` passes.
- **e2e:** `npm run test:e2e` passes.
- **browser:** checked with `playwright-cli` at 1440px and ~520px.

---

## Human tasks (Imran): do these before the task that needs them

| # | What | Needed by |
|---|---|---|
| H1 | Create a MongoDB Atlas account + free M0 cluster (AWS us-east-1), a DB user, and allow network access; send the `MONGODB_URI` privately (put it in `.env.local`, never in chat) | T9 |
| H2 | Create a GitHub OAuth app + Google OAuth client (callback URLs given in T27); make sure one of your two emails is **verified** on GitHub | T27 |
| H3 | Create a Cloudinary account; put `CLOUDINARY_URL` in `.env.local` | T29 |
| H4 | Create a Resend account; later add its DNS records in Hostinger | T18b / T48 |
| H5 | Anthropic Console: API key + **$10 monthly spend limit** | T40 |
| H6 | Generate the 2 mascot sprite sheets in Gemini / Microsoft Designer with Claude's prompts + your 2–3 photos | T38 (placeholder until then) |
| H7 | Redacted screenshots: ClientManager (10 listed in the case study), Blarecast, YBD, E-Axon, CMS app | T44 |
| H8 | 2–3 photos for the About portrait | T44 |
| H9 | Testimonials (1–2 sentences + permission to show name/role) | T44 |
| H10 | Vercel account; access to Hostinger DNS for `imrandevify.online` | T48 |

---

## Phase 0: Upgrade & clean

### T1: Upgrade to Next.js 16.4 + React 19.3 + TS 5.9 + ESLint flat config

**Description:** Run the official codemod and add `AGENTS.md` (version-matched docs). Replace `.eslintrc.json` with `eslint.config.mjs`. Drop `--turbopack` and `next lint` from scripts, and drop the removed `eslint` key from `next.config`.

**Acceptance:** ✅ **Done 29 Oct**
- [x] `next`, `react`, `react-dom`, and `eslint-config-next` are at latest 16.4 / 19.3; TypeScript is 5.9.
- [x] `npm run lint` uses the ESLint CLI with flat config.
- [x] `npm run build` and `npm run dev` work.
- [x] `AGENTS.md` points to `node_modules/next/dist/docs/`.

(Also added a `CLAUDE.md` that imports `AGENTS.md`. Next set `jsx: react-jsx` in `tsconfig.json`.)

**Verify:** typecheck, lint, build; dev server loads `/`.

**Deps:** none. **Files:** `package.json`, `next.config.ts`, `eslint.config.mjs` (new), `.eslintrc.json` (delete), `AGENTS.md`. **Size:** M

### T2: Delete the wireframe; prune dependencies and config

**Description:** Remove `src/components/sections/*`, the old `src/styles/*`, and the wireframe page content. Leave a minimal placeholder home. Remove `motion`, `tw-animate-css`, `@next/bundle-analyzer`, and unused utilities. In `next.config`:
- remove old image hosts and add `res.cloudinary.com`;
- keep the security headers;
- set `images.qualities`.

**Acceptance:** ✅ **Done 29 Oct**
- [x] No wireframe files remain.
- [x] Build passes.
- [x] `/` shows a minimal placeholder.
- [x] Unused deps are gone from `package.json` (removed motion, tw-animate-css, lucide-react, @next/bundle-analyzer, components.json).

Kept: `clsx` + `tailwind-merge` for `cn()`. Pinned `@types/node` to 22 and set `engines.node >=20.9`.

**Verify:** check. `git status` shows only the intended deletions.

**Deps:** T1. **Files:** `src/components/sections/*`, `src/styles/*`, `src/app/page.tsx`, `src/app/layout.tsx`, `package.json`, `next.config.ts` (bulk deletion). **Size:** M

### T3: Test + CI harness

**Description:** Set up Vitest (jsdom) + RTL, Playwright (Chrome + mobile emulation) with one smoke test, and `@axe-core/playwright`. Add the scripts `test`, `test:e2e`, `check`, and `seed` (placeholder). Add a GitHub Actions CI workflow: typecheck, lint, test, build.

**Acceptance:** ✅ **Done 29 Oct** (CI runs on the first push)
- [x] `npm run check` passes locally.
- [x] A smoke e2e opens `/`: 4/4 pass on desktop + mobile, including axe.
- [x] The CI workflow runs on push / PR (`.github/workflows/ci.yml`; first run happens when Imran pushes).

Vitest uses Vite's native `resolve.tsconfigPaths` (no `vite-tsconfig-paths`). The `seed` script is added in T11, when it does something.

**Verify:** run check and e2e; push the branch and confirm CI is green (when Imran pushes).

**Deps:** T2. **Files:** `vitest.config.ts`, `playwright.config.ts`, `e2e/smoke.spec.ts`, `.github/workflows/ci.yml`, `package.json`. **Size:** M

### Checkpoint 0 ✅ (29 Oct, local)
- [x] Clean Next 16.4 app.
- [x] check + smoke e2e green.
- [x] CI configured (first green run pending the first push).

**Notes:**
- `sharp` upgraded to 0.35.5 (libvips CVEs fixed).
- 2 remaining `npm audit` highs (`minimatch` / `brace-expansion`) are dev-only, inside `eslint-config-next`'s plugins, and never shipped. They will be re-checked at T47.

---

## Phase 1: Foundation (can run in parallel with Phase 2)

### T4: Theme tokens, base styles, fonts, theme math

**Description:**
- `tokens.css`: every token from 05-theme.
- `base.css`: reset, focus ring, selection, static grain overlay.
- Fonts: `next/font` Mohave + Rock Salt, local Satoshi woff2, Geist Mono.
- `lib/theme`: derive hover / pressed / soft / ink from the accent, plus a contrast ratio function.

**Acceptance:**
- [ ] Page background `#0B0B0C`; fonts load self-hosted.
- [ ] `deriveAccent('#3D7BFF')` gives ink `#0B0B0C`.
- [ ] Contrast unit tests match the 05-theme values within ±0.1.

**Verify:** test; browser (fonts render, no FOIT).

**Deps:** T2. **Files:** `src/styles/tokens.css`, `src/styles/base.css`, `src/app/layout.tsx`, `src/lib/theme/*.ts`, `tests/unit/theme.test.ts`, `public/fonts/satoshi-*.woff2`. **Size:** M

### T5: Layout primitives + styleguide route

**Description:**
- `Frame`: dashed rails, max 1320px.
- `Section`: top line, `+` markers, optional hatch band after.
- `SectionLabel`: `/ 01 /`.
- `ScriptLabel`: Rock Salt + SVG wiggle filter; static when reduced motion is on.
- `/styleguide` page (noindex) showing them.

**Acceptance:**
- [ ] Matches the Theme Lab visually.
- [ ] Wiggle stops with reduced motion.
- [ ] `/styleguide` is excluded from the sitemap and has noindex.

**Verify:** browser screenshots vs Theme Lab; component test for reduced motion.

**Deps:** T4. **Files:** `src/components/layout/frame.tsx`, `section.tsx`, `src/components/ui/script-label.tsx`, `src/app/(dev)/styleguide/page.tsx`. **Size:** M

### T6: UI primitives

**Description:**
- `Button`: primary / ghost; fill + label-roll hover.
- `CtaBar`
- `Badge`: built / extended / in-development styles.
- `Pill`
- `BezelCard`
- `MetaTable`

All are added to the styleguide.

**Acceptance:**
- [ ] Hover, focus, and pressed states match 05 §5.
- [ ] Badge maps ownership enum → style (unit test).
- [ ] All primitives are keyboard-focusable with a visible ring.

**Verify:** test; browser (hover/focus); axe on `/styleguide` shows 0 serious.

**Deps:** T5. **Files:** `src/components/ui/{button,cta-bar,badge,pill,bezel-card,meta-table}.tsx` (grouped), `tests/unit/badge.test.tsx`. **Size:** M

### T7: Motion system

**Description:**
- `lib/motion`: register GSAP plugins and the CustomEase curves (03 §1.5).
- `LenisProvider`: duration ~1.1, synced to the GSAP ticker; disabled with reduced motion.
- `AnimEngine`: scans `data-anim` and runs lines / words / stagger / slide / mask / draw reveals with `useGSAP` scoping.
- Cleanup on route change.

**Acceptance:**
- [ ] Reveals play once at `top 75%`.
- [ ] With reduced motion: no Lenis, no reveals (content visible immediately).
- [ ] No ScrollTrigger leaks after client navigation.

**Verify:** unit test (reduced motion → no-op); e2e: navigate away and back → no console errors; browser check.

**Deps:** T5. **Files:** `src/lib/motion/{gsap.ts,eases.ts,lenis-provider.tsx,anim-engine.tsx}`, `tests/unit/motion.test.tsx`. **Size:** M

### T8: Morphing nav + footer shell

**Description:**
- Nav: full bar → chip at 140px of scroll; expands on hover / click / focus.
- `Escape` closes it; `aria-expanded` is set.
- Live Lahore clock.
- Footer shell: "Let's talk", emails, links, from static props for now.

**Acceptance:**
- [ ] Every chip state works by mouse, touch, and keyboard.
- [ ] Focus is trapped neither in the chip nor outside it.
- [ ] e2e covers chip → expand → link.

**Verify:** e2e `nav.spec.ts`; browser at 1440 / 520; axe.

**Deps:** T6, T7. **Files:** `src/components/layout/{nav,footer,clock}.tsx`, `e2e/nav.spec.ts`. **Size:** M

### Checkpoint 1: Foundation
- [ ] `/styleguide` matches the Theme Lab (screenshots attached for Imran).
- [ ] axe 0 serious.
- [ ] Lighthouse on `/styleguide`: Performance ≥ 90.
- [ ] `code-review-and-quality` pass.
- [ ] **Imran reviews** before Phase 3.

---

## Phase 2: Content model (after H1)

### T9: DB connection + Settings slice

**Description:**
- Cached Mongoose connection.
- `Settings` model + Zod schema.
- `getSettings()` with `'use cache'` / `cacheLife('max')` / `cacheTag('content:settings')`.
- The footer reads emails and availability from it.

**Acceptance:**
- [ ] One connection is reused across calls.
- [ ] Integration test (mongodb-memory-server) reads defaults.
- [ ] The footer shows DB values.

**Verify:** test; browser footer.

**Deps:** T3, H1. **Files:** `src/lib/db/mongoose.ts`, `src/models/settings.ts`, `src/schemas/settings.ts`, `src/lib/content/settings.ts`, `tests/integration/settings.test.ts`. **Size:** M

### T10: Projects slice (model, schema, read layer)

**Description:**
- `Project` model with typed blocks (discriminated union) and ownership enum.
- Read functions: `getFeaturedProjects`, `getProjectBySlug`, `getAllProjects`, with `cacheTag('content:projects')`.
- Published-only filter.

**Acceptance:**
- [ ] Schema rejects an unknown ownership value or a block type that doesn't match its data.
- [ ] Drafts are never returned by public reads.

**Verify:** unit (schema) + integration (reads) tests.

**Deps:** T9. **Files:** `src/models/project.ts`, `src/schemas/project.ts`, `src/lib/content/projects.ts`, `tests/integration/projects.test.ts`. **Size:** M

### T11: Seed pipeline + first content

**Description:**
- `content/seed/*.json` built **only** from `docs/`: settings, 3 case studies, 3 notes + other work, FAQ, experience, home sections.
- `scripts/seed.ts` does an idempotent upsert by slug/key.
- **humanizer** pass on the seed copy.

**Acceptance:**
- [ ] Running the seed twice produces no duplicates.
- [ ] Every claim maps to a line in 01 or the case-study files (checklist in the PR description).
- [ ] No case-study "Part A" research is seeded.

**Verify:** integration test (idempotency); manual claim audit.

**Deps:** T10. **Files:** `content/seed/{settings,projects,faqs,experience,sections}.json`, `scripts/seed.ts`, `tests/integration/seed.test.ts`. **Size:** M

### Checkpoint 2: Content
- [ ] Seeded Atlas DB.
- [ ] A test page renders featured projects from the DB.
- [ ] Prerender works with no "blocking route" errors.

---

## Phase 3: Public site

### T12: Hero + wordmark → nav Flip

**Description:**
- Hero from the `sections` (home.hero) content: wordmark, availability + clock, script label, H1, intro, CTA bar, resume link.
- Right side: screenshot composition with placeholder frames + placeholder props.
- GSAP Flip moves the wordmark into the nav chip on scroll.

**Acceptance:**
- [ ] Matches 04 §1 copy from the DB.
- [ ] LCP element is text (not an image).
- [ ] Flip reverses at the top.
- [ ] With reduced motion, the chip simply appears.

**Verify:** e2e (hero visible, CTA → `#cases`); browser; Lighthouse on `/` (LCP < 2.5s).

**Deps:** CP1, CP2. **Files:** `src/features/home/hero/*`, `src/models/section.ts`, `src/schemas/section.ts`, `src/lib/content/sections.ts`. **Size:** M

### T13: Statement band + capabilities scroll list

**Description:** "LIVE PRODUCTS. REAL USERS. REAL CONSEQUENCES." with grunge band; 6 capability rows. The active row is the one at the centre of the viewport. "Seen in →" links to case studies.

**Acceptance:**
- [ ] Rows come from the DB.
- [ ] The active state follows scroll.
- [ ] Links resolve to existing slugs.
- [ ] AI row shows the "In development" badge.

**Verify:** e2e (links); browser scroll check.

**Deps:** T12. **Files:** `src/features/home/{statement,capabilities}/*`. **Size:** M

### T14: Featured case-study carousel (high risk, build early)

**Description:** Pinned section:
- marquee title "CASE STUDIES (03)"
- odometer meta swap (Year · Role · Stack)
- image wipe between project frames
- progress lines
- "Read case study"

Fallback: stacked cards on mobile and with reduced motion.

**Acceptance:**
- [ ] Scrolling advances projects 1 → 3 smoothly.
- [ ] Every card is reachable by keyboard.
- [ ] No pin jump after client navigation.
- [ ] Stacked layout below 900px and with reduced motion.

**Verify:** e2e (navigate into a case study and back); browser at both widths; performance trace shows no long tasks over 200ms while scrolling.

**Deps:** T12. **Files:** `src/features/home/case-carousel/*` (≤ 4 files). **Size:** M

### T15: At-a-glance bento with data graphics

**Description:** Tiles from the DB:
- 2+ years (timeline)
- 5 providers (nodes)
- 240 tests (grid)
- ~780 commits (sparkline)
- 9-step (stepper)
- 1 solo app
- US/EU clocks

All counters are verified facts only.

**Acceptance:**
- [ ] Each tile renders from data.
- [ ] Odometer counters animate once.
- [ ] Graphics use tokens.
- [ ] 4 → 2 → 1 columns across breakpoints.

**Verify:** unit test (sparkline path from data); browser.

**Deps:** T12. **Files:** `src/features/home/bento/*`. **Size:** M

### T16: How I work + Journey

**Description:**
- 4 process cards: tilted, activate on scroll, hand-drawn arrows.
- Sticky "FROM A BLANK EDITOR / TO LIVE PRODUCTS" title with 6 experience cards (`Experience` model).

**Acceptance:**
- [ ] Cards activate in order.
- [ ] Journey cards come from the DB.
- [ ] Sticky behaviour falls back to static with reduced motion.

**Verify:** browser; integration test for experience reads.

**Deps:** T12. **Files:** `src/features/home/{process,journey}/*`, `src/models/experience.ts`, `src/lib/content/experience.ts`. **Size:** M

### T17: Testimonials + Ways to work + FAQ

**Description:**
- Testimonials section: hidden when there are no visible testimonials.
- Two "ways to work" cards (jobs first).
- FAQ accordion split by audience (`Faq`, `Testimonial` models).

**Acceptance:**
- [ ] No testimonials → the section doesn't render (no empty shell).
- [ ] The FAQ is an accessible disclosure pattern.
- [ ] Copy comes from the DB.

**Verify:** e2e (FAQ open by keyboard); integration tests.

**Deps:** T12. **Files:** `src/features/home/{testimonials,ways,faq}/*`, `src/models/{faq,testimonial}.ts`. **Size:** M

### T18a: Contact page + lead capture

**Description:**
- `/contact` + footer form: name, email, intent, message.
- Server action: Zod → Turnstile verify → honeypot → rate limit → save `Lead`.
- Typed success / error states.

**Acceptance:**
- [ ] A valid submission is stored.
- [ ] Invalid input, a failed Turnstile check, and rate-limited requests are each rejected with clear messages.
- [ ] Fully keyboard accessible.

**Verify:** integration tests (4 paths); e2e with Turnstile test keys.

**Deps:** T9. **Files:** `src/app/(site)/contact/page.tsx`, `src/features/contact/{form.tsx,actions.ts}`, `src/models/lead.ts`, `tests/integration/contact.test.ts`. **Size:** M

### T18b: Resend lead notification

**Description:** After the lead is stored, send an email to Imran via Resend (test sender until DNS is verified). A failure is logged and never loses the lead.

**Acceptance:**
- [ ] Email arrives in the test inbox.
- [ ] With Resend down, the lead is still saved and the user sees success.

**Verify:** integration test with a mocked Resend failure; manual test email.

**Deps:** T18a, H4. **Files:** `src/lib/email/notify-lead.ts`, the action file, a test. **Size:** S

### T19: Work index

**Description:** `/work` lists case studies (with ownership badges), project notes, and an "other work" list (Shahid Recovery etc.). Card hover: fill + accent border.

**Acceptance:**
- [ ] All published projects are listed, in order.
- [ ] Badges are correct.
- [ ] No live links.

**Verify:** e2e; browser.

**Deps:** T10. **Files:** `src/app/(site)/work/page.tsx`, `src/features/work/*`. **Size:** S

### T20a: Case-study template, part 1

**Description:** `/work/[slug]` with `generateStaticParams`. Includes:
- header (script label, huge title, one-liner, MetaTable with badges / pills)
- hero screenshot frame (placeholder)
- overview
- "My role"

ClientManager renders from the DB.

**Acceptance:**
- [ ] `/work/clientmanager` prerenders.
- [ ] An unknown slug returns 404.
- [ ] Copy matches case-study Part B.

**Verify:** e2e; browser; Lighthouse on `/work/clientmanager` ≥ 90.

**Deps:** T10, T11. **Files:** `src/app/(site)/work/[slug]/page.tsx`, `src/features/case-study/{header,overview,role}.tsx`. **Size:** M

### T20b: Case-study template, part 2

**Description:**
- Challenge blocks (Problem → Approach → Result) on a dark grunge band with sticky label.
- Scope-fact counters.
- Testimonial block.
- Stack.
- "More case studies".

**Acceptance:**
- [ ] All three ClientManager challenges render.
- [ ] Counters animate once.
- [ ] "More" excludes the current project.

**Verify:** e2e; browser.

**Deps:** T20a. **Files:** `src/features/case-study/{challenges,scope-facts,stack,more}.tsx`. **Size:** M

### T21: Diagram components

**Description:** SVG diagrams using tokens, with accent only on the key path. A diagram block type picks a component by key.
- Payment layer (connect → factory → link → pay → status → mark-paid-once → event)
- Forms embed pipeline
- (Blarecast) playback architecture
- (YBD) chat event flow

**Acceptance:**
- [ ] Diagrams are readable at 390px.
- [ ] Each has a text alternative.
- [ ] Draw-on animation; static with reduced motion.

**Verify:** browser; axe.

**Deps:** T20b. **Files:** `src/features/case-study/diagrams/*` (≤ 5). **Size:** M

### T22: Blarecast + YBD case studies + project notes

**Description:**
- Seed content for Blarecast and YBD (from the brief §5) and a project-note template.
- Notes: Learning CMS, E-Axon, Codebase cleanup.

**Acceptance:**
- [ ] 3 case studies + 3 notes render.
- [ ] Ownership labels are exactly as in 01.
- [ ] Humanizer pass done.

**Verify:** e2e visits all 6; manual claim audit.

**Deps:** T21. **Files:** `content/seed/projects.json`, `src/features/case-study/note-template.tsx`, the page file. **Size:** M

### T23: About page

**Description:**
- Portrait frame (placeholder).
- Story.
- How I work (reused).
- Skills by evidence (three tiers).
- Education.
- CTA.

**Acceptance:**
- [ ] Content from the DB.
- [ ] Skills show three labelled tiers.
- [ ] No founder content.

**Verify:** browser; Lighthouse.

**Deps:** T16. **Files:** `src/app/(site)/about/page.tsx`, `src/features/about/*`. **Size:** S

### T24: 404 page

**Description:** "This page doesn't exist. These do:" + links (Imbot goes dizzy later in T38).

**Acceptance:**
- [ ] Unknown URLs return 404 status with this page.

**Verify:** e2e.

**Deps:** T8. **Files:** `src/app/not-found.tsx`. **Size:** S

### Checkpoint 3: Public site complete (with placeholders)
- [ ] All e2e journeys pass.
- [ ] axe 0 serious on every page.
- [ ] Lighthouse mobile ≥ 90 / 95 / 95 / 100 on `/`, `/work/clientmanager`, `/about`.
- [ ] Humanizer pass on all copy.
- [ ] gstack `/design-review` + `/qa`.
- [ ] **Imran reviews the whole site.**

---

## Phase 4: SEO & AI files

### T25: Metadata, OG images, JSON-LD

**Description:**
- `generateMetadata` per page from the DB.
- `opengraph-image.tsx` (site + per case study) in the brand style.
- JSON-LD: Person (home / about), CreativeWork (case studies).

**Acceptance:**
- [ ] Every page has a unique title / description.
- [ ] OG images render at 1200×630.
- [ ] JSON-LD validates.

**Verify:** unit test (metadata builder); manual Rich Results test after deploy.

**Deps:** CP3. **Files:** `src/lib/seo/*`, `src/app/opengraph-image.tsx`, `src/app/(site)/work/[slug]/opengraph-image.tsx`. **Size:** M

### T26: sitemap, robots, llms.txt, llms-full.txt

**Description:** All generated from published content. `llms.txt` is a summary with links; `llms-full.txt` is the full profile and case-study text.

**Acceptance:**
- [ ] Drafts and `/styleguide` / `/admin` are excluded.
- [ ] Files update when content changes (cache tags).

**Verify:** integration test (contents); Lighthouse SEO 100.

**Deps:** T25. **Files:** `src/app/{sitemap,robots}.ts`, `src/app/llms.txt/route.ts`, `src/app/llms-full.txt/route.ts`. **Size:** M

### Checkpoint 4
- [ ] SEO 100.
- [ ] llms files are correct and drafts never leak.

---

## Phase 5: Admin auth (after H2)

### T27: Better Auth with GitHub + Google + allowlist + roles

**Description:**
- Better Auth server config (MongoDB adapter, GitHub + Google providers).
- A hook rejects any user whose verified email isn't in `ADMIN_EMAILS`.
- Role field (owner / editor).
- `requireRole()` / `can()`.
- `/admin/sign-in` page.
- `proxy.ts` optimistic redirect.

**Acceptance:**
- [ ] Only the two emails can create a session.
- [ ] Every other account is refused with no user record created.
- [ ] Server helpers throw for missing or insufficient roles.

**Verify:** unit test (`can()`); integration test (allowlist rejection); manual sign-in with both providers.

**Deps:** T9, H2. **Files:** `src/lib/auth/{server.ts,client.ts,session.ts}`, `src/app/api/auth/[...all]/route.ts`, `src/proxy.ts`, a test. **Size:** M

### T28: Admin shell

**Description:** `/admin` layout: side nav, dashboard (counts of projects / leads, chat budget meter placeholder), sign-out. Session read inside `<Suspense>`.

**Acceptance:**
- [ ] Signed-out users visiting any `/admin` URL go to sign-in.
- [ ] Signed-in users see the dashboard.
- [ ] noindex.

**Verify:** e2e (redirect).

**Deps:** T27. **Files:** `src/app/(admin)/admin/{layout,page}.tsx`, `src/features/admin/shell/*`. **Size:** M

### Checkpoint 5
- [ ] Auth e2e + integration green.
- [ ] Only Imran can get in.

---

## Phase 6: Media (after H3)

### T29: Cloudinary uploads + media library

**Description:**
- `Media` model.
- Signed upload action.
- Upload component: alt text required; "customer data redacted" checkbox required for anything tagged client.
- Library grid.
- Picker used by editors.

**Acceptance:**
- [ ] Upload is refused without alt text, or without the redaction confirmation on client images.
- [ ] Images serve via `next/image` from `res.cloudinary.com` as AVIF/WebP.

**Verify:** integration tests (validation); manual upload.

**Deps:** T28. **Files:** `src/models/media.ts`, `src/features/admin/media/{actions.ts,uploader.tsx,library.tsx}`, a test. **Size:** M

---

## Phase 7: Admin CMS

**Rule for every task in this phase:** each action has tests for invalid input, an unauthorised user, success, and `updateTag`.

### T30: Settings editor

**Description:** Edit availability, emails, socials, SEO defaults.

**Acceptance:**
- [ ] A change appears on the public site in ≤ 60s.

**Verify:** e2e (edit → public check); integration.

**Deps:** T28. **Files:** `src/features/admin/settings/*`. **Size:** M

### T31: Theme editor

**Description:**
- Accent picker with live preview of derived states.
- Contrast warnings (3:1 UI / 4.5:1 text).
- Background presets, grain on/off + strength, wiggle and script toggles, radius scale.
- Root layout injects tokens from settings.

**Acceptance:**
- [ ] Changing the accent restyles the site.
- [ ] An unreadable choice shows a warning and needs confirmation.
- [ ] Tokens only (no hard-coded colours anywhere — grep check).

**Verify:** e2e (accent change); unit tests on derivation.

**Deps:** T30. **Files:** `src/features/admin/theme/*`, `src/app/layout.tsx`. **Size:** M

### T32: Projects editor: core fields

**Description:**
- List with order drag, featured toggle, status (draft / published).
- Edit title, one-liner, year, role, ownership, platform, stack.

**Acceptance:**
- [ ] Create, edit, publish, unpublish, and reorder all work.
- [ ] Drafts are invisible publicly.

**Verify:** e2e; integration.

**Deps:** T29. **Files:** `src/features/admin/projects/{list,form,actions}.tsx`. **Size:** M

### T33: Case-study block editor

**Description:** Add, reorder, edit, and delete blocks (overview, role, challenge, diagram key, scope facts, testimonial ref, stack, image), with the media picker.

**Acceptance:**
- [ ] Each block type validates with its schema.
- [ ] Reorder persists.
- [ ] Preview matches the public render.

**Verify:** integration (per block type); e2e (add challenge → visible).

**Deps:** T32. **Files:** `src/features/admin/projects/blocks/*` (≤ 5). **Size:** M

### T34: Sections manager

**Description:** Home sections: order, visibility, variant, and a typed content form per section type.

**Acceptance:**
- [ ] Hiding or reordering a section reflects publicly.
- [ ] Each section form validates.

**Verify:** e2e; integration.

**Deps:** T30. **Files:** `src/features/admin/sections/*`. **Size:** M

### T35: Experience / FAQ / Testimonials editors

**Description:** A generic list-editor component reused for the three collections. Testimonial permission flag required before it can be visible.

**Acceptance:**
- [ ] CRUD + order for all three.
- [ ] A testimonial can't be made visible without permission.

**Verify:** integration; e2e (one).

**Deps:** T30. **Files:** `src/features/admin/lists/*`, the three configs. **Size:** M

### T36: Leads inbox

**Description:** List leads with intent filter; status new / replied / archived; mailto reply.

**Acceptance:**
- [ ] New leads appear.
- [ ] Status persists.

**Verify:** e2e.

**Deps:** T28, T18a. **Files:** `src/features/admin/leads/*`. **Size:** S

### T37: Draft preview

**Description:** Owner-only preview of draft projects / sections via `draftMode`.

**Acceptance:**
- [ ] Drafts are viewable only when signed in with preview on.
- [ ] Never cached publicly.

**Verify:** e2e.

**Deps:** T32. **Files:** `src/app/api/preview/route.ts`, read-layer flag. **Size:** S

### Checkpoint 7
- [ ] Every collection is editable.
- [ ] Edit → live in ≤ 60s.
- [ ] All admin actions tested.
- [ ] `code-review-and-quality` + `security-and-hardening` pass on the admin.

---

## Phase 8: Imbot

### T38: Imbot face

**Description:**
- `page-mascot` loaded after the main content (dynamic import on idle).
- Placeholder sheets until H6.
- Reactions on poke; dizzy on 404.
- Smaller on mobile.

**Acceptance:**
- [ ] Not in the LCP / JS budget.
- [ ] Follows the cursor (fine pointer only).
- [ ] Respects reduced motion.

**Verify:** Lighthouse unchanged vs CP3; browser.

**Deps:** CP3. **Files:** `src/features/imbot/face.tsx`, `public/mascot/*`. **Size:** S

### T39a: Guide: docks + messages

**Description:**
- `BuddyMessage` model + seed.
- `data-imbot-dock` points per section.
- GSAP travel between docks on scroll.
- Speech bubble at most once per section per visit.
- Minimise / dismiss remembered.

**Acceptance:**
- [ ] Messages come from the DB.
- [ ] No more than one bubble per section.
- [ ] Never covers the CTA or text (checked at both widths).

**Verify:** e2e; browser.

**Deps:** T38. **Files:** `src/features/imbot/{guide.tsx,docks.ts}`, `src/models/buddy-message.ts`. **Size:** M

### T39b: Guided tour

**Description:** "Show me around" uses Lenis `scrollTo` section by section, with Next / Stop and keyboard support. Never auto-starts.

**Acceptance:**
- [ ] The tour visits every visible section in order.
- [ ] Stop returns control.
- [ ] Works with reduced motion (jump instead of scroll).

**Verify:** e2e.

**Deps:** T39a. **Files:** `src/features/imbot/tour.tsx`. **Size:** S

### T40: Chat backend with grounding + $10 budget guard

**Description:**
- **Grounding-pack builder:** published settings, projects, FAQ, and experience → compact text.
- **`/api/chat`:**
  - streamed Anthropic call with `IMBOT_MODEL`
  - prompt caching
  - strict system prompt (answer only from the pack; otherwise "I'm not sure, email Imran")
  - Turnstile check, session rate limit (10 / 10 min)
- **Budget meter:** reserve an estimate → call → settle the real cost (prices from config). 80% warns; 100% returns the fallback **without calling the API**.
- `ChatLog` (no IP; 180-day TTL).

**Acceptance:**
- [ ] At 100% budget, no API call is made and the fallback text is exact.
- [ ] Rate limit enforced.
- [ ] Logs saved.
- [ ] Unit tests for the pack and meter.

**Verify:** test (meter, pack, rate limit, cap) with the SDK mocked.

**Deps:** T11, H5. **Files:** `src/lib/imbot/{grounding.ts,budget.ts,rate-limit.ts}`, `src/app/api/chat/route.ts`, `src/models/{chat-log,usage}.ts`, tests. **Size:** M

### T41: Chat UI

**Description:** Panel opened from the bubble. Shows streaming text, suggested questions, the fallback state, and an "AI assistant" disclosure.

**Acceptance:**
- [ ] Streams smoothly.
- [ ] Keyboard and screen-reader friendly (live region).
- [ ] Works on mobile.

**Verify:** e2e with a mocked API; browser.

**Deps:** T40. **Files:** `src/features/imbot/chat/*`. **Size:** M

### T42: Imbot eval

**Description:** A 25-question set covering:
- in-scope questions
- out-of-scope questions
- traps ("Did he found ClientManager?", "Is the AI assistant live?", "What's his salary?")

A script runs it against the real model.

**Acceptance:**
- [ ] 0 invented claims.
- [ ] Correct refusals.
- [ ] Results saved in `tests/imbot-eval/results.md`.

**Verify:** run the eval script; Imran reviews the answers.

**Deps:** T41. **Files:** `tests/imbot-eval/{questions.json,run.ts,results.md}`. **Size:** S

### T43: Admin: Imbot

**Description:** Edit buddy messages and tour order; view chat logs; usage meter with month-to-date spend.

**Acceptance:**
- [ ] Message edits are live in ≤ 60s.
- [ ] Logs are visible.
- [ ] The meter matches the `usage` collection.

**Verify:** integration; e2e.

**Deps:** T40, T28. **Files:** `src/features/admin/imbot/*`. **Size:** M

### Checkpoint 8
- [ ] Eval passes.
- [ ] Cap test passes.
- [ ] Lighthouse is still within budget with Imbot on.
- [ ] Imran tries Imbot.

---

## Phase 9: Assets, hardening, launch

### T44: Real assets

**Description:**
- Imran's redacted screenshots (H7), uploaded through the admin.
- Graded portrait (H8).
- Mascot sheets (H6) aligned with `sharp`.
- 3D props: pre-rendered PNG/AVIF from a free tool, or tasteful CSS props if unavailable.
- Resume PDF placeholder link (ATS resume is a separate task).

**Acceptance:**
- [ ] No placeholders remain.
- [ ] Every image has alt text.
- [ ] Client images are redaction-confirmed.

**Verify:** browser walkthrough; Lighthouse.

**Deps:** CP8, H6–H8. **Files:** content via admin; `public/mascot/*`. **Size:** M

### T45: Final copy pass

**Description:** Export all published copy → **humanizer** → re-import / edit via the admin. Claim audit against `docs/`.

**Acceptance:**
- [ ] Every string reviewed.
- [ ] No banned phrases (01 §8).
- [ ] Claim checklist complete.

**Verify:** Imran approves the copy.

**Deps:** T44. **Size:** S

### T46: Performance hardening

**Description:**
- Lighthouse CI config with the budgets from spec §9, run in CI against the Vercel preview.
- Fix regressions: font subsets, image sizes, lazy boundaries.

**Acceptance:**
- [ ] All budgets green in CI.

**Verify:** `npm run lhci` and CI.

**Deps:** T45. **Files:** `lighthouserc.json`, `.github/workflows/ci.yml`, fixes. **Size:** M

### T47: Security review

**Description:**
- `security-and-hardening` skill + gstack `/cso`.
- Check headers / CSP (Turnstile, Cloudinary, Anthropic only server-side), auth on every action, rate limits, `npm audit`, secrets scan.

**Acceptance:**
- [ ] No high findings open.
- [ ] CSP doesn't break features.

**Verify:** review report; e2e still green.

**Deps:** T46. **Size:** M

### T48: Deploy to Vercel + domain + DNS

**Description:**
- Vercel project and env vars; Atlas network access.
- Hostinger DNS: A / CNAME for `imrandevify.online` + `www`; Resend SPF / DKIM.
- Speed Insights / Analytics on.
- Production seed.

**Acceptance:**
- [ ] Site live on `https://imrandevify.online` with HTTPS.
- [ ] Admin sign-in works on production.
- [ ] Lead email arrives from `notify@imrandevify.online`.

**Verify:** prod smoke e2e (`BASE_URL`).

**Deps:** T47, H10, H4. **Size:** M (mostly configuration together with Imran)

### T49: Launch QA

**Description:**
- gstack `/qa` + `playwright-cli` full pass (desktop, mobile, keyboard, reduced motion).
- Final Lighthouse + axe on production.
- Imran sign-off.

**Acceptance:**
- [ ] Every spec §9 criterion is checked off with evidence.

**Verify:** QA report in `docs/portfolio-redesign/launch-qa.md`.

**Deps:** T48. **Size:** S

### T50: Promo video (post-launch, optional)

**Description:** HyperFrames promo / demo video of the live portfolio (`hyperframes` skills).

**Acceptance:**
- [ ] A 30–45s MP4 + vertical cut that Imran approves.

**Verify:** Imran reviews the render.

**Deps:** T49. **Size:** M

### Checkpoint 9: Launch
- [ ] All spec success criteria are met.
- [ ] The site is live.
- [ ] Imran signs off.
