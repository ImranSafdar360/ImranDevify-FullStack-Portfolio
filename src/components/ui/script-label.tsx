import { cn } from '@/lib/utils'

type ScriptLabelProps = {
  children: React.ReactNode
  as?: 'span' | 'p'
  className?: string
}

// Handwritten annotation (05-theme §2.3): short labels only, always accent, always wiggling.
// The wiggle comes from the shared #wiggle filter and is dropped for reduced motion.
export function ScriptLabel({ children, as: Tag = 'span', className }: ScriptLabelProps) {
  return (
    <Tag data-wiggle="" className={cn('inline-block font-script text-accent [filter:url(#wiggle)] motion-reduce:[filter:none]', className)}>
      {children}
    </Tag>
  )
}
