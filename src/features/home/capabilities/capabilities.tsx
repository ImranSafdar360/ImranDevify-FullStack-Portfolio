import { Frame } from '@/components/layout/frame'
import { Section, SectionDivider, SectionLabel } from '@/components/layout/section'
import { AgentIcon, AuthIcon, FormsIcon, MobileIcon, PaymentsIcon, RealtimeIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import type { Project } from '@/schemas/project'
import type { CapabilitiesContent, CapabilityRow } from '@/schemas/section'
import { CapabilityProof } from './capability-proof'
import { CapabilityScroller, type CapabilityItem } from './capability-scroller'

const ICONS: Record<NonNullable<CapabilityRow['icon']>, React.ComponentType<{ className?: string }>> = {
  payments: PaymentsIcon,
  forms: FormsIcon,
  realtime: RealtimeIcon,
  auth: AuthIcon,
  mobile: MobileIcon,
  agents: AgentIcon,
}

// "What I build" (04 §2 + §4, merged): the statement explains why the work is careful, then the six capabilities,
// one per screen: the list scrolls while a sticky panel shows what backs the current one (verified facts only).
// Unknown "Seen in" slugs are dropped, so no link can point at a project that doesn't exist.
export function Capabilities({ content, projects }: { content: CapabilitiesContent; projects: Project[] }) {
  const titles = new Map(projects.map((p) => [p.slug, p.title]))
  const { intro } = content
  const count = String(content.rows.length).padStart(2, '0')

  const items: CapabilityItem[] = content.rows.map((row) => {
    const Icon = row.icon ? ICONS[row.icon] : null
    return {
      title: row.title,
      line: row.line,
      inDevelopment: row.inDevelopment,
      icon: Icon ? <Icon className="size-[22px]" /> : null,
      links: row.seenIn.flatMap((slug) => {
        const label = titles.get(slug)
        return label ? [{ href: `/work/${slug}`, label }] : []
      }),
      proof: row.proof ? <CapabilityProof proof={row.proof} /> : null,
    }
  })

  return (
    <Frame>
      <Section id="capabilities" aria-labelledby="capabilities-title">
        <SectionLabel index={content.index}>{content.label}</SectionLabel>

        {intro ? (
          <div className="grid gap-x-12 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,21rem)] lg:items-end">
            <h2
              id="capabilities-title"
              data-anim="outline"
              className="m-0 font-display text-[clamp(2.8rem,7.4vw,6.6rem)] font-bold uppercase leading-[0.88] tracking-[-0.04em]"
            >
              {intro.lines.map((line, i) => (
                <span key={line} data-line className={cn('relative block w-fit', i === intro.accentLine ? 'text-accent' : 'text-text')}>
                  <span data-fill className="block">
                    {line}
                  </span>
                  <span data-outline aria-hidden="true" className="outline-copy">
                    {line}
                  </span>
                </span>
              ))}
            </h2>
            {intro.annotation && (
              <div className="flex gap-4 lg:pb-3">
                <span aria-hidden="true" className="mt-[0.75em] h-px w-10 shrink-0 bg-accent" />
                <p className="m-0 text-[1.05rem] leading-[1.6] text-text-2">{intro.annotation}</p>
              </div>
            )}
          </div>
        ) : (
          <h2 id="capabilities-title" className="m-0 font-display text-[clamp(2.6rem,6.5vw,5.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.04em]">
            {content.title}
          </h2>
        )}

        {intro && (
          <p className="mt-[clamp(56px,8vw,104px)] mb-6 flex items-baseline gap-3 font-display text-[clamp(1.5rem,2.4vw,2.1rem)] font-bold uppercase leading-none tracking-[-0.02em] text-text">
            {content.title}
            <span className="font-mono text-[0.8rem] font-normal tracking-normal text-text-3">({count})</span>
          </p>
        )}

        <CapabilityScroller items={items} />
      </Section>
      <SectionDivider />
    </Frame>
  )
}
