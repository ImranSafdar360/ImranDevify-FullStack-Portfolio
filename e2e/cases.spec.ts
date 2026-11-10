import { expect, test, type Page } from '@playwright/test'

const PROJECTS = ['ClientManager', 'Blarecast', 'Your Business Date']
const SLUGS = ['/work/clientmanager', '/work/blarecast', '/work/your-business-date']
const section = (page: Page) => page.locator('#cases')
const tabs = (page: Page) => section(page).getByRole('tab')

// Scroll so the sticky stage sits at `fraction` (0 → 1) of its pinned track.
async function scrollStage(page: Page, fraction: number) {
  await page.evaluate((f) => {
    const track = document.querySelector<HTMLElement>('#cases [style*="svh"]')!
    const stage = track.firstElementChild as HTMLElement
    const top = parseFloat(getComputedStyle(stage).top)
    const docTop = track.getBoundingClientRect().top + window.scrollY
    window.scrollTo(0, docTop - top + f * (track.offsetHeight - stage.offsetHeight))
  }, fraction)
}

test.describe('featured case studies', () => {
  test('the hero "See the case studies" button lands on this section', async ({ page }) => {
    await page.goto('/')
    await expect(section(page).getByRole('heading', { level: 2, name: /Case studies \(03\)/ })).toBeAttached()
    await page.getByRole('main').getByRole('link', { name: /See the case studies/ }).click()
    await expect(page).toHaveURL(/#cases$/)
    await expect(section(page)).toBeInViewport()
  })

  test('labels stand-in photos as placeholders', async ({ page }) => {
    await page.goto('/')
    await section(page).scrollIntoViewIfNeeded()
    // Desktop shows it on the stage, phones in the stack; only one layout is displayed, so match the visible one.
    await expect(section(page).getByText('Placeholder image · screenshot coming').filter({ visible: true }).first()).toBeVisible()
  })
})

test.describe('featured case studies: sticky stage (desktop)', () => {
  test.skip(({ isMobile }) => isMobile, 'the sticky stage is a desktop layout')

  test('scrolling advances the projects 1 → 3 while the stage stays pinned', async ({ page }) => {
    await page.goto('/')
    await expect(tabs(page)).toHaveText(PROJECTS)
    const stage = section(page).locator('[style*="svh"] > div').first()

    await scrollStage(page, 0.05)
    await expect(tabs(page).nth(0)).toHaveAttribute('aria-selected', 'true')
    const pinned = (await stage.boundingBox())!.y

    for (const [fraction, index] of [
      [0.5, 1],
      [1, 2],
    ] as const) {
      await scrollStage(page, fraction)
      await expect(tabs(page).nth(index)).toHaveAttribute('aria-selected', 'true')
      expect(Math.abs((await stage.boundingBox())!.y - pinned)).toBeLessThan(2)
    }
  })

  test('only the shown project is interactive, and it links to its case study', async ({ page }) => {
    await page.goto('/')
    await scrollStage(page, 0.05)
    const panels = section(page).getByRole('tabpanel')
    await expect(panels).toHaveCount(1) // inactive panels are aria-hidden + inert
    await expect(panels.getByRole('link', { name: /Read case study/ })).toHaveAttribute('href', SLUGS[0])
  })

  test('every project is reachable by keyboard: arrow keys move through the list and jump to it', async ({ page }) => {
    await page.goto('/')
    await scrollStage(page, 0.05)
    await tabs(page).nth(0).focus()
    await page.keyboard.press('ArrowDown')
    await expect(tabs(page).nth(1)).toBeFocused()
    await expect(tabs(page).nth(1)).toHaveAttribute('aria-selected', 'true', { timeout: 8_000 })
    await page.keyboard.press('End')
    await expect(tabs(page).nth(2)).toHaveAttribute('aria-selected', 'true', { timeout: 8_000 })
    await expect(section(page).getByRole('tabpanel').getByRole('link', { name: /Read case study/ })).toHaveAttribute('href', SLUGS[2])
  })

  test('clicking a project in the list jumps to it', async ({ page }) => {
    await page.goto('/')
    await scrollStage(page, 0.05)
    await tabs(page).nth(2).click()
    await expect(tabs(page).nth(2)).toHaveAttribute('aria-selected', 'true', { timeout: 8_000 })
  })
})

test.describe('featured case studies on phones', () => {
  test.skip(({ isMobile }) => !isMobile, 'phone layout')

  test('stacks the three projects, each with its way into the case study', async ({ page }) => {
    await page.goto('/')
    const stack = section(page).locator('ol')
    await expect(stack.getByRole('heading', { level: 3 })).toHaveText(PROJECTS.map((p) => new RegExp(p, 'i')))
    for (const [i, href] of SLUGS.entries()) {
      await expect(stack.getByRole('link', { name: /Read case study/ }).nth(i)).toHaveAttribute('href', href)
    }
    await expect(tabs(page)).toHaveCount(0) // no sticky stage
  })
})

test.describe('featured case studies with reduced motion', () => {
  test.use({ reducedMotion: 'reduce' })

  test('uses the stacked layout instead of the sticky stage', async ({ page }) => {
    await page.goto('/')
    await expect(section(page).locator('ol').getByRole('heading', { level: 3 })).toHaveCount(3)
    await expect(tabs(page)).toHaveCount(0)
  })
})
