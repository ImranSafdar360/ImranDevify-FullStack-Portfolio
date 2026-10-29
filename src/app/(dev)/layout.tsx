import { SiteShell } from '@/components/layout/site-shell'

export default function DevLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}</SiteShell>
}
