import { describe, expect, it } from 'vitest'
import { caseFrame, caseProgressFor, caseSpan } from '@/features/home/cases/case-timeline'

describe('case-study scroll timeline', () => {
  it('pins for a rest, one wipe per following project, and a final rest', () => {
    expect(caseSpan(3)).toBeCloseTo(0.5 + 0.9 * 2 + 0.5)
    expect(caseSpan(1)).toBeCloseTo(1)
  })

  it('starts on the first project with nothing wiped', () => {
    const frame = caseFrame(0, 3)
    expect(frame.active).toBe(0)
    expect(frame.wipes).toEqual([0, 0])
    expect(frame.fills[0]).toBe(0)
  })

  it('wipes project 1 away halfway through the first transition, and switches the details at that point', () => {
    const halfway = (0.5 + 0.45) / caseSpan(3)
    const before = caseFrame(halfway - 0.01, 3)
    const after = caseFrame(halfway + 0.01, 3)
    expect(before.wipes[0]).toBeLessThan(0.5)
    expect(before.active).toBe(0)
    expect(after.wipes[0]).toBeGreaterThan(0.5)
    expect(after.active).toBe(1)
  })

  it('ends at rest on the last project, with every wipe and progress line complete', () => {
    const frame = caseFrame(1, 3)
    expect(frame.active).toBe(2)
    expect(frame.wipes).toEqual([1, 1])
    expect(frame.fills).toEqual([1, 1, 1])
  })

  it('never moves backwards as the visitor scrolls down', () => {
    let previous = caseFrame(0, 3)
    for (let p = 0.02; p <= 1; p += 0.02) {
      const frame = caseFrame(p, 3)
      expect(frame.active).toBeGreaterThanOrEqual(previous.active)
      frame.wipes.forEach((w, k) => expect(w).toBeGreaterThanOrEqual(previous.wipes[k]))
      previous = frame
    }
  })

  it('jumps to the point where a project is fully revealed', () => {
    for (const index of [0, 1, 2]) {
      const frame = caseFrame(caseProgressFor(index, 3), 3)
      expect(frame.active).toBe(index)
      frame.wipes.forEach((w, k) => expect(w).toBe(k < index ? 1 : 0))
    }
  })

  it('clamps out-of-range progress', () => {
    expect(caseFrame(-1, 3)).toEqual(caseFrame(0, 3))
    expect(caseFrame(2, 3)).toEqual(caseFrame(1, 3))
  })
})
