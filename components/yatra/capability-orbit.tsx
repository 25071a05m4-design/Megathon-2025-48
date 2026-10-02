'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { accentText, accentVar, capabilities } from '@/lib/yatra-data'
import { cn } from '@/lib/utils'
import { Eyebrow, RevealLines } from './primitives'

const RADIUS = 38
const nodes = capabilities.map((c, i) => {
  const angle = ((-90 + i * 72) * Math.PI) / 180
  return { ...c, x: 50 + Math.cos(angle) * RADIUS, y: 50 + Math.sin(angle) * RADIUS }
})

export function CapabilityOrbit() {
  const [active, setActive] = useState<number | null>(null)
  const current = active !== null ? nodes[active] : null

  return (
    <section className="relative px-5 py-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Eyebrow>One product</Eyebrow>
            <RevealLines
              className="mt-8 font-display text-[clamp(2.6rem,7vw,6rem)] leading-[0.9] font-extrabold tracking-tight"
              lines={['ONE JOURNEY.', 'FIVE AI POWERS.']}
              lineClassName={(i) => (i === 1 ? 'text-saffron' : '')}
            />
          </div>
          <p className="max-w-xs text-sm leading-relaxed font-light text-muted-foreground">
            Five models, one shared context. Every capability hands off to the next — so you never switch apps, modes or
            mental models.
          </p>
        </div>

        {/* Desktop spatial composition */}
        <div className="relative mx-auto mt-16 hidden aspect-square w-full max-w-[720px] md:block" onMouseLeave={() => setActive(null)}>
          <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden="true">
            <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="oklch(1 0 0 / 0.08)" strokeWidth="0.15" strokeDasharray="0.6 1" />
            <circle cx="50" cy="50" r="18" fill="none" stroke="oklch(1 0 0 / 0.06)" strokeWidth="0.15" />
            {nodes.map((n, i) => {
              const path = `M50 50 L${n.x} ${n.y}`
              const isActive = active === i
              return (
                <g key={n.id}>
                  <motion.path
                    d={path}
                    stroke={accentVar[n.accent]}
                    strokeWidth={isActive ? 0.35 : 0.15}
                    strokeOpacity={active === null ? 0.5 : isActive ? 1 : 0.12}
                    fill="none"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: i * 0.15 }}
                  />
                  <circle r={isActive ? 0.9 : 0.5} fill={accentVar[n.accent]}>
                    <animateMotion dur={`${2.4 + i * 0.3}s`} repeatCount="indefinite" path={`M${n.x} ${n.y} L50 50`} />
                  </circle>
                </g>
              )
            })}
            {nodes.map((n, i) => {
              const next = nodes[(i + 1) % nodes.length]
              return (
                <line key={`ring-${n.id}`} x1={n.x} y1={n.y} x2={next.x} y2={next.y} stroke="oklch(1 0 0 / 0.06)" strokeWidth="0.12" />
              )
            })}
          </svg>

          <div className="absolute top-1/2 left-1/2 flex size-[30%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-foreground/10 bg-ink/80 text-center backdrop-blur">
            <span className="pulse-ring absolute inset-0 rounded-full border border-saffron/30" aria-hidden="true" />
            <AnimatePresence mode="wait">
              {current ? (
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="px-6"
                >
                  <span className={cn('text-[10px] tracking-[0.3em]', accentText[current.accent])}>{current.tech}</span>
                  <p className="mt-2 text-xs leading-relaxed text-foreground/80">{current.description}</p>
                </motion.div>
              ) : (
                <motion.div key="core" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <span className="font-display text-2xl font-extrabold tracking-[0.2em]">YATRA</span>
                  <span className="block text-[10px] tracking-[0.4em] text-saffron">AI CORE</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {nodes.map((n, i) => {
            let dx = 0
            let dy = 0
            if (active !== null && active !== i) {
              const a = nodes[active]
              const vx = n.x - a.x
              const vy = n.y - a.y
              const len = Math.hypot(vx, vy) || 1
              dx = (vx / len) * 18
              dy = (vy / len) * 18
            }
            const isActive = active === i
            return (
              <motion.button
                key={n.id}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                animate={{ x: dx, y: dy, scale: isActive ? 1.1 : 1, opacity: active === null || isActive ? 1 : 0.4 }}
                transition={{ type: 'spring', stiffness: 160, damping: 18 }}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 text-center"
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
              >
                <span
                  className="flex size-16 items-center justify-center rounded-full border bg-ink text-[11px] font-semibold tracking-[0.2em] transition-shadow duration-500"
                  style={{
                    borderColor: accentVar[n.accent],
                    color: accentVar[n.accent],
                    boxShadow: isActive ? `0 0 50px -4px ${accentVar[n.accent]}` : 'none',
                  }}
                >
                  {n.tech}
                </span>
                <span className="mt-2 text-[10px] tracking-[0.3em] text-muted-foreground">{n.index}</span>
                <span className="font-display text-xl font-bold tracking-wide">{n.verb}</span>
              </motion.button>
            )
          })}
        </div>

        {/* Mobile vertical composition */}
        <ol className="relative mt-14 flex flex-col gap-10 border-l border-foreground/10 pl-8 md:hidden">
          {nodes.map((n, i) => (
            <motion.li
              key={n.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative"
            >
              <span
                className="absolute top-2 -left-[37px] size-2.5 rounded-full"
                style={{ backgroundColor: accentVar[n.accent], boxShadow: `0 0 16px ${accentVar[n.accent]}` }}
              />
              <span className="text-[10px] tracking-[0.3em] text-muted-foreground">
                {n.index} · <span className={accentText[n.accent]}>{n.tech}</span>
              </span>
              <p className="font-display text-3xl font-bold">{n.verb}</p>
              <p className="mt-1 text-sm font-light text-muted-foreground">{n.description}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
