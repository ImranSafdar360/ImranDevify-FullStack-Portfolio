import { ComingSoon, comingSoonMetadata } from '@/components/layout/coming-soon'

export const metadata = comingSoonMetadata('Work')

// Placeholder until T19 builds this page.
export default function WorkPage() {
  return <ComingSoon title="Work" task="T19" />
}
