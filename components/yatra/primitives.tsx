'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function MagneticButton({
  href,
  children,
  variant = 'primary',
  className,
  onClick,
}: {
  href?: string
  children: ReactNode
  variant?: 'primary' | 'ghost'
  className?: string
  onClick?: () => void
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 })
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 })

  function handleMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.4)
  }

  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href ?? '#'}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x, y }}
      className={cn(
        'group relative inline-flex items-center gap-3 rounded-full px-7 py-4 text-xs font-medium tracking-[0.2em] uppercase transition-shadow duration-500 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
        variant === 'primary'
          ? 'bg-saffron text-ink hover:shadow-[0_0_40px_-4px_var(--saffron)]'
          : 'border border-foreground/20 text-foreground hover:border-foreground/60',
        className,
      )}
    >
      {children}
    </motion.a>
  )
}

export function Arrow({ className, direction = 'right' }: { className?: string; direction?: 'right' | 'down' }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-block transition-transform duration-300',
        direction === 'right' ? 'group-hover:translate-x-1.5' : 'group-hover:translate-y-1',
        className,
      )}
    >
      {direction === 'right' ? '→' : '↓'}
    </span>
  )
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('flex items-center gap-3 text-[11px] font-medium tracking-[0.3em] text-muted-foreground uppercase', className)}>
      <span aria-hidden="true" className="h-px w-8 bg-saffron" />
      {children}
    </p>
  )
}

export function RevealLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  as: Tag = 'h2',
}: {
  lines: ReactNode[]
  className?: string
  lineClassName?: (index: number) => string
  delay?: number
  as?: 'h1' | 'h2' | 'h3' | 'p'
  }) {
  const MotionTag = motion[Tag]
  return (
  <MotionTag className={className} initial="hidden" whileInView="shown" viewport={{ once: true, margin: '-10% 0px' }}>
  {lines.map((line, i) => (
  <span key={i} className="block overflow-hidden pb-[0.06em]">
  <motion.span
  className={cn('block', lineClassName?.(i))}
  variants={{ hidden: { y: '110%' }, shown: { y: '0%' } }}
  transition={{ duration: 1, delay: delay + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
  >
  {line}
  </motion.span>
  </span>
  ))}
  </MotionTag>
  )
}

export function Waveform({
  active,
  bars = 32,
  className,
  color = 'var(--electric)',
}: {
  active: boolean
  bars?: number
  className?: string
  color?: string
}) {
  return (
    <div className={cn('flex h-10 items-center gap-[3px]', className)} aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => {
        const peak = 0.3 + (((i * 37) % 11) / 11) * 0.7
        return (
          <motion.span
            key={i}
            className="h-full w-[3px] origin-center rounded-full"
            style={{ backgroundColor: color }}
            animate={active ? { scaleY: [0.15, peak, 0.25, peak * 0.8, 0.15] } : { scaleY: 0.12 }}
            transition={
              active
                ? { duration: 1.1 + (i % 5) * 0.12, repeat: Infinity, ease: 'easeInOut', delay: (i % 7) * 0.05 }
                : { duration: 0.4 }
            }
          />
        )
      })}
    </div>
  )
}

export function HudCorners({ className, color = 'border-foreground/70' }: { className?: string; color?: string }) {
  const base = cn('absolute size-5', color)
  return (
    <div className={cn('pointer-events-none absolute inset-0', className)} aria-hidden="true">
      <span className={cn(base, 'top-0 left-0 border-t border-l')} />
      <span className={cn(base, 'top-0 right-0 border-t border-r')} />
      <span className={cn(base, 'bottom-0 left-0 border-b border-l')} />
      <span className={cn(base, 'right-0 bottom-0 border-r border-b')} />
    </div>
  )
}

export function StatusDot({ className }: { className?: string }) {
  return (
    <span className={cn('relative inline-flex size-2', className)} aria-hidden="true">
      <span className="pulse-ring absolute inset-0 rounded-full bg-current" />
      <span className="relative size-2 rounded-full bg-current" />
    </span>
  )
}

export function speak(text: string, lang = 'en-IN') {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = lang
  utterance.rate = 0.95
  window.speechSynthesis.speak(utterance)
}
