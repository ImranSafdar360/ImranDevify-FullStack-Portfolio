import { act, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { WiggleFilter, WIGGLE_INTERVAL_MS } from '@/components/ui/wiggle-filter'
import { ScriptLabel } from '@/components/ui/script-label'

vi.mock('next/navigation', () => ({ usePathname: () => '/' }))

function mockReducedMotion(reduce: boolean) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation((query: string) => ({
      matches: reduce && query.includes('prefers-reduced-motion'),
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  )
}

// jsdom has no IntersectionObserver: report every observed label as visible or hidden.
function mockIntersection(visible: boolean) {
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      constructor(private callback: IntersectionObserverCallback) {}
      observe(target: Element) {
        this.callback([{ target, isIntersecting: visible } as IntersectionObserverEntry], this as unknown as IntersectionObserver)
      }
      disconnect() {}
    },
  )
}

function seed(container: HTMLElement) {
  return container.querySelector('feTurbulence')?.getAttribute('seed')
}

function renderWithLabel() {
  return render(
    <>
      <WiggleFilter />
      <ScriptLabel>Hi, I&apos;m Imran</ScriptLabel>
    </>,
  )
}

describe('WiggleFilter', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it('renders one hidden SVG filter with the id script labels reference', () => {
    mockReducedMotion(false)
    mockIntersection(true)
    const { container } = renderWithLabel()
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
    expect(container.querySelector('filter#wiggle')).not.toBeNull()
  })

  it('changes the noise seed while a label is on screen, so the handwriting "boils"', () => {
    mockReducedMotion(false)
    mockIntersection(true)
    const { container } = renderWithLabel()
    const first = seed(container)
    act(() => vi.advanceTimersByTime(WIGGLE_INTERVAL_MS * 3))
    expect(seed(container)).not.toBe(first)
  })

  it('stays still when no label is visible (no repaints, saves battery)', () => {
    mockReducedMotion(false)
    mockIntersection(false)
    const { container } = renderWithLabel()
    const first = seed(container)
    act(() => vi.advanceTimersByTime(WIGGLE_INTERVAL_MS * 10))
    expect(seed(container)).toBe(first)
  })

  it('stays still when the visitor prefers reduced motion', () => {
    mockReducedMotion(true)
    mockIntersection(true)
    const { container } = renderWithLabel()
    const first = seed(container)
    act(() => vi.advanceTimersByTime(WIGGLE_INTERVAL_MS * 10))
    expect(seed(container)).toBe(first)
  })
})
