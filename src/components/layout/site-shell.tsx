import { getSettings } from '@/lib/content/settings'
import { Footer } from './footer'
import { Nav } from './nav'

// Public chrome shared by the site and the styleguide. The admin (T28) gets its own shell.
export async function SiteShell({ children }: { children: React.ReactNode }) {
  const settings = await getSettings()
  return (
    <>
      <Nav
        resumeHref={settings.links.resume}
        emailHiring={settings.contact.emailHiring}
        timeZone={settings.contact.timeZone}
        city={settings.contact.location.split(',')[0]}
      />
      {children}
      <Footer settings={settings} />
    </>
  )
}
