'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Eyebrow, HudCorners, RevealLines, StatusDot } from './primitives'

const GUIDE_SECONDS = 134

function format(s: number) {
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}

export function SmartTouristLens() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.25, 1])
  const [playing, setPlaying] = useState(false)
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    if (!playing) return
    const t = setInterval(() => setElapsed((e) => (e >= GUIDE_SECONDS ? 0 : e + 1)), 1000)
    return () => clearInterval(t)
  }, [playing])

  return (
    <section className="relative px-5 py-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Eyebrow>Smart tourist lens</Eyebrow>
            <RevealLines
              className="mt-8 font-display text-[clamp(2.6rem,7vw,6rem)] leading-[0.9] font-extrabold tracking-tight"
              lines={['YOUR PHONE', 'BECOMES YOUR GUIDE.']}
              lineClassName={(i) => (i === 1 ? 'text-saffron' : '')}
            />
          </div>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-16 aspect-[4/5] w-full overflow-hidden rounded-3xl border border-foreground/10 sm:aspect-[16/10]"
        >
          <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
            <Image src="/images/charminar.png" alt="Augmented reality view of Charminar with landmark detection" fill sizes="100vw" className="object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/50" />
          <div className="hud-lines absolute inset-0" />
          <div className="scan-line absolute inset-x-0 h-px bg-saffron/80 shadow-[0_0_20px_2px_var(--saffron)]" style={{ '--dur': '5s' } as React.CSSProperties} />

          <div className="absolute inset-x-5 top-5 flex items-center justify-between text-[10px] tracking-[0.25em] md:inset-x-8 md:top-8">
            <span className="flex items-center gap-2 text-jade">
              <StatusDot /> VISION · LIVE
            </span>
            <span className="hidden text-foreground/70 sm:block">17.3616° N · 78.4747° E</span>
            <span className="text-foreground/70">REC ●</span>
          </div>

          {/* Reticle */}
          <motion.div
            initial={{ opacity: 0, scale: 1.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, type: 'spring', stiffness: 120, damping: 14 }}
            className="absolute top-[22%] left-1/2 h-[44%] w-[46%] -translate-x-1/2 sm:w-[30%]"
          >
            <HudCorners color="border-saffron" />
            <span className="absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-saffron" />
            <span className="pulse-ring absolute top-1/2 left-1/2 -mt-6 -ml-6 size-12 rounded-full border border-saffron/60" />
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.4 }}
              className="absolute -top-14 left-0 whitespace-nowrap"
            >
              <span className="block text-[9px] tracking-[0.3em] text-saffron">LANDMARK DETECTED</span>
              <span className="font-display text-2xl font-extrabold tracking-wide md:text-3xl">CHARMINAR</span>
            </motion.div>
          </motion.div>

          {/* Location pins */}
          {[
            { top: '62%', left: '14%', label: 'LAAD BAZAAR · 220 M' },
            { top: '58%', left: '78%', label: 'MECCA MASJID · 140 M' },
          ].map((pin, i) => (
            <motion.div
              key={pin.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.8 + i * 0.2 }}
              className="absolute hidden items-center gap-2 md:flex"
              style={{ top: pin.top, left: pin.left }}
            >
              <span className="relative flex size-3">
                <span className="pulse-ring absolute inset-0 rounded-full bg-electric" />
                <span className="relative size-3 rounded-full border-2 border-ink bg-electric" />
              </span>
              <span className="rounded bg-ink/70 px-2 py-1 text-[9px] tracking-[0.2em] text-electric backdrop-blur">{pin.label}</span>
            </motion.div>
          ))}

          {/* HUD panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2, duration: 0.9 }}
            className="absolute inset-x-4 bottom-4 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/10 backdrop-blur-xl md:inset-x-auto md:right-8 md:bottom-8 md:w-[380px]"
          >
            <div className="bg-ink/70 p-4">
              <span className="text-[9px] tracking-[0.3em] text-muted-foreground">DISTANCE</span>
              <p className="font-display text-2xl font-bold">1.2 KM</p>
            </div>
            <div className="bg-ink/70 p-4">
              <span className="text-[9px] tracking-[0.3em] text-muted-foreground">LANGUAGE</span>
              <p className="font-display text-2xl font-bold">TELUGU</p>
            </div>
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              className="col-span-2 flex flex-col gap-2 bg-ink/70 p-4 text-left transition-colors hover:bg-ink/50"
              aria-pressed={playing}
            >
              <span className="flex w-full items-center justify-between text-[9px] tracking-[0.3em] text-muted-foreground">
                AUDIO GUIDE
                <span className="text-saffron">
                  {playing ? '❚❚' : '▶'} {format(playing || elapsed ? elapsed : GUIDE_SECONDS)}
                </span>
              </span>
              <span className="h-0.5 w-full overflow-hidden rounded-full bg-foreground/10">
                <span className="block h-full bg-saffron transition-[width] duration-1000 ease-linear" style={{ width: `${(elapsed / GUIDE_SECONDS) * 100}%` }} />
              </span>
            </button>
            {['TRANSLATE SIGN', 'EXPLORE HISTORY'].map((a) => (
              <a key={a} href="#assistant" className="group flex items-center justify-between bg-ink/70 p-4 text-[10px] tracking-[0.2em] transition-colors hover:bg-saffron hover:text-ink">
                {a} <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
