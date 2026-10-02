'use client'

import { motion, useMotionValue, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { AILens } from './ai-lens'
import { FloatingLanguages } from './floating-languages'
import { Arrow, MagneticButton } from './primitives'

const ease = [0.16, 1, 0.3, 1] as const

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], [0, 160])
  const lensY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  function onMove(e: React.MouseEvent) {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMove}
      className="relative flex min-h-svh items-center overflow-hidden px-5 pt-28 pb-16 md:px-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 75% 45%, oklch(0.76 0.165 58 / 0.14), transparent 70%), radial-gradient(40% 40% at 10% 90%, oklch(0.83 0.13 210 / 0.08), transparent 70%)',
        }}
      />
      <FloatingLanguages />

      <motion.div style={{ opacity: fade }} className="relative mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
        <motion.div style={{ y: textY }} className="relative z-10">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.2, duration: 0.8 }}
            className="mb-8 flex items-center gap-3 text-[11px] tracking-[0.35em] text-muted-foreground"
          >
            <span className="size-1.5 rounded-full bg-jade" />
            MULTIMODAL AI · 22 INDIAN LANGUAGES
          </motion.p>

          <h1 className="font-display leading-[0.85] font-extrabold tracking-tight">
            {['TRAVEL', 'BEYOND'].map((word, i) => (
              <span key={word} className="block overflow-hidden">
                <motion.span
                  className="block text-[clamp(2.4rem,7.2vw,6.5rem)] text-foreground"
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ delay: 2.1 + i * 0.12, duration: 1.1, ease }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden">
              <motion.span
                className="block bg-gradient-to-r from-saffron via-saffron to-electric bg-clip-text text-[clamp(2.6rem,8.6vw,8rem)] text-transparent"
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ delay: 2.35, duration: 1.2, ease }}
              >
                LANGUAGE.
              </motion.span>
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 1 }}
            className="mt-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between lg:flex-col lg:items-start"
          >
            <p className="max-w-sm text-lg leading-relaxed font-light text-muted-foreground">
              India speaks thousands of stories.
              <br />
              <span className="text-foreground">YATRA helps you understand them.</span>
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <MagneticButton href="#lens">
                START YOUR JOURNEY <Arrow />
              </MagneticButton>
              <MagneticButton href="#explore" variant="ghost">
                EXPLORE THE EXPERIENCE <Arrow direction="down" />
              </MagneticButton>
            </div>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: lensY }} className="relative flex justify-center lg:justify-end">
          <AILens mx={mx} my={my} />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.4 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] tracking-[0.35em] text-muted-foreground md:flex"
      >
        SCROLL
        <span className="relative h-10 w-px overflow-hidden bg-foreground/10">
          <span className="scan-line absolute inset-x-0 h-3 bg-saffron" style={{ '--dur': '2s' } as React.CSSProperties} />
        </span>
      </motion.div>
    </section>
  )
}
