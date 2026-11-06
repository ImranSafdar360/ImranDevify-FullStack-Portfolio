import { Pill } from '@/components/ui/surfaces'
import { cn } from '@/lib/utils'
import type { CapabilityProof as Proof } from '@/schemas/section'
import { IntegrationIcon } from '../integrations/integration-icon'

// What backs one capability: a key figure (Mohave, accent, like a bento number), the services behind it as
// "provider nodes", up to four verified facts, and the stack as Pill tags (05-theme §5). Server-rendered; the same
// markup feeds the sticky panel (desktop) and the inline card (phones).
export function CapabilityProof({ proof, className }: { proof: Proof; className?: string }) {
  return (
    <div className={cn('flex flex-col gap-6', className)}>
      {proof.figure && (
        <p className="m-0 flex items-end gap-4">
          <span className="font-display text-[clamp(3.2rem,5vw,4.6rem)] font-bold uppercase leading-[0.8] tracking-[-0.04em] whitespace-nowrap text-accent">
            {proof.figure.value}
          </span>
          <span className="max-w-[22ch] pb-0.5 text-[0.92rem] leading-[1.35] text-text-2">{proof.figure.caption}</span>
        </p>
      )}

      {proof.marks.length > 0 && (
        <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
          {proof.marks.map((mark) => (
            <li
              key={mark.name}
              className="inline-flex h-9 items-center gap-2 rounded-icon border border-line bg-bg px-3 text-[0.85rem] font-medium text-text-2"
            >
              <IntegrationIcon icon={mark.icon} />
              {mark.name}
            </li>
          ))}
        </ul>
      )}

      <ul className="m-0 flex list-none flex-col gap-3 p-0">
        {proof.points.map((point) => (
          <li key={point} className="flex gap-3 text-[0.96rem] leading-[1.5] text-text-2">
            <span aria-hidden="true" className="mt-[0.6em] size-1 shrink-0 rounded-full bg-accent" />
            {point}
          </li>
        ))}
      </ul>

      {proof.stack.length > 0 && (
        <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
          {proof.stack.map((tag) => (
            <li key={tag}>
              <Pill>{tag}</Pill>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
