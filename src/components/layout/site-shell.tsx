import { Footer } from './footer'
import { Nav } from './nav'

// Public chrome shared by the site and the styleguide. The admin (T28) gets its own shell.
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  )
}
