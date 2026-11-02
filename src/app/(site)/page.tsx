import type { Metadata } from 'next'
import { HomeSections } from '@/features/home/sections'
import { getPageSections } from '@/lib/content/sections'
import { getSettings } from '@/lib/content/settings'

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
}

export default async function HomePage() {
  const [sections, settings] = await Promise.all([getPageSections('home'), getSettings()])

  return (
    <main id="main">
      <HomeSections sections={sections} settings={settings} />
    </main>
  )
}
