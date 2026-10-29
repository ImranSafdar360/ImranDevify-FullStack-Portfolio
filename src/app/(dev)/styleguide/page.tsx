import type { Metadata } from 'next'
import { Frame } from '@/components/layout/frame'
import { Section, SectionLabel } from '@/components/layout/section'
import { OwnershipBadge } from '@/components/ui/badge'
import { Button, CtaBar } from '@/components/ui/button'
import { ScriptLabel } from '@/components/ui/script-label'
import { BezelCard, MetaTable, Pill } from '@/components/ui/surfaces'
import { contrastRatio } from '@/lib/theme/color'

// Internal review page for the design system (tasks/todo.md T5–T8). Never indexed.
// Becomes owner-only once admin auth exists (T27).
export const metadata: Metadata = {
  title: 'Styleguide',
  robots: { index: false, follow: false },
}

const BG = '#0B0B0C'

const swatches = [
  { name: 'Background', token: '--bg', hex: '#0B0B0C' },
  { name: 'Surface', token: '--surface', hex: '#141416' },
  { name: 'Surface 2', token: '--surface-2', hex: '#1B1B1E' },
  { name: 'Line', token: '--line', hex: '#2A2A2E' },
  { name: 'Line strong', token: '--line-strong', hex: '#3A3A40' },
  { name: 'Text', token: '--text', hex: '#EEEEEE', min: 4.5 },
  { name: 'Text 2', token: '--text-2', hex: '#A4A4A4', min: 4.5 },
  { name: 'Text 3', token: '--text-3', hex: '#8A8A8A', min: 4.5 },
  { name: 'Text 4', token: '--text-4', hex: '#6E6E6E', min: 3 },
  { name: 'Accent', token: '--accent', hex: '#3D7BFF', min: 3 },
]

const typeSpecimens = [
  { label: 'Display · H1', node: <span className="font-display text-[clamp(3rem,8vw,6.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.04em]">Case studies</span> },
  { label: 'Display · H2', node: <span className="font-display text-[clamp(2rem,5vw,4rem)] font-bold uppercase leading-[0.9] tracking-[-0.04em]">What I&apos;m good at</span> },
  { label: 'Heading · H3', node: <span className="text-[1.6rem] font-semibold tracking-[-0.02em]">One payment system, five providers</span> },
  {
    label: 'Body',
    node: (
      <span className="block max-w-[62ch] text-text-2">
        Agencies get paid in different ways. Each provider has its own sign-in flow, its own checkout, and its own idea of when an
        invoice is paid. I designed one payment layer that every provider plugs into.
      </span>
    ),
  },
  { label: 'Script label', node: <ScriptLabel className="text-[1.6em]">The challenges</ScriptLabel> },
  { label: 'Mono label', node: <span className="font-mono text-[0.9rem] uppercase text-text-3">/ 02 / What I build · 2025 – now · Built solo</span> },
]

function CardIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M2.5 10h19" />
    </svg>
  )
}

export default function StyleguidePage() {
  return (
    <main>
      <Frame>
        <Section hatchAfter aria-labelledby="sg-title" className="pt-32 md:pt-36">
          <SectionLabel index="00">Styleguide</SectionLabel>
          <h1 id="sg-title" className="font-display text-[clamp(3.6rem,10.5vw,9.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.04em]">
            Annotated
            <br />
            Blueprint
          </h1>
          <p className="mt-6 max-w-[54ch] text-text-2">
            Every token and primitive of Portfolio V4, for review against the Theme Lab. <ScriptLabel>Internal only</ScriptLabel>
          </p>
        </Section>

        <Section hatchAfter aria-labelledby="sg-type">
          <SectionLabel index="01">Typography</SectionLabel>
          <h2 id="sg-type" className="sr-only">
            Typography
          </h2>
          <dl data-anim="stagger">
            {typeSpecimens.map((t) => (
              <div key={t.label} className="grid gap-2 border-t border-line py-5 md:grid-cols-[170px_1fr] md:items-baseline md:gap-5">
                <dt className="font-mono text-[0.78rem] uppercase text-text-3">{t.label}</dt>
                <dd className="m-0 min-w-0">{t.node}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section hatchAfter aria-labelledby="sg-colour">
          <SectionLabel index="02">Colour tokens · contrast vs background</SectionLabel>
          <h2 id="sg-colour" className="sr-only">
            Colour tokens
          </h2>
          <ul data-anim="stagger" className="grid list-none grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-3 p-0">
            {swatches.map((s) => {
              const ratio = contrastRatio(s.hex, BG)
              const passes = s.min ? ratio >= s.min : null
              return (
                <li key={s.token} className="overflow-hidden rounded-[14px] border border-line bg-surface">
                  <div className="h-[72px]" style={{ background: `var(${s.token})` }} />
                  <div className="px-3 py-2.5 text-[0.82rem]">
                    <b className="block font-semibold">{s.name}</b>
                    <span className="font-mono text-text-3">{s.hex}</span>
                    {passes !== null && (
                      <span className={passes ? 'block text-success' : 'block text-danger'}>
                        {ratio.toFixed(1)}:1 {passes ? 'pass' : 'low'}
                      </span>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        </Section>

        <Section hatchAfter aria-labelledby="sg-ui">
          <SectionLabel index="03">Primitives</SectionLabel>
          <h2 id="sg-ui" className="sr-only">
            UI primitives
          </h2>

          <div className="grid gap-10">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary" href="#sg-ui" arrow>
                Download resume
              </Button>
              <Button href="#sg-ui">LinkedIn</Button>
              <Button>GitHub</Button>
            </div>

            <div className="max-w-[560px]">
              <CtaBar href="#sg-ui">See the case studies</CtaBar>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <OwnershipBadge ownership="built" />
              <OwnershipBadge ownership="built-solo" />
              <OwnershipBadge ownership="extended" />
              <OwnershipBadge ownership="contributed" />
              <OwnershipBadge ownership="in-development" />
              <span className="mx-2 h-5 w-px bg-line" aria-hidden="true" />
              <Pill>React</Pill>
              <Pill>Node.js</Pill>
              <Pill>MongoDB</Pill>
              <Pill>Next.js</Pill>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <BezelCard icon={<CardIcon />}>
                <h3 className="mb-2 text-[1.25rem] font-semibold tracking-[-0.02em]">Remote full-time</h3>
                <p className="m-0 text-[0.95rem] text-text-2">
                  A product team where I can own features end to end: web, mobile, and the backend behind them.
                </p>
              </BezelCard>
              <BezelCard icon={<CardIcon />}>
                <h3 className="mb-2 text-[1.25rem] font-semibold tracking-[-0.02em]">Freelance for SaaS founders</h3>
                <p className="m-0 text-[0.95rem] text-text-2">
                  Payments, subscriptions, new features, or cleaning up a codebase that keeps breaking.
                </p>
              </BezelCard>
              <BezelCard icon={<CardIcon />}>
                <h3 className="mb-2 text-[1.25rem] font-semibold tracking-[-0.02em]">US &amp; EU hours</h3>
                <p className="m-0 text-[0.95rem] text-text-2">Based in Lahore (UTC+5). I usually reply within a few hours.</p>
              </BezelCard>
            </div>

            <div className="max-w-[520px]">
              <MetaTable
                rows={[
                  { label: 'Year', value: '2025 – now' },
                  { label: 'Role', value: 'Full-stack engineer (client work)' },
                  {
                    label: 'Ownership',
                    value: (
                      <span className="flex flex-wrap items-center gap-2">
                        <OwnershipBadge ownership="built" /> payments, forms, Gantt
                      </span>
                    ),
                  },
                  {
                    label: 'Stack',
                    value: (
                      <span className="flex flex-wrap gap-1.5">
                        <Pill>React</Pill>
                        <Pill>Node.js</Pill>
                        <Pill>MongoDB</Pill>
                      </span>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </Section>

        <Section aria-labelledby="sg-motion">
          <SectionLabel index="04">Motion · scroll to see each reveal</SectionLabel>
          <h2 id="sg-motion" data-anim="words" className="font-display text-[clamp(2.6rem,6.5vw,5.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.04em]">
            Live products. Real users.
          </h2>
          <div data-anim="draw" className="my-10 h-px bg-line-strong" />
          <p data-anim="lines" className="max-w-[54ch] text-[1.25rem] text-text-2">
            Most of my work is inside products people already pay for. That changes how carefully you build, and it is why
            every claim on this site links to evidence.
          </p>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <div data-anim="mask" className="grid h-64 place-items-center rounded-card border border-line bg-surface-2 font-mono text-[0.78rem] uppercase text-text-3">
              Image mask reveal
            </div>
            <div data-anim="slide" className="grid h-64 place-items-center rounded-card border border-line bg-surface font-mono text-[0.78rem] uppercase text-text-3">
              Slide-in reveal
            </div>
          </div>
          <div className="h-[40vh]" aria-hidden="true" />
        </Section>
      </Frame>
    </main>
  )
}
