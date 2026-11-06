import { Frame } from '@/components/layout/frame'
import { LiveClock } from '@/components/layout/live-clock'
import { Section, SectionDivider } from '@/components/layout/section'
import { Divider } from '@/components/ui/divider'
import { ArrowIcon, ResumeIcon } from '@/components/ui/icons'
import { ScriptLabel } from '@/components/ui/script-label'
import { SurfaceButton } from '@/components/ui/surface-button'
import type { HeroContent } from '@/schemas/section'
import type { Settings } from '@/schemas/settings'
import { HeroWordmark } from './hero-wordmark'

// Home hero as a type-specimen sheet (inspired by React Bits' TechText): a status row, the name drawn across the
// whole frame with its typographic guide lines, then a three-part footer: what I do, the proof, and the next step.
// The canvas wordmark is decorative; the real <h1> holds the name, and the copy below paints at once (LCP).
export function Hero({ content, settings }: { content: HeroContent; settings: Settings }) {
  const { availability, contact } = settings
  const city = contact.location.split(',')[0]

  return (
    <Frame>
      <Section aria-labelledby="hero-title" className="flex min-h-[86svh] flex-col justify-center pb-[clamp(96px,14vh,170px)]">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <ScriptLabel as="p" className="text-[1.35rem]">
            {content.scriptLabel}
          </ScriptLabel>

          {availability.open && (
            <p className="flex items-center gap-x-2.5 font-mono text-[0.78rem] uppercase tracking-[0.02em] text-text-3">
              <span className="flex items-center gap-2 text-text-2">
                <span aria-hidden="true" className="size-2 rounded-full bg-accent animate-live-pulse motion-reduce:animate-none" />
                {availability.label}
              </span>
              <span aria-hidden="true" className="text-text-4">·</span>
              <span>
                {city} <LiveClock timeZone={contact.timeZone} />
                <span className="sr-only">local time</span>
              </span>
            </p>
          )}
        </div>

        <h1 id="hero-title" className="sr-only">
          {content.wordmark}
        </h1>
        <HeroWordmark text={content.wordmark} />

        <Divider />

        <div className="mt-8 grid gap-x-10 gap-y-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_auto] lg:items-start">
          <p className="m-0 max-w-[22ch] font-display text-[clamp(1.3rem,2vw,1.75rem)] font-bold uppercase leading-[1.02] tracking-[-0.02em] text-text-2 text-balance">
            {content.headline}
          </p>

          <p className="m-0 max-w-[52ch] text-[1rem] text-text-3">{content.intro}</p>

          <div className="flex flex-wrap items-center gap-3 md:col-span-2 lg:col-span-1 lg:flex-col lg:items-stretch">
            <SurfaceButton href={content.cta.href} variant="primary" icon={<ArrowIcon className="size-[1.05em]" />}>
              {content.cta.label}
            </SurfaceButton>
            {content.secondary && (
              <SurfaceButton
                href={content.secondary.href === '/resume.pdf' ? settings.links.resume : content.secondary.href}
                variant="secondary"
                icon={<ResumeIcon className="size-[1.05em]" />}
                iconPosition="left"
              >
                {content.secondary.label}
              </SurfaceButton>
            )}
          </div>
        </div>
      </Section>
      <SectionDivider />
    </Frame>
  )
}
