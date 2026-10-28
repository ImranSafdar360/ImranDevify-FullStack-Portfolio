# Implementation Plan: Imran Safdar Portfolio V4

_Written with `planning-and-task-breakdown` · 29 October 2026 · Status: **awaiting Imran's approval**_

- **Spec:** [`docs/portfolio-redesign/06-tech-spec.md`](../docs/portfolio-redesign/06-tech-spec.md) (v2)
- **Task list:** [`tasks/todo.md`](todo.md), tasks T1–T50 and human tasks H1–H10

## Overview

We rebuild the portfolio from a clean Next.js 16 base as **one full-stack app**:

- **Public site:** the "Annotated Blueprint" design, GSAP + Lenis motion, real case studies.
- **Admin at `/admin`:** Better Auth with GitHub/Google, MongoDB, Cloudinary.
- **Imbot:** a guide plus a budget-capped Claude Haiku chat.

The public site is built first, reading from MongoDB from the start. The admin then edits what exists, and Imbot comes last.

## Architecture decisions

| Decision | Why |
|---|---|
| Upgrade to Next 16.4 **before** writing new code (T1) | Avoids writing v15 patterns (`unstable_cache`, `middleware`, sync params) that would need rewriting |
| **Cache Components** (`'use cache'` + `cacheTag`) for every public read; admin actions call `updateTag` | Public pages are a static shell on the CDN (fast LCP), and admin edits show immediately, with no redeploy |
| **One read layer** (`src/lib/content/*`); components never query Mongo directly | Cache tags live in one place; Cache Components' prerender rules are satisfied in one place; easy to test |
| **Vertical slices:** each section task creates its own model, schema, seed, UI, and tests | Every task ends with something visible and verifiable; no big "all models" task that isn't proven until weeks later |
| **Data-driven motion** (`data-anim` attributes + one engine) | One place to tune timing, one place for reduced-motion handling; sections stay simple |
| **Styleguide route** (`/styleguide`, noindex, owner-only in production) | Lets Imran review every primitive against the Theme Lab before sections use them |
| Better Auth (stable) instead of Auth.js v5 (beta) | Same GitHub/Google + allowlist behaviour, on a stable release that supports Next 16 and MongoDB |
| Budget guard **reserves** an estimated cost before each chat call, then settles the real cost | Concurrent requests can't push spending past $10 |
| Admin = content and section **manager**, not a page builder | Keeps the designed motion and layout intact (02 §4.6) |

## Phases

| Phase | Tasks | Result | Checkpoint |
|---|---|---|---|
| **0. Upgrade & clean** | T1–T3 | Next 16.4, wireframe gone, test + CI harness | CP0: `npm run check` green in CI |
| **1. Foundation** | T4–T8 | Tokens, fonts, grid, primitives, motion engine, morphing nav | CP1: `/styleguide` matches the Theme Lab; Imran reviews |
| **2. Content model** | T9–T11 | Mongo connection, settings + projects slices, seed from docs | CP2: seeded DB renders on a page |
| **3. Public site** | T12–T24 | Every homepage section, Work, 3 case studies, notes, About, Contact, 404 | CP3: full site with placeholders, e2e + axe + Lighthouse ≥ 90; **Imran reviews** |
| **4. SEO & AI files** | T25–T26 | Metadata, OG images, JSON-LD, sitemap, robots, llms.txt | CP4: Lighthouse SEO 100 |
| **5. Admin auth** | T27–T28 | Sign-in, allowlist, roles, admin shell | CP5: only Imran's 2 emails get in |
| **6. Media** | T29 | Cloudinary uploads with alt text + redaction check | (part of CP7) |
| **7. Admin CMS** | T30–T37 | Every collection editable, theme editor, sections manager, leads, drafts | CP7: edit → live in ≤ 60s; every action tested |
| **8. Imbot** | T38–T43 | Face, guide, tour, grounded chat with $10 cap, eval, admin | CP8: eval 0 invented claims; cap test passes |
| **9. Assets & launch** | T44–T50 | Real screenshots/portrait/props, humanizer pass, perf + security hardening, deploy to `imrandevify.online`, launch QA, promo video | CP9: launch sign-off |

## Dependency graph

```
T1 upgrade ─ T2 clean ─ T3 harness
   │
   ├─ Foundation: T4 tokens/fonts ─ T5 layout ─ T6 UI ─ T7 motion ─ T8 nav
   │
   └─ Content: T9 db + settings ─ T10 projects ─ T11 seed
                       │
        Public site ◄──┴── foundation
          T12 hero ... T24 404
                       │
              T25–T26 SEO/AI
                       │
              T27–T28 auth ─ T29 media ─ T30–T37 CMS
                       │
              T38–T43 Imbot   (T38–T39 only need the public site;
                               T40+ need content + budget meter)
                       │
              T44–T50 assets, hardening, deploy, QA, video
```

### What can run in parallel

| | Tasks |
|---|---|
| **Can run in parallel** | Phase 1 (T4–T8) ∥ Phase 2 (T9–T11) · T15/T16/T17 after T12 · T25/T26 · T35 ∥ T36 · human tasks H1–H10 anytime before they're needed |
| **Must be sequential** | T1 → T2 → T3 · T27 → every admin task · T40 → T41 → T42 |

## Definition of Done (every task, on top of its own acceptance criteria)

1. `npm run check` passes (typecheck, lint, tests, build).
2. New logic has tests. A bug fix starts with a failing test (`test-driven-development`).
3. UI was checked in a real browser with `playwright-cli` at **1440px and ~520px**, plus keyboard and reduced motion.
4. Uses tokens only, no hard-coded colours; no white text on the accent.
5. Copy comes from the DB/seed, never invented; it follows ownership labels and the no-live-links rule.
6. Small, focused commit on the `portfolio-redesign` branch, made **only when Imran asks**.

**Skills used throughout:**

- `incremental-implementation`
- `test-driven-development`
- `frontend-ui-engineering`
- `emil-design-eng` / `impeccable` for polish
- `code-review-and-quality` before each checkpoint
- `humanizer` on all copy
- `performance-optimization` and `security-and-hardening` in Phase 9
- gstack `/qa`, `/design-review`, `/benchmark` at checkpoints

## Risks and mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Next 16 upgrade breaks the existing build (ESLint flat config, Tailwind 4.3, removed APIs) | Med | Done first (T1) on a nearly empty app; official codemod; nothing else depends on it yet |
| Cache Components errors on uncached Mongo reads ("blocking route") | Med | All reads go through `lib/content` with `'use cache'`; runtime data (session) only inside `<Suspense>` in admin |
| Pinned case-study carousel (GSAP pin + Lenis + App Router navigation) is fragile | **High** | Built early in Phase 3 (T14) with `useGSAP` scoping + cleanup on route change. Reduced-motion and mobile get a stacked fallback. e2e covers navigation away and back |
| Performance budget (GSAP + 4 fonts + grain + images) | Med | Measured at CP1 and CP3, not just at the end. Fonts subset and self-hosted; Imbot/WebGL lazy; static grain |
| Atlas M0 connection limits in serverless | Low | Cached connection; reads mostly served from the static shell and cache |
| Imbot invents facts | **High** (credibility) | Grounding pack only from published content; strict system prompt; 25-question eval must pass; "I don't know, email Imran" fallback |
| Chat spend exceeds $10 | Med | Reserve-then-settle meter, hard stop at 100%, Anthropic Console spend limit as a second net, integration test |
| Better Auth + GitHub email mismatch (GitHub primary email isn't on the allowlist) | Low | Allowlist checks all *verified* emails from the provider; H2 confirms one of Imran's emails is verified on GitHub |
| Resend / DNS setup on Hostinger takes time | Low | Leads are stored in MongoDB first; Resend test sender until DNS verifies |
| Mascot sheets from a free tool don't align to the 3×3 grid | Med | Claude writes strict prompts and aligns/slices with `sharp`; a placeholder face ships until the art is right |
| Client confidentiality slips (screenshots, copy) | **High** | Media upload requires a "customer data redacted" confirmation; content only from `docs/`; case-study Part A never seeded |

## Open questions

- None blocking.
- **One change to confirm:** Better Auth instead of Auth.js (same behaviour: GitHub + Google, only Imran's two emails).
