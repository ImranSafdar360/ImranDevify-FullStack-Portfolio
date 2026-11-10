// Scroll timeline for the featured case studies (desktop sticky stage). Pure, so it is unit-tested.
//
// While the stage is pinned, the visitor scrolls through: a rest on the first project, then one wipe per following
// project, then a rest on the last one (so it is seen fully at rest before the section scrolls away). Weights are
// in viewport heights: the track is that many viewports taller than the stage.
export const CASE_TIMELINE = { rest: 0.5, wipe: 0.9, tail: 0.5 } as const

// Clamp to 0..1 and snap float noise at the ends (0.9999999999 would leave a hairline of the previous image).
const EPSILON = 1e-6
const clamp01 = (n: number) => (n <= EPSILON ? 0 : n >= 1 - EPSILON ? 1 : n)

/** Pinned scroll length in viewport heights, for `count` projects. */
export function caseSpan(count: number): number {
  if (count <= 1) return CASE_TIMELINE.rest + CASE_TIMELINE.tail
  return CASE_TIMELINE.rest + CASE_TIMELINE.wipe * (count - 1) + CASE_TIMELINE.tail
}

export type CaseFrame = {
  /** The project whose details are shown: switches once its image is more than half revealed. */
  active: number
  /** Per transition k (project k → k+1): 0 = not started, 1 = project k's image fully wiped away. */
  wipes: number[]
  /** Per project: how full its progress line is (each project owns a share of the track). */
  fills: number[]
  /** Whole-stage progress 0 → 1, for the slow image drift. */
  progress: number
}

/** Where everything stands at `progress` (0 → 1 across the pinned scroll). */
export function caseFrame(progress: number, count: number): CaseFrame {
  const p = clamp01(progress)
  const total = caseSpan(count)
  const s = p * total
  const { rest, wipe } = CASE_TIMELINE

  const wipes = Array.from({ length: Math.max(0, count - 1) }, (_, k) => clamp01((s - rest - k * wipe) / wipe))
  const active = Math.min(
    count - 1,
    wipes.filter((w) => w >= 0.5).length,
  )

  // Project i owns the track from halfway through the wipe that brings it in to halfway through the one that
  // takes it away (the first starts at 0, the last ends at the end).
  const fills = Array.from({ length: count }, (_, i) => {
    const start = i === 0 ? 0 : rest + (i - 0.5) * wipe
    const end = i === count - 1 ? total : rest + (i + 0.5) * wipe
    return clamp01((s - start) / (end - start))
  })

  return { active, wipes, fills, progress: p }
}

/** Progress (0 → 1) at which project `index` is fully revealed and at rest: the target for "jump to project". */
export function caseProgressFor(index: number, count: number): number {
  if (count <= 1 || index <= 0) return 0
  const s = CASE_TIMELINE.rest + Math.min(index, count - 1) * CASE_TIMELINE.wipe
  return clamp01(s / caseSpan(count))
}
