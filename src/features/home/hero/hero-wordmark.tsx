'use client'

import { useSyncExternalStore } from 'react'
import { TechText, type TechTextProps } from '@/components/ui/tech-text'

// Canvas can't resolve CSS variables, so read the live --accent token on the client (tokens stay the source).
const noop = () => () => {}
const readAccent = () => getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || 'currentColor'

const SHARED: TechTextProps = {
  fontWeight: 700,
  fontSize: 420,
  letterSpacing: -0.03,
  intro: 'metrics',
  introDuration: 2.2,
  guides: true,
}

// The hero wordmark as a type specimen: guide lines + labels, letters turn into dashed outlines under the cursor.
// Wide screens draw the name on one line with labelled guides; phones stack first/last name so the type stays big.
// Purely visual: the page's real <h1> carries the name for search and assistive tech. A hidden variant's canvas
// stops animating (TechText sleeps while not intersecting), so only the visible one costs frames.
export function HeroWordmark({ text }: { text: string }) {
  const accent = useSyncExternalStore(noop, readAccent, () => 'currentColor')
  const upper = text.toUpperCase()
  const lines = upper.split(/\s+/).filter(Boolean)

  return (
    <div aria-hidden="true" className="font-display text-text">
      <div className="hidden h-[clamp(150px,22vw,320px)] sm:block">
        <TechText {...SHARED} text={upper} accentColor={accent} inset={0.075} />
      </div>

      <div className="-mx-2 py-2 sm:hidden">
        {lines.map((line) => (
          <div key={line} className="h-[36vw]">
            <TechText {...SHARED} text={line} accentColor={accent} inset={0.02} labels={false} align="left" />
          </div>
        ))}
      </div>
    </div>
  )
}
