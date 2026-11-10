import { Frame } from '@/components/layout/frame'
import { Section, SectionDivider, SectionLabel } from '@/components/layout/section'
import { AgentIcon, AuthIcon, FormsIcon, MobileIcon, PaymentsIcon, RealtimeIcon } from '@/components/ui/icons'
import { ScriptLabel } from '@/components/ui/script-label'
import type { Project } from '@/schemas/project'
import type { CapabilitiesContent, CapabilityRow } from '@/schemas/section'
import { CapabilityProof } from './capability-proof'
import { CapabilityScroller, type CapabilityItem } from './capability-scroller'
import { StatementSpec } from './statement-spec'

const ICONS: Record<NonNullable<CapabilityRow['icon']>, React.ComponentType<{ className?: string }>> = {
  payments: PaymentsIcon,
  forms: FormsIcon,
  realtime: RealtimeIcon,
  auth: AuthIcon,
  mobile: MobileIcon,
  agents: AgentIcon,
}

// "What I build" (04 §2 + §4, merged): the statement, as an annotated spec table where each line carries its evidence,
// explains why the work is careful; then the six capabilities,
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
        {intro ? (
          <>
            {/* Sheet header: the section label, and the "why" as a handwritten margin note. */}
            <div className="mb-[clamp(28px,4vw,48px)] flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
              <SectionLabel index={content.index} className="mb-0">
                {content.label}
              </SectionLabel>
              {intro.annotation && (
                <div className="max-w-[40ch]">
                  {intro.scriptLabel && (
                    <ScriptLabel as="p" className="m-0 mb-2 text-[1.05rem]">
                      {intro.scriptLabel}
                    </ScriptLabel>
                  )}
                  <p className="m-0 text-[1rem] leading-[1.6] text-text-2">{intro.annotation}</p>
                </div>
              )}
            </div>
            <StatementSpec id="capabilities-title" lines={intro.lines} notes={intro.notes} accentLine={intro.accentLine} />
          </>
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
