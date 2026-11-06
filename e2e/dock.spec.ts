import { expect, test, type Page } from '@playwright/test'

const dock = (page: Page) => page.getByRole('navigation', { name: 'Main' })

test.describe('dock', () => {
  test('sits at the bottom with logo, icon links and a resume CTA', async ({ page }) => {
    await page.goto('/')
    await expect(dock(page)).toBeVisible()

    // Icon-only links expose accessible names (aria-label), so they are reachable and announced.
    for (const name of ['Home', 'Work', 'About', 'Contact']) {
      await expect(dock(page).getByRole('link', { name, exact: true })).toBeVisible()
    }
    await expect(dock(page).getByRole('link', { name: 'Résumé' })).toHaveAttribute('href', '/resume.pdf')

    // It is anchored to the lower half of the viewport.
    const box = await dock(page).boundingBox()
    const viewport = page.viewportSize()!
    expect(box!.y).toBeGreaterThan(viewport.height / 2)
  })

  test('marks the current section with aria-current', async ({ page }) => {
    await page.goto('/work')
    await expect(dock(page).getByRole('link', { name: 'Work', exact: true })).toHaveAttribute('aria-current', 'page')
    await expect(dock(page).getByRole('link', { name: 'About', exact: true })).not.toHaveAttribute('aria-current', 'page')
  })

  test('a link navigates to its page', async ({ page }) => {
    await page.goto('/')
    await dock(page).getByRole('link', { name: 'About', exact: true }).click()
    // Generous timeout: a dev server compiles the route on first navigation (instant in a production build).
    await expect(page).toHaveURL(/\/about$/, { timeout: 15_000 })
  })

  test('reveals the label tooltip on hover', async ({ page, isMobile }) => {
    test.skip(isMobile, 'hover is a pointer-only affordance')
    await page.goto('/')
    const work = dock(page).getByRole('link', { name: 'Work', exact: true })
    const tooltip = work.locator('[data-tooltip]')
    await expect(tooltip).toHaveCSS('opacity', '0')
    await work.hover()
    await expect(tooltip).toHaveCSS('opacity', '1')
  })
})
