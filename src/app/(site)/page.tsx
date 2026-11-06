import type { Metadata } from 'next'
import { HomeSections } from '@/features/home/sections'
import { getPublishedProjects } from '@/lib/content/projects'
import { getPageSections } from '@/lib/content/sections'
import { getSettings } from '@/lib/content/settings'

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
}

export default async function HomePage() {
  const [sections, settings, projects] = await Promise.all([getPageSections('home'), getSettings(), getPublishedProjects()])

  return (
    <main id="main">
      <HomeSections sections={sections} settings={settings} projects={projects} />
    </main>
  )
}
