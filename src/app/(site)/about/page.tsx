import { ComingSoon, comingSoonMetadata } from '@/components/layout/coming-soon'

export const metadata = comingSoonMetadata('About')

// Placeholder until T23 builds this page.
export default function AboutPage() {
  return <ComingSoon title="About" task="T23" />
}
