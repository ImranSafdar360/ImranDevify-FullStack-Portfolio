import { OwnershipBadge } from '@/components/ui/badge'
import { ArrowIcon } from '@/components/ui/icons'
import { SurfaceButton } from '@/components/ui/surface-button'
import { MetaTable, Pill } from '@/components/ui/surfaces'
import type { Project } from '@/schemas/project'

// One featured project's details: name, one-liner, ownership, the meta table (Year · Role · Stack, mono keys per
// 05-theme) and the way into its case study. Shared by the desktop sticky stage and the stacked phone layout.
export function CaseDetails({ project, headingId }: { project: Project; headingId?: string }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-3">
        <h3 id={headingId} className="m-0 font-display text-[clamp(2rem,3vw,2.75rem)] font-bold uppercase leading-[0.9] tracking-[-0.03em] text-text">
          {project.title}
        </h3>
        <OwnershipBadge ownership={project.ownership} />
      </div>

      <p className="m-0 max-w-[40ch] text-[clamp(1.1rem,1.5vw,1.3rem)] font-semibold leading-[1.3] tracking-[-0.02em] text-text-2">
        {project.oneLiner}
      </p>

      <MetaTable
        rows={[
          { label: 'Year', value: <span className="text-text-2">{project.year}</span> },
          { label: 'Role', value: <span className="text-text-2">{project.role}</span> },
          {
            label: 'Stack',
            value: (
              <span className="flex flex-wrap gap-1.5">
                {project.stack.slice(0, 5).map((tag) => (
                  <Pill key={tag}>{tag}</Pill>
                ))}
              </span>
            ),
          },
        ]}
      />

      <SurfaceButton href={`/work/${project.slug}`} variant="primary" icon={<ArrowIcon className="size-[1.05em]" />} className="self-start">
        Read case study
      </SurfaceButton>
    </div>
  )
}
