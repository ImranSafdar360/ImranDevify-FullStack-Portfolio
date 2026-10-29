import { describe, expect, it } from 'vitest'
import { isAppRoute } from '@/components/ui/button'

describe('isAppRoute', () => {
  it.each(['/', '/work', '/work/clientmanager', '/about#story', '/contact?intent=hiring'])('treats %s as an app route', (href) => {
    expect(isAppRoute(href)).toBe(true)
  })

  it.each(['/resume.pdf', '/resume.pdf?v=2', 'https://github.com/ImranSafdar360', '//cdn.example.com/x', 'mailto:a@b.co', '#cases'])(
    'renders %s as a plain link',
    (href) => {
      expect(isAppRoute(href)).toBe(false)
    },
  )
})
