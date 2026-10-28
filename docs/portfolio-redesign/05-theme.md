# Step 4 — Theme & Visual System (final)

_Imran Safdar · Portfolio Redesign · v1 · 29 October 2026_

## How to use this file

This file is the **visual source of truth** for the build.

- **Imran's picks** (from the Theme Lab, 29 Oct):

  | Choice | Pick |
  |---|---|
  | Accent | **Electric blue `#3D7BFF`** |
  | Background | **Carbon `#0B0B0C`** |
  | Fonts | **Mohave + Rock Salt + Satoshi** (+ Geist Mono for labels) |
  | Texture | **Grain at 10%** |

- **Live reference:** [`theme-lab/index.html`](theme-lab/index.html). Every component here exists there.
- Motion values are in [`03-reverse-engineering.md`](03-reverse-engineering.md) §1.5 and §4.6.
- **Admin rule:** every token in §1 is a CSS variable. The admin theme editor writes these values, and nothing in components is hard-coded.

---

## 1. Colour tokens (dark theme only)

### 1.1 Surfaces and lines

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0B0B0C` | Page background (Carbon) |
| `--surface` | `#141416` | Cards, tiles, panels |
| `--surface-2` | `#1B1B1E` | Raised areas, bezel outer gradient, skeletons |
| `--line` | `#2A2A2E` | Section separators, card borders, dividers |
| `--line-strong` | `#3A3A40` | Framed-grid dashed rails, button outlines |

### 1.2 Text

Contrast ratios are measured on `--bg`.

| Token | Value | Contrast | Use |
|---|---|---|---|
| `--text` | `#EEEEEE` | ~16:1 | Headings, main text |
| `--text-2` | `#A4A4A4` | ~7.8:1 | Body copy, descriptions |
| `--text-3` | `#8A8A8A` | ~5.5:1 | Meta, mono labels, `+` markers |
| `--text-4` | `#6E6E6E` | ~3.6:1 | **Large or decorative only**: inactive capability rows, ghost numbers |

### 1.3 Accent

| Token | Value | Contrast | Use |
|---|---|---|---|
| `--accent` | `#3D7BFF` | 5.1:1 | Script labels, links, live dot, active states, "Built" badge, highlights, CTA fills |
| `--accent-hover` | `#5A8FFF` | — | Hover on accent text/links |
| `--accent-pressed` | `#2F63D6` | — | Pressed state |
| `--accent-soft` | `#3D7BFF` at 16% | — | Badge backgrounds, selection, chart fills |
| `--accent-ink` | `#0B0B0C` | 5.1:1 on accent | **Text on accent fills** |

> **Why dark text on blue:** dark-on-blue passes accessibility at 5.1:1. **White on this blue fails** (3.8:1), so white is never used on a blue fill.

### 1.4 States and feedback

| Token | Value | Use |
|---|---|---|
| `--success` | `#4ADE80` | Form success, test-pass graphics |
| `--danger` | `#F87171` | Form errors |
| Focus ring | `2px solid var(--accent)`, offset `3px` | Every interactive element. Never removed |
| Selection | background `--accent`, text `--accent-ink` | Text selection |

### 1.5 Colour rules

1. **One accent only.** No second brand colour, no gradients between colours. Blue appears in small, deliberate amounts:
   - one script label per section
   - active states
   - the CTA bar
   - key numbers
2. The accent is **editable in the admin**, with a live contrast check that warns below:
   - **3:1** for UI
   - **4.5:1** for text use

   `--accent-hover`, `--accent-pressed`, `--accent-soft` and `--accent-ink` are **derived automatically** from the chosen accent: lighter, darker, 16% alpha, and whichever of black/white contrasts more.

---

## 2. Typography

### 2.1 Families

| Role | Family | Weights | Loading (Step 5) |
|---|---|---|---|
| Display | **Mohave** | 700 (600 spare) | `next/font/google`, self-hosted at build |
| Script | **Rock Salt** | 400 | `next/font/google`, only on short labels |
| Body / UI | **Satoshi** | 400, 500, 700 | Self-host the woff2 via `next/font/local` (not the Fontshare CDN) |
| Mono labels | **Geist Mono** | 400, 500 | `geist` package (already installed) |

### 2.2 Scale

All sizes are fluid `clamp()` values, taken from the Theme Lab.

| Style | Font | Size | Line-height | Tracking | Case |
|---|---|---|---|---|---|
| Wordmark (hero name) | Mohave 700 | `clamp(3.6rem, 10.5vw, 9.5rem)` | 0.9 | −0.04em | UPPER |
| Display XL (statement, "Let's talk") | Mohave 700 | `clamp(3rem, 11vw, 10rem)` | 0.86 | −0.04em | UPPER |
| Case-study title | Mohave 700 | `clamp(3.4rem, 9vw, 8rem)` | 0.9 | −0.04em | UPPER |
| H2 section title | Mohave 700 | `clamp(2.6rem, 6.5vw, 5.5rem)` | 0.9 | −0.04em | UPPER |
| H1 hero headline | Mohave 700 | `clamp(2.2rem, 4.6vw, 4.1rem)` | 0.9 | −0.04em | UPPER |
| Capability row | Mohave 700 | `clamp(1.6rem, 3.6vw, 3rem)` | 0.9 | −0.04em | UPPER |
| H3 card / challenge title | Satoshi 600 | 1.25–1.6rem | 1.2 | −0.02em | Sentence |
| Body | Satoshi 400 | 1.0625rem (17px) | 1.5 | −0.01em | Sentence |
| Body large (intros) | Satoshi 400 | 1.25rem | 1.45 | −0.01em | Sentence |
| Small / meta | Satoshi 400–500 | 0.875rem | 1.4 | 0 | Sentence |
| Mono label | Geist Mono 400 | 0.78rem | 1.3 | +0.02em | UPPER |
| Script label | Rock Salt 400 | 1em of its context (min 16px) | 1.2 | 0 | As written |

### 2.3 Type rules

- **Rock Salt is for annotations only.** Short labels of up to about 4 words, always in `--accent`, always with the wiggle filter.
  - Examples: "Hi, I'm Imran", "Case study", "The challenges", "I usually reply within a few hours".
  - Never body text, buttons, or nav.
- Display text is always uppercase Mohave.
- Body copy max width is **62ch**; intros are **54ch**.
- Numbers in the bento and counters use Mohave.

---

## 3. Layout system

### 3.1 Frame and spacing

| Element | Spec |
|---|---|
| Frame | `width: min(1320px, 100% - 32px)`. 16px gutters on phones. Centred |
| Frame rails | `1px dashed var(--line-strong)`, left and right, the full page height |
| Section separator | `1px solid var(--line)` at the top of each section |
| Section padding | `clamp(56px, 8vw, 120px)` vertical · `clamp(20px, 4vw, 56px)` horizontal |
| Hatch band (between sections) | 64px tall, `repeating-linear-gradient(135deg, var(--line) 0 1px, transparent 1px 11px)` |
| `+` crosshair markers | 15×15px, 1px `--text-3` cross, on section corners where lines meet |
| Section label | Geist Mono `/ 01 / Selected work`, above the H2 |
| Grid | 12 columns inside the frame. Gaps 14–24px. Bento uses 4 columns → 2 columns (tablet) → 1 column (phone) |

### 3.2 Radius

| Token | Value | Use |
|---|---|---|
| `--radius` | 22px | Cards |
| `--radius-nested` | 16px | Inner bezel |
| (none) | 12px | Icon tiles |
| (none) | 999px | Pills, buttons, nav chip |
| (none) | 34px / 28px | Phone mockups (outer / inner) |

### 3.3 Breakpoints

| Name | Width |
|---|---|
| Phone | < 560px |
| Tablet | < 900px |
| Desktop | ≥ 900px |
| Wide frame cap | 1320px |

---

## 4. Texture

- **Grain overlay:**
  - fixed, full screen, `pointer-events: none`, above content
  - `mix-blend-mode: screen`
  - **opacity 10%** (Imran's pick)
  - a static 180px SVG fractal-noise tile, never animated (no CPU cost)
- **Admin:** grain on/off and strength 0–16%. Starts at 10%. If 10% looks too strong over real screenshots, lower it in the admin.
- The grain is hidden for print and when a visitor asks for more contrast (`prefers-contrast: more`).
- **Grunge texture:** a pre-rendered image behind 1–2 dark-band sections (statement, case-study Challenges), at about 6% opacity.

---

## 5. Components (all built in the Theme Lab)

| Component | Spec |
|---|---|
| **Morphing nav** | **Full bar** at the top: wordmark on the left, links centred, outline "Download resume" on the right. At 140px of scroll it becomes a **chip**: 236×52, radius 999, avatar + "Imran" + 3 bouncing dots. **On hover, tap, or keyboard focus** it expands downward (height about 268px): links, resume, live Lahore time. On Home, the hero wordmark Flips into the chip (GSAP, Step 7). The transition curve is `cubic-bezier(.62,0,.34,.99)` |
| **CTA bar** | Full width, 58px, `--accent` fill, `--accent-ink` text 600. Hover: a `--text` fill rises from the bottom, the label rolls up, the arrow moves ↗ |
| **Button: primary** | Pill, 48px, accent fill. Same fill-and-roll hover |
| **Button: ghost** | Pill, 48px, `--line-strong` outline. Hover fills with `--text` and the text turns `--bg` |
| **Text link** | 1px underline in the text colour; accent on hover |
| **Pill tag** | 28px, outline `--line-strong`, `--text-2`. Used for stack tags |
| **Ownership badges** | **Built:** `--accent-soft` fill with accent text · **Extended:** neutral outline · **In development:** dashed accent outline |
| **Bezel card** | Outer: `--radius`, 6px padding, `--line` border, `--surface-2` → `--surface` gradient. Inner: `--radius-nested`, `--surface`, `--line` border. Optional 44px icon tile with an accent icon |
| **Process card** | Alternately tilted −2.5° / +2°, 280px min height. Big Mohave number in `--text-4` (accent when active). Large faded outline icon at 7%. It straightens and turns accent when active or hovered. Hand-drawn connecting arrows (SVG) |
| **Bento tile** | `--surface`, `--radius`. Big Mohave number + caption + a small data graphic in `--accent` (timeline bar, provider nodes, 9-dot stepper, test grid, sparkline, world clocks) |
| **Capability row** | Number + Mohave title + "Seen in →". Inactive rows are `--text-4`. The row at screen centre turns `--text`, slides 10px right, and its number turns accent |
| **Case-study meta table** | Rows divided by drawn lines. Mono key on the left, value on the right; badges and pills inside |
| **Screenshot frame** | A bezel card holding a real screenshot. Phone mockup for Blarecast |
| **3D props** | Pre-rendered "inflated" objects in **accent blue** (payment card, play button, chat bubble, `{ }`). AVIF/WebM with a gentle float. Final renders in Step 6 |
| **Imbot** | Character drawn in the site style with a blue outline accent. Speech bubble: `--text` background, `--bg` text, radius 14/14/14/4 |

---

## 6. Motion tokens

Full values are in 03 §1.5.

| Token | Value |
|---|---|
| `--ease-reveal` | CustomEase `M0,160 C40,144 40,0 160,0`. Reveals: 1s, stagger 0.1, y 1.25rem → 0, scale 0.9 → 1, start `top 75%` |
| `--ease-ui` | `cubic-bezier(.62,0,.34,.99)`. Hovers and fills: 0.45s; nav: 0.55s |
| Image mask reveal | 1.3s |
| Divider draw | 1s |
| Parallax tiers | 12.5rem / 6.25rem / −6.25rem, scrubbed |
| Lenis | duration ~1.1 |
| Wiggle | seed changes every 120ms, displacement scale 1.4 |

**Reduced motion:** no Lenis, wiggle, travel, pinning, float, or parallax. Simple fades only.

---

## 7. Imagery rules

- **Screenshots are the hero imagery.**
  - Always inside bezel frames.
  - Never stretched.
  - Customer data blurred.
  - Exported as AVIF/WebP with explicit sizes.
- **Portrait** (About page only): graded to match. Cool shadows, neutral skin, a subtle blue rim light. Real face, not AI-altered.
- **Diagrams** (payment flow, embed pipeline, etc.):
  - 1px `--text-3` lines, `--surface` nodes
  - **accent only on the key path**
  - Satoshi labels
- **No stock photos, no fashion photography, no logo walls.**

---

## 8. Admin-editable theme tokens (summary for Step 5)

| Token | Editable how |
|---|---|
| `accent` | Hex, with contrast check; derived states are automatic |
| `bg` | Presets: Carbon / Pure black / Midnight, or a custom near-black |
| Surface, line, and text set | Auto-derived from `bg`; can be overridden in advanced mode |
| Grain | On/off + strength |
| Script labels | On/off (fallback: mono labels) |
| Wiggle | On/off |
| Radius scale | Sharp / default / soft |
| Fonts | Fixed in v1 (changing them would change the whole layout rhythm). May become selectable later |
