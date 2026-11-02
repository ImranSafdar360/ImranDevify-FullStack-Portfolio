import { Frame } from '@/components/layout/frame'
import { LiveClock } from '@/components/layout/live-clock'
import { Section } from '@/components/layout/section'
import { CtaBar } from '@/components/ui/button'
import { ScriptLabel } from '@/components/ui/script-label'
import type { HeroContent } from '@/schemas/section'
import type { Settings } from '@/schemas/settings'
import { Showcase } from './showcase'

// Home hero (04 §1). The wordmark is the scroll handoff to the nav chip (data-anim="nav-flip"), and nothing in
// the first screen starts hidden, so the headline paints immediately (LCP).
export function Hero({ content, settings }: { content: HeroContent; settings: Settings }) {
  const { availability, contact } = settings
  const city = contact.location.split(',')[0]

  return (
    <Frame>
      <Section hatchAfter aria-labelledby="hero-title" className="pt-30">
        <div className="grid gap-[clamp(24px,4vw,56px)] lg:grid-cols-[1.05fr_1fr]">
          <div className="min-w-0">
            <p
              data-anim="nav-flip"
              className="m-0 w-fit origin-top-left font-display text-[clamp(3.6rem,10.5vw,9.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.04em] will-change-transform"
            >
              {content.wordmark.split(' ').map((word) => (
                <span key={word} className="block">
                  {word}
                </span>
              ))}
            </p>

            {/* Theme Lab uses clamp(40px,8vw,110px) here; tightened so the CTA stays above the fold at 1440×900. */}
            <div className="mt-4.5 mb-[clamp(28px,4vw,64px)] flex flex-wrap gap-x-8 gap-y-3 text-[0.92rem]">
              {availability.open && (
                <p className="m-0">
                  <b className="flex items-center gap-2 font-semibold">
                    <span aria-hidden="true" className="size-2 rounded-full bg-accent animate-live-pulse motion-reduce:animate-none" />
                    {availability.label}
                  </b>
                  {availability.note && <span className="block text-[0.85rem] text-text-3">{availability.note}</span>}
                </p>
              )}
              <p className="m-0">
                <b className="block font-semibold">
                  <LiveClock timeZone={contact.timeZone} />
                </b>
                <span className="block text-[0.85rem] text-text-3">{contact.location}</span>
                <span className="sr-only">Local time in {city}</span>
              </p>
            </div>

            <ScriptLabel as="p" className="m-0">
              {content.scriptLabel}
            </ScriptLabel>
            <h1
              id="hero-title"
              className="mt-1.5 mb-4.5 font-display text-[clamp(2.2rem,4.6vw,4.1rem)] font-bold uppercase leading-[0.9] tracking-[-0.04em] text-balance"
            >
              {content.headline}
            </h1>
            <p className="mt-0 mb-7 max-w-[54ch] text-text-2">{content.intro}</p>

            <div className="grid gap-3.5">
              <CtaBar href={content.cta.href}>{content.cta.label}</CtaBar>
              {content.secondary && (
                <a
                  href={content.secondary.href === '/resume.pdf' ? settings.links.resume : content.secondary.href}
                  className="justify-self-start text-text-2 underline decoration-1 underline-offset-4 hover:text-text"
                >
                  {content.secondary.label}
                </a>
              )}
            </div>
          </div>

          <Showcase frames={content.frames} />
        </div>
      </Section>
    </Frame>
  )
}
