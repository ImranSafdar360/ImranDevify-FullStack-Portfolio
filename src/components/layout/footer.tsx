import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ScriptLabel } from '@/components/ui/script-label'
import { SITE } from '@/lib/site'
import { Frame } from './frame'
import { LiveClock } from './live-clock'
import { Section } from './section'

// "Let's talk" footer (04 §11). Static contact details until the Settings collection exists (T9).
export function Footer() {
  return (
    <footer>
      <Frame>
        <Section aria-labelledby="footer-title" className="pb-12">
          <h2 id="footer-title" className="font-display text-[clamp(4rem,16vw,14rem)] font-bold uppercase leading-[0.85] tracking-[-0.04em]">
            Let&apos;s talk.
          </h2>
          <ScriptLabel as="p" className="mt-4">
            I usually reply within a few hours
          </ScriptLabel>

          <dl className="mt-8 grid gap-4 text-[clamp(1.1rem,2.4vw,1.7rem)]">
            <div>
              <dt className="font-mono text-[0.75rem] uppercase text-text-3">For hiring</dt>
              <dd className="m-0">
                <a href={`mailto:${SITE.emails.hiring}`} className="break-all text-text underline decoration-1 underline-offset-4 hover:text-accent-hover">
                  {SITE.emails.hiring}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[0.75rem] uppercase text-text-3">For projects</dt>
              <dd className="m-0">
                <a href={`mailto:${SITE.emails.projects}`} className="break-all text-text underline decoration-1 underline-offset-4 hover:text-accent-hover">
                  {SITE.emails.projects}
                </a>
              </dd>
            </div>
          </dl>

          <div className="mt-9 flex flex-wrap gap-2.5">
            <Button variant="primary" href={SITE.links.resume} arrow>
              Download resume
            </Button>
            <Button href={SITE.links.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </Button>
            <Button href={SITE.links.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </Button>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 font-mono text-[0.75rem] uppercase text-text-3">
            <span>
              {SITE.location} · <LiveClock timeZone={SITE.timeZone} />
            </span>
            <ul className="m-0 flex list-none gap-5 p-0">
              {SITE.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-text-3 no-underline hover:text-text">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <span>© {SITE.name}</span>
          </div>
        </Section>
      </Frame>
    </footer>
  )
}
