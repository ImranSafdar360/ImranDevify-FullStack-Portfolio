import { Frame } from '@/components/layout/frame'
import { SectionDivider } from '@/components/layout/section'
import { LogoLoop, type LogoItem } from '@/components/ui/logo-loop'
import type { IntegrationsContent } from '@/schemas/section'
import { IntegrationIcon } from './integration-icon'

// The strip under the hero (layout from the reference's framed logo rail): a fixed caption cell, then a slow
// marquee of services wired into live products (React Bits' LogoLoop). Each cell is mark + name, split by hairlines,
// muted until hovered. The hatch dividers above and below carry the corner brackets, so the strip itself has none
// (stacked brackets would read as crosshairs).
export function Integrations({ content }: { content: IntegrationsContent }) {
  const logos: LogoItem[] = content.items.map((item) => ({
    title: item.name,
    node: (
      <span className="flex h-[clamp(64px,7vw,88px)] items-center gap-2.5 border-r border-line px-[clamp(24px,3vw,40px)] text-[0.98rem] font-semibold tracking-[-0.01em] whitespace-nowrap text-text-3 transition-colors duration-300 hover:text-text">
        <IntegrationIcon icon={item.icon} />
        {item.name}
      </span>
    ),
  }))

  return (
    <Frame>
      <section aria-labelledby="integrations-title" className="grid border-y border-line md:grid-cols-[auto_minmax(0,1fr)]">
        <h2
          id="integrations-title"
          className="m-0 flex items-center gap-2 border-b border-line px-[clamp(20px,4vw,56px)] py-4 font-mono text-[0.75rem] font-normal uppercase tracking-[0.02em] text-text-2 md:border-r md:border-b-0 md:py-0"
        >
          <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
          {content.label}
        </h2>

        <LogoLoop
          logos={logos}
          speed={36}
          gap={0}
          logoHeight={16}
          pauseOnHover
          fadeOut
          fadeOutWidth={0.08}
          intro={false}
          draggable={false}
          ariaLabel={content.label}
        />
      </section>
      <SectionDivider />
    </Frame>
  )
}
