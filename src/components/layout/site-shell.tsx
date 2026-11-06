import { getSettings } from '@/lib/content/settings'
import { Dock } from './dock'
import { Footer } from './footer'

// Public chrome shared by the site and the styleguide. The admin (T28) gets its own shell.
export async function SiteShell({ children }: { children: React.ReactNode }) {
  const settings = await getSettings()
  return (
    <>
      {children}
      <Dock resumeHref={settings.links.resume} />
      <Footer settings={settings} />
    </>
  )
}
