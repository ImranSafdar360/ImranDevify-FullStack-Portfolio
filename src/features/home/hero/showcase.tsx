import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { HeroContent } from '@/schemas/section'

type Frame = HeroContent['frames'][number]

const FRAME_POSITION: Record<Frame['variant'], string> = {
  desktop: 'top-10 left-0 h-[300px] w-[78%] rounded-card',
  phone: 'top-[150px] right-[2%] h-[340px] w-[34%] rounded-[34px]',
  card: 'bottom-0 left-[10%] h-[150px] w-[52%] rounded-card',
}

// Skeleton screen shown until the real screenshot is uploaded (T44).
function PlaceholderScreen({ variant }: { variant: Frame['variant'] }) {
  const row = 'mx-3.5 my-2.5 h-[9px] rounded bg-surface-2'
  if (variant === 'phone') {
    return (
      <>
        <div className="m-3.5 h-30 rounded-[14px] bg-linear-to-br from-accent/60 to-surface-2" />
        <div className={cn(row, 'w-3/4')} />
        <div className={cn(row, 'w-1/2')} />
        <div className={cn(row, 'w-1/3 bg-accent/50')} />
      </>
    )
  }
  return (
    <div className="flex h-full">
      {variant === 'desktop' && (
        <div className="w-[22%] border-r border-line pt-2">
          <div className={cn(row, 'w-1/2 bg-accent/50')} />
          <div className={cn(row, 'w-3/4')} />
          <div className={cn(row, 'w-1/2')} />
        </div>
      )}
      <div className="flex-1 pt-2">
        <div className={cn(row, 'w-1/2')} />
        <div className={row} />
        <div className={cn(row, 'w-3/4')} />
        <div className={cn(row, 'w-1/3 bg-accent/50')} />
        <div className={cn(row, 'w-2/3')} />
      </div>
    </div>
  )
}

// Floating 3D prop (04 §1): pops in after the frames, floats, and drifts on scroll (data-anim="parallax").
function Prop({ children, speed, delay, className }: { children: React.ReactNode; speed: number; delay: string; className: string }) {
  return (
    <span aria-hidden="true" data-anim="parallax" data-speed={speed} className={cn('absolute', className)}>
      <span className="block size-full animate-pop motion-reduce:animate-none" style={{ animationDelay: delay }}>
        <span className="inflated-prop grid size-full place-items-center font-mono animate-float motion-reduce:animate-none" style={{ animationDelay: `-${speed * 20}s` }}>
          {children}
        </span>
      </span>
    </span>
  )
}

// Product composition (04 §1): real screenshots in bezel frames, layered, with floating 3D props.
// Everything here is CSS-animated on load (not LCP: the H1 is), so it never waits for the idle motion layer.
export function Showcase({ frames }: { frames: Frame[] }) {
  return (
    <div className="relative min-h-125 overflow-hidden lg:min-h-130 lg:self-center lg:overflow-visible">
      {frames.map((frame, i) => (
        <div
          key={frame.label}
          style={{ animationDelay: `${150 + i * 140}ms` }}
          className={cn(
            'absolute border border-line bg-linear-to-b from-surface-2 to-surface p-1.75 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.8)]',
            'animate-rise motion-reduce:animate-none',
            FRAME_POSITION[frame.variant],
          )}
        >
          <div
            className={cn(
              'relative h-full overflow-hidden border border-line bg-bg',
              frame.variant === 'phone' ? 'rounded-[28px]' : 'rounded-nested',
            )}
          >
            {frame.image ? (
              <Image src={frame.image.src} alt={frame.image.alt} fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover object-top" />
            ) : (
              <div aria-hidden="true" className="h-full">
                <PlaceholderScreen variant={frame.variant} />
              </div>
            )}
            <span className="absolute bottom-2.5 left-3 font-mono text-[0.66rem] uppercase text-text-3">{frame.label}</span>
          </div>
        </div>
      ))}

      {/* Payment card, play button and chat bubble: payments, Blarecast, real-time chat. */}
      <Prop speed={0.12} delay="700ms" className="top-0 right-[16%] h-16 w-24 rotate-12 [&_.inflated-prop]:rounded-[14px]">
        $
      </Prop>
      <Prop speed={0.2} delay="820ms" className="-right-1.5 bottom-30 size-17.5 [&_.inflated-prop]:rounded-full">
        ▶
      </Prop>
      <Prop speed={0.08} delay="940ms" className="top-27.5 left-1 h-15 w-19 lg:-left-5.5 [&_.inflated-prop]:rounded-[22px] [&_.inflated-prop]:rounded-bl-md">
        <span className="tracking-[0.15em]">•••</span>
      </Prop>
    </div>
  )
}
