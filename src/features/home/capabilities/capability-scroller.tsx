'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { BezelCard } from '@/components/ui/surfaces'
import { cn } from '@/lib/utils'

export type CapabilityItem = {
  title: string
  line: string
  inDevelopment: boolean
  icon: React.ReactNode
  links: { href: string; label: string }[]
  proof: React.ReactNode
}

const pad = (n: number) => String(n).padStart(2, '0')

// Sticky scroll (layout idea from Aceternity's sticky-scroll-reveal, rebuilt without `motion` on plain page scroll):
// the list scrolls on the left, one capability per screen; a sticky Bezel panel on the right shows the proof for the
// one crossing the viewport centre. Reading order stays in the list: each item carries its own proof (visible inline
// on phones, screen-reader-only on desktop), so the panel is a decorative mirror and is hidden from assistive tech.
export function CapabilityScroller({ items }: { items: CapabilityItem[] }) {
  const [active, setActive] = useState(0)
  const rows = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index))
        }
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    for (const row of rows.current) if (row) observer.observe(row)
    return () => observer.disconnect()
  }, [items.length])

  return (
    <div className="grid gap-x-[clamp(32px,5vw,72px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,29rem)]">
      <ol className="m-0 list-none p-0">
        {items.map((item, i) => (
          <li
            key={item.title}
            ref={(el) => {
              rows.current[i] = el
            }}
            data-index={i}
            data-active={active === i}
            className="group/row border-t border-line py-[clamp(28px,4vw,44px)] last:border-b lg:flex lg:min-h-[56vh] lg:flex-col lg:justify-center"
          >
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 transition-[translate] duration-500 ease-out-strong motion-reduce:transition-none lg:group-data-[active=true]/row:translate-x-[10px] motion-reduce:lg:group-data-[active=true]/row:translate-x-0">
              <span className="font-mono text-[0.8rem] text-text-3 transition-colors duration-300 lg:group-data-[active=true]/row:text-accent">
                ({pad(i + 1)})
              </span>
              <h3 className="m-0 font-display text-[clamp(1.6rem,3.6vw,3rem)] font-bold uppercase leading-[0.9] tracking-[-0.04em] text-text transition-colors duration-300 lg:text-text-4 lg:group-data-[active=true]/row:text-text">
                {item.title}
              </h3>
              {item.inDevelopment && <Badge variant="development">In development</Badge>}
            </div>

            <p className="m-0 mt-4 max-w-[46ch] text-[1.02rem] leading-[1.55] text-text-2 transition-colors duration-300 lg:text-text-3 lg:group-data-[active=true]/row:text-text-2">
              {item.line}
            </p>

            {/* Inline proof: a card on phones; on desktop the sticky panel shows it, so here it stays for screen readers. */}
            {item.proof && <div className="mt-6 rounded-nested border border-line bg-surface p-5 lg:sr-only">{item.proof}</div>}

            {item.links.length > 0 && (
              <p className="m-0 mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.72rem] uppercase tracking-[0.02em] text-text-3">
                <span>
                  Seen in <span aria-hidden="true">→</span>
                </span>
                {item.links.map((link, k) => (
                  <span key={link.href} className="flex items-center gap-x-2">
                    <Link
                      href={link.href}
                      className="text-text-2 underline decoration-line-strong underline-offset-4 transition-colors hover:text-text hover:decoration-accent"
                    >
                      {link.label}
                    </Link>
                    {k < item.links.length - 1 && (
                      <span aria-hidden="true" className="text-text-4">
                        ·
                      </span>
                    )}
                  </span>
                ))}
              </p>
            )}
          </li>
        ))}
      </ol>

      <div aria-hidden="true" data-capability-panel className="hidden lg:block">
        <BezelCard className="sticky top-[max(6rem,calc(50vh-17rem))]">
          <div className="grid">
            {items.map((item, i) => (
              <div
                key={item.title}
                data-active={active === i}
                className={cn(
                  'col-start-1 row-start-1 flex flex-col gap-7',
                  'transition-[opacity,translate,filter] duration-[260ms] ease-out-strong',
                  'data-[active=false]:pointer-events-none data-[active=false]:translate-y-2 data-[active=false]:opacity-0 data-[active=false]:blur-[2px]',
                  'motion-reduce:data-[active=false]:translate-y-0 motion-reduce:data-[active=false]:blur-none',
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-icon border border-line-strong bg-bg text-accent">
                      {item.icon}
                    </span>
                    <span className="font-mono text-[0.75rem] uppercase tracking-[0.02em] text-text-3">{item.title}</span>
                  </div>
                  <span className="font-mono text-[0.78rem] text-text-3">
                    <span className="text-accent">{pad(i + 1)}</span> / {pad(items.length)}
                  </span>
                </div>
                {item.proof}
              </div>
            ))}
          </div>

          {/* Progress: where you are in the six. */}
          <div className="mt-8 flex gap-1.5">
            {items.map((item, i) => (
              <span
                key={item.title}
                className={cn(
                  'h-0.5 flex-1 rounded-full transition-colors duration-300',
                  i === active ? 'bg-accent' : i < active ? 'bg-text-4' : 'bg-line',
                )}
              />
            ))}
          </div>
        </BezelCard>
      </div>
    </div>
  )
}
