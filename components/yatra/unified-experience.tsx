'use client'

import { motion, type MotionValue, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const parts = [
  { label: 'OCR', x: -38, y: -26, color: 'var(--saffron)' },
  { label: 'ASR', x: 36, y: -30, color: 'var(--electric)' },
  { label: 'MT', x: -42, y: 22, color: 'var(--jade)' },
  { label: 'TTS', x: 40, y: 26, color: 'var(--saffron)' },
  { label: 'VISION', x: 0, y: 38, color: 'var(--electric)' },
]

const particles = Array.from({ length: 40 }).map((_, i) => {
  const a = (i / 40) * Math.PI * 2
  const r = 38 + (i % 5) * 6
  return { fx: `${Math.cos(a) * r}vw`, fy: `${Math.sin(a) * r}vh`, dur: `${2.5 + (i % 4) * 0.6}s`, delay: `${(i % 9) * 0.3}s` }
})

function ConvergingLabel({ part, progress }: { part: (typeof parts)[number]; progress: MotionValue<number> }) {
  const x = useTransform(progress, [0.05, 0.45], [`${part.x}vw`, '0vw'])
  const y = useTransform(progress, [0.05, 0.45], [`${part.y}vh`, '0vh'])
  const opacity = useTransform(progress, [0, 0.1, 0.42, 0.5], [0, 1, 1, 0])
  const scale = useTransform(progress, [0.05, 0.45], [1, 0.4])

  return (
    <motion.span
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-4xl font-extrabold tracking-wider md:text-7xl"
      style={{ x, y, opacity, scale, color: part.color, textShadow: `0 0 40px ${part.color}` }}
    >
      {part.label}
    </motion.span>
  )
}

export function UnifiedExperience() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const headingOpacity = useTransform(scrollYProgress, [0, 0.08, 0.35, 0.45], [0, 1, 1, 0])
  const coreScale = useTransform(scrollYProgress, [0.42, 0.6], [0.3, 1])
  const coreOpacity = useTransform(scrollYProgress, [0.42, 0.55], [0, 1])
  const flash = useTransform(scrollYProgress, [0.4, 0.46, 0.6], [0, 0.8, 0])
  const subOpacity = useTransform(scrollYProgress, [0.62, 0.75], [0, 1])
  const subY = useTransform(scrollYProgress, [0.62, 0.75], [40, 0])

  return (
    <section ref={ref} className="relative h-[320vh]" aria-label="Not five tools, one experience">
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute top-1/2 left-1/2" aria-hidden="true">
          {particles.map((p, i) => (
            <span
              key={i}
              className="flow-in absolute size-1 rounded-full bg-saffron"
              style={{ '--fx': p.fx, '--fy': p.fy, '--dur': p.dur, '--delay': p.delay } as React.CSSProperties}
            />
          ))}
        </div>

        <motion.div style={{ opacity: headingOpacity }} className="absolute top-[12%] text-center">
          <h2 className="font-display text-[clamp(2.2rem,6vw,5rem)] leading-[0.9] font-extrabold tracking-tight">
            NOT FIVE TOOLS.
            <br />
            <span className="text-stroke">ONE EXPERIENCE.</span>
          </h2>
        </motion.div>

        {parts.map((p) => (
          <ConvergingLabel key={p.label} part={p} progress={scrollYProgress} />
        ))}

        <motion.span
          aria-hidden="true"
          className="absolute size-[60vmin] rounded-full"
          style={{ opacity: flash, background: 'radial-gradient(circle, var(--saffron), transparent 65%)' }}
        />

        <motion.div style={{ scale: coreScale, opacity: coreOpacity }} className="relative flex flex-col items-center text-center">
          <span className="font-display text-[clamp(5rem,20vw,18rem)] leading-none font-extrabold tracking-tight">
            YATRA<span className="text-saffron">.</span>
          </span>
          <motion.p style={{ opacity: subOpacity, y: subY }} className="mt-4 text-sm tracking-[0.35em] text-muted-foreground md:text-base">
            ONE MULTIMODAL
            <br />
            <span className="text-foreground">TOURISM EXPERIENCE.</span>
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
