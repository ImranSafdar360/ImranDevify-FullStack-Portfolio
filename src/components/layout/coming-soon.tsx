import type { Metadata } from 'next'
import { Frame } from './frame'
import { Section, SectionLabel } from './section'

// Temporary page body for routes that exist in the nav but are built later (tasks/todo.md T18a, T19, T23).
export const comingSoonMetadata = (title: string): Metadata => ({ title, robots: { index: false, follow: false } })

export function ComingSoon({ title, task }: { title: string; task: string }) {
  return (
    <main>
      <Frame>
        <Section className="min-h-[70vh] pt-40">
          <SectionLabel index="00">{`In progress · ${task}`}</SectionLabel>
          <h1 className="font-display text-[clamp(3.6rem,10.5vw,9.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.04em]">{title}</h1>
          <p className="mt-6 max-w-[54ch] text-text-2">This page is being rebuilt as part of the new portfolio.</p>
        </Section>
      </Frame>
    </main>
  )
}
