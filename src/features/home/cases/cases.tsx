import Image from 'next/image'
import { Frame } from '@/components/layout/frame'
import { Section, SectionDivider, SectionLabel } from '@/components/layout/section'
import { LogoLoop, type LogoItem } from '@/components/ui/logo-loop'
import { ScriptLabel } from '@/components/ui/script-label'
import type { Project } from '@/schemas/project'
import type { CasesContent } from '@/schemas/section'
import { CaseDetails } from './case-details'
import { CaseShowcase, type CaseItem } from './case-showcase'

// Stand-in photos until the real redacted screenshots arrive (H7); they are labelled as such on the frame.
const PLACEHOLDER_DIR = '/images/placeholders/'

function CaseImage({ project }: { project: Project }) {
  if (!project.cover) return <div className="hatch-band absolute inset-0" />
  return <Image src={project.cover.src} alt="" fill sizes="(min-width: 1024px) 56vw, 100vw" className="object-cover" />
}

// "/ 01 / Selected work" (04 §3): the real production proof. A marquee title, then the featured projects from the
// DB (admin picks which and in what order) in a sticky stage that wipes from one project to the next.
export function Cases({ content, projects }: { content: CasesContent; projects: Project[] }) {
  const featured = projects.filter((p) => p.featured && p.kind === 'case-study').sort((a, b) => a.order - b.order)
  if (featured.length === 0) return null
  const count = String(featured.length).padStart(2, '0')

  const marquee: LogoItem[] = [
    {
      title: content.title,
      node: (
        <span className="flex items-center gap-[clamp(28px,4vw,64px)] pr-[clamp(28px,4vw,64px)]">
          <span className="flex items-start font-display text-[clamp(3.4rem,10vw,9rem)] font-bold uppercase leading-[0.85] tracking-[-0.04em] whitespace-nowrap text-text">
            {content.title}
            <span className="ml-2 font-mono text-[0.16em] font-normal tracking-normal text-text-3">({count})</span>
          </span>
          {content.scriptLabel && <ScriptLabel className="text-[clamp(1.3rem,2.2vw,2rem)] whitespace-nowrap">{content.scriptLabel}</ScriptLabel>}
        </span>
      ),
    },
  ]

  const items: CaseItem[] = featured.map((project) => ({
    slug: project.slug,
    title: project.title,
    details: <CaseDetails project={project} />,
    image: <CaseImage project={project} />,
    placeholder: !project.cover || project.cover.src.startsWith(PLACEHOLDER_DIR),
  }))

  return (
    <Frame>
      <Section id="cases" aria-labelledby="cases-title">
        <SectionLabel index={content.index}>{content.label}</SectionLabel>
        <h2 id="cases-title" className="sr-only">
          {content.title} ({count})
        </h2>
        {/* Decorative marquee of the title; the <h2> above carries it for assistive tech. */}
        <div aria-hidden="true" className="-mx-[clamp(20px,4vw,56px)] border-y border-line py-[clamp(16px,2.4vw,32px)]">
          <LogoLoop logos={marquee} speed={40} gap={0} logoHeight={16} fadeOut={false} pauseOnHover={false} intro={false} draggable={false} ariaLabel={content.title} />
        </div>

        <CaseShowcase items={items} all={content.all} />
      </Section>
      <SectionDivider />
    </Frame>
  )
}
