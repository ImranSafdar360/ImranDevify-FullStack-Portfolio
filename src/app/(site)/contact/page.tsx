import { ComingSoon, comingSoonMetadata } from '@/components/layout/coming-soon'

export const metadata = comingSoonMetadata('Contact')

// Placeholder until T18a builds this page.
export default function ContactPage() {
  return <ComingSoon title="Contact" task="T18a" />
}
