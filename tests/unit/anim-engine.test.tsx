import { render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { AnimEngine } from '@/lib/motion/anim-engine'

vi.mock('next/navigation', () => ({ usePathname: () => '/' }))

function mockReducedMotion(reduce: boolean) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation((query: string) => ({
      matches: reduce && query.includes('prefers-reduced-motion'),
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
    })),
  )
}

// jsdom has no layout, so fake every element's position before AnimEngine's layout effect reads it.
function renderPage({ top, anim = 'slide' }: { top: number; anim?: string }) {
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
    top,
    bottom: top + 100,
    left: 0,
    right: 100,
    width: 100,
    height: 100,
    x: 0,
    y: top,
    toJSON: () => ({}),
  })
  const utils = render(
    <>
      <p data-anim={anim} data-testid="target">
        Live products. Real users.
      </p>
      <AnimEngine />
    </>,
  )
  return utils.getByTestId('target')
}

describe('AnimEngine', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('leaves content untouched when the visitor prefers reduced motion', () => {
    mockReducedMotion(true)
    const el = renderPage({ top: 2000 })
    expect(el.style.opacity).toBe('')
    expect(el.style.transform).toBe('')
  })

  it('never hides content that is already on screen at load (protects LCP)', () => {
    mockReducedMotion(false)
    const el = renderPage({ top: 100 })
    expect(el.style.opacity).toBe('')
  })

  it('prepares below-the-fold content for its scroll reveal', () => {
    mockReducedMotion(false)
    const el = renderPage({ top: 2000 })
    expect(el.style.opacity).toBe('0')
  })
})

// The statement band's "blueprint becomes real" reveal: outline copy first, then the real text wipes over it.
function renderOutline(top: number) {
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
    top,
    bottom: top + 100,
    left: 0,
    right: 100,
    width: 100,
    height: 100,
    x: 0,
    y: top,
    toJSON: () => ({}),
  })
  const utils = render(
    <>
      <h2 data-anim="outline">
        <span data-line>
          <span data-fill data-testid="fill">
            Live products.
          </span>
          <span data-outline aria-hidden="true" data-testid="stroke">
            Live products.
          </span>
        </span>
      </h2>
      <AnimEngine />
    </>,
  )
  return { fill: utils.getByTestId('fill'), stroke: utils.getByTestId('stroke') }
}

describe('AnimEngine outline reveal', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('hides the real text and shows the outline before a below-the-fold reveal', () => {
    mockReducedMotion(false)
    const { fill, stroke } = renderOutline(2000)
    expect(fill.style.clipPath).toBe('inset(0% 100% 0% 0%)')
    expect(stroke.style.opacity).toBe('1')
  })

  it('leaves the real text fully visible when it is already on screen at load', () => {
    mockReducedMotion(false)
    expect(renderOutline(100).fill.style.clipPath).toBe('')
  })

  it('leaves the real text fully visible, with no outline, when motion is reduced', () => {
    mockReducedMotion(true)
    const { fill, stroke } = renderOutline(2000)
    expect(fill.style.clipPath).toBe('')
    expect(stroke.style.opacity).toBe('')
  })
})
