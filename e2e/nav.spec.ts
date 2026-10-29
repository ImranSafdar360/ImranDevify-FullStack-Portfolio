import { expect, test } from '@playwright/test'

const nav = (page: import('@playwright/test').Page) => page.getByRole('navigation', { name: 'Main' })
const chip = (page: import('@playwright/test').Page) => nav(page).getByRole('button', { name: /Imran/ })

test.describe('morphing nav: desktop', () => {
  test.skip(({ isMobile }) => isMobile, 'desktop behaviour')

  test('shows the full bar at the top, then a chip after scrolling', async ({ page }) => {
    await page.goto('/styleguide')
    await expect(nav(page)).toHaveAttribute('data-state', 'full')
    await expect(nav(page).getByRole('link', { name: 'Work' }).first()).toBeVisible()

    await page.mouse.wheel(0, 800)
    await expect(nav(page)).toHaveAttribute('data-state', 'chip')
    await expect(chip(page)).toBeVisible()
  })

  test('chip expands on hover and a menu link works', async ({ page }) => {
    await page.goto('/styleguide')
    await page.mouse.wheel(0, 800)
    await expect(nav(page)).toHaveAttribute('data-state', 'chip')

    await chip(page).hover()
    await expect(nav(page)).toHaveAttribute('data-state', 'open')
    await expect(chip(page)).toHaveAttribute('aria-expanded', 'true')
    await expect(page.locator('#nav-menu').getByRole('link', { name: 'Email me' })).toBeVisible()
  })

  test('clicking a hover-opened chip keeps the menu open', async ({ page }) => {
    await page.goto('/styleguide')
    await page.mouse.wheel(0, 800)
    await expect(nav(page)).toHaveAttribute('data-state', 'chip')

    await chip(page).hover()
    await expect(nav(page)).toHaveAttribute('data-state', 'open')
    await chip(page).click()
    await expect(nav(page)).toHaveAttribute('data-state', 'open')
    await expect(chip(page)).toHaveAttribute('aria-expanded', 'true')
  })

  test('a link clicked mid-scroll opens the next page at the top', async ({ page }) => {
    await page.goto('/styleguide')
    await expect(page.getByText('Slide-in reveal')).toHaveCSS('opacity', '0') // motion layer (and Lenis) loaded

    await page.mouse.wheel(0, 2500)
    await chip(page).click()
    await page.locator('#nav-menu').getByRole('link', { name: 'Work' }).click()

    await expect(page).toHaveURL(/\/work$/)
    await page.waitForTimeout(1500) // longer than the Lenis easing window
    expect(await page.evaluate(() => window.scrollY)).toBe(0)
  })

  test('keyboard: Enter opens, Escape closes and returns focus to the chip', async ({ page }) => {
    await page.goto('/styleguide')
    await page.mouse.wheel(0, 800)
    await expect(nav(page)).toHaveAttribute('data-state', 'chip')
    await page.mouse.move(5, 500) // keep the pointer away from the nav

    await chip(page).focus()
    await page.keyboard.press('Enter')
    await expect(chip(page)).toHaveAttribute('aria-expanded', 'true')

    await page.keyboard.press('Tab')
    await expect(page.locator('#nav-menu a').first()).toBeFocused()

    await page.keyboard.press('Escape')
    await expect(chip(page)).toHaveAttribute('aria-expanded', 'false')
    await expect(chip(page)).toBeFocused()
  })
})

test.describe('morphing nav: mobile before hydration', () => {
  test.skip(({ isMobile }) => !isMobile, 'mobile behaviour')
  test.use({ javaScriptEnabled: false })

  test('server HTML already shows the chip, not the full bar', async ({ page }) => {
    await page.goto('/styleguide')
    await expect(chip(page)).toHaveCSS('opacity', '1')
    // The full bar (first child of the nav) must be invisible on a phone before any JS runs.
    await expect(nav(page).locator(':scope > div').first()).toHaveCSS('opacity', '0')
    const width = await nav(page).evaluate((el) => el.getBoundingClientRect().width)
    expect(width).toBeLessThan(260)
  })
})

test.describe('morphing nav: mobile', () => {
  test.skip(({ isMobile }) => !isMobile, 'mobile behaviour')

  test('is a chip from the start and opens on tap', async ({ page }) => {
    await page.goto('/styleguide')
    await expect(nav(page)).toHaveAttribute('data-state', 'chip')
    await chip(page).tap()
    await expect(nav(page)).toHaveAttribute('data-state', 'open')
    await expect(page.locator('#nav-menu').getByRole('link', { name: 'About' })).toBeVisible()
  })
})
