import { describe, expect, it } from 'vitest'
import { contrastRatio, deriveAccent, parseHex } from '@/lib/theme/color'

const BG = '#0B0B0C'

describe('parseHex', () => {
  it('reads 6- and 3-digit hex, with or without #', () => {
    expect(parseHex('#3D7BFF')).toEqual({ r: 61, g: 123, b: 255 })
    expect(parseHex('fff')).toEqual({ r: 255, g: 255, b: 255 })
  })

  it('rejects anything that is not a hex colour', () => {
    expect(() => parseHex('blue')).toThrow()
    expect(() => parseHex('#12345')).toThrow()
  })
})

describe('contrastRatio (WCAG 2.x)', () => {
  it('is 21 for black on white and 1 for identical colours', () => {
    expect(contrastRatio('#000000', '#FFFFFF')).toBeCloseTo(21, 5)
    expect(contrastRatio('#3D7BFF', '#3D7BFF')).toBeCloseTo(1, 5)
  })

  it('matches the readability levels promised in 05-theme', () => {
    expect(contrastRatio('#EEEEEE', BG)).toBeGreaterThan(15) // main text
    expect(contrastRatio('#A4A4A4', BG)).toBeGreaterThan(7) // body copy
    expect(contrastRatio('#8A8A8A', BG)).toBeGreaterThanOrEqual(4.5) // meta, labels
    expect(contrastRatio('#6E6E6E', BG)).toBeGreaterThanOrEqual(3) // large / decorative only
    expect(contrastRatio('#3D7BFF', BG)).toBeCloseTo(5.1, 1) // accent
  })

  it('confirms white text on the blue accent fails AA (why ink is dark)', () => {
    expect(contrastRatio('#FFFFFF', '#3D7BFF')).toBeLessThan(4.5)
  })
})

describe('deriveAccent', () => {
  it('derives the default electric blue states', () => {
    expect(deriveAccent('#3D7BFF')).toEqual({
      accent: '#3D7BFF',
      hover: '#5A8FFF',
      pressed: '#3265D1',
      soft: 'rgb(61 123 255 / 0.16)',
      ink: '#0B0B0C',
    })
  })

  it('picks white ink for a dark accent where white reads better', () => {
    expect(deriveAccent('#1E3A8A').ink).toBe('#FFFFFF')
  })

  it('normalises input to upper-case 6-digit hex', () => {
    expect(deriveAccent('#3d7bff').accent).toBe('#3D7BFF')
  })
})
