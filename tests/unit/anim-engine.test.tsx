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
function renderPage({ top }: { top: number }) {
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
      <p data-anim="slide" data-testid="target">
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
