'use client'

import { AnimatePresence, motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Eyebrow, HudCorners, RevealLines, StatusDot, Waveform, speak } from './primitives'

const steps = ['SCANNING FRAME', 'TEXT REGION 01', 'TEXT REGION 02', 'TRANSLATING', 'READY']

export function OCRDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })
  const [phase, setPhase] = useState(0)
  const [run, setRun] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!inView) return
    setPhase(0)
    const timers = [1400, 2200, 3000, 3900].map((t, i) => setTimeout(() => setPhase(i + 1), t))
    return () => timers.forEach(clearTimeout)
  }, [inView, run])

  useEffect(() => {
    if (!playing) return
    const t = setTimeout(() => setPlaying(false), 2600)
    return () => clearTimeout(t)
  }, [playing])

  function play() {
    setPlaying(true)
    speak('Charminar, Hyderabad')
  }

  return (
    <section id="lens" className="relative overflow-hidden px-5 py-32 md:px-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(50% 40% at 50% 50%, oklch(0.83 0.13 210 / 0.08), transparent 70%)' }}
      />
      <div ref={ref} className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1fr_auto_1fr]">
        <div>
          <Eyebrow>AI Lens · Live demo</Eyebrow>
          <RevealLines
            className="mt-8 font-display text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.9] font-extrabold tracking-tight"
            lines={['POINT.', 'SPEAK.', 'UNDERSTAND.']}
            lineClassName={(i) => (i === 2 ? 'text-electric' : '')}
          />
          <ul className="mt-10 flex flex-col gap-3 text-[11px] tracking-[0.25em]">
            {steps.map((s, i) => (
              <li
                key={s}
                className={`flex items-center gap-3 transition-colors duration-500 ${phase >= i ? 'text-foreground' : 'text-foreground/25'}`}
              >
                <span className={`h-px transition-all duration-500 ${phase >= i ? 'w-8 bg-saffron' : 'w-4 bg-foreground/20'}`} />
                {s}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setRun((r) => r + 1)}
            className="mt-10 rounded-full border border-foreground/20 px-5 py-2.5 text-[11px] tracking-[0.25em] transition-colors hover:border-electric hover:text-electric"
          >
            ↻ RESCAN
          </button>
        </div>

        {/* Phone */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-[300px] rounded-[3rem] border border-foreground/15 bg-ink p-3 shadow-[0_40px_120px_-30px_oklch(0.83_0.13_210/0.35)] sm:w-[340px]"
        >
          <div className="relative aspect-[9/19] overflow-hidden rounded-[2.4rem]">
            <Image src="/images/charminar.png" alt="Phone camera pointed at Charminar in Hyderabad" fill sizes="340px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink/80" />
            <div className="hud-lines absolute inset-0" />
            {phase < 4 && <div className="scan-line absolute inset-x-0 h-0.5 bg-electric shadow-[0_0_24px_4px_var(--electric)]" />}

            <div className="absolute inset-x-4 top-5 flex items-center justify-between text-[9px] tracking-[0.2em]">
              <span className="flex items-center gap-2 text-jade">
                <StatusDot /> OCR ACTIVE
              </span>
              <span className="text-foreground/70">LENS · 1×</span>
            </div>

            <div className="absolute inset-x-4 top-12 flex gap-2">
              <AnimatePresence>
                {phase >= 1 && (
                  <motion.span
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded border border-saffron/50 bg-ink/70 px-2 py-1 text-[8px] tracking-[0.2em] text-saffron backdrop-blur"
                  >
                    LANGUAGE DETECTED · TELUGU
                  </motion.span>
                )}
                {phase >= 2 && (
                  <motion.span
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded border border-electric/50 bg-ink/70 px-2 py-1 text-[8px] tracking-[0.2em] text-electric backdrop-blur"
                  >
                    94% CONF
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {phase >= 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 1.2 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  className="absolute top-[52%] left-[14%] w-[72%] border border-saffron px-3 py-2"
                >
                  <HudCorners color="border-saffron" className="-inset-1" />
                  <span className="block text-center font-display text-2xl font-bold text-foreground drop-shadow">చార్మినార్</span>
                  <span className="absolute -top-4 left-0 text-[8px] tracking-widest text-saffron">TXT_01 · 0.94</span>
                </motion.div>
              )}
              {phase >= 2 && (
                <motion.div
                  initial={{ opacity: 0, scale: 1.2 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  className="absolute top-[66%] left-[24%] w-[52%] border border-electric px-2 py-1.5"
                >
                  <span className="block text-center text-base font-medium text-foreground">హైదరాబాద్</span>
                  <span className="absolute -top-4 left-0 text-[8px] tracking-widest text-electric">TXT_02 · 0.91</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute inset-x-0 bottom-6 flex justify-center">
              <span className="flex size-14 items-center justify-center rounded-full border-2 border-foreground/80">
                <span className={`size-10 rounded-full transition-colors ${phase >= 4 ? 'bg-jade' : 'bg-foreground/90'}`} />
              </span>
            </div>
          </div>
        </motion.div>

        {/* Translation panel */}
        <div className="min-h-[340px]">
          <AnimatePresence>
            {phase >= 3 && (
              <motion.div
                initial={{ opacity: 0, x: 40, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-8 backdrop-blur-xl"
              >
                <span className="text-[10px] tracking-[0.3em] text-saffron">TELUGU</span>
                <p className="mt-2 font-display text-4xl font-bold">చార్మినార్</p>
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="my-6 flex origin-top items-center gap-3 text-electric"
                >
                  <span className="h-10 w-px bg-gradient-to-b from-saffron to-electric" />
                  <span className="text-[10px] tracking-[0.3em] text-muted-foreground">MT · 128 ms</span>
                </motion.div>
                <span className="text-[10px] tracking-[0.3em] text-electric">ENGLISH</span>
                <motion.p
                  initial={{ opacity: 0, letterSpacing: '0.5em' }}
                  animate={{ opacity: 1, letterSpacing: '0.05em' }}
                  transition={{ delay: 0.6, duration: 1 }}
                  className="mt-2 font-display text-4xl font-extrabold"
                >
                  CHARMINAR
                </motion.p>
                <p className="mt-2 text-sm font-light text-muted-foreground">{'"Four minarets" — Hyderabad, 1591'}</p>

                <button
                  type="button"
                  onClick={play}
                  disabled={phase < 4}
                  className="group mt-8 flex w-full items-center justify-between gap-4 rounded-full border border-electric/40 px-5 py-3 text-[11px] tracking-[0.25em] text-electric transition-colors hover:bg-electric/10 disabled:opacity-40"
                >
                  <span className="flex items-center gap-2">
                    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M11 5 6 9H2v6h4l5 4V5Z" />
                      <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" />
                    </svg>
                    {playing ? 'PLAYING…' : 'PLAY TRANSLATION'}
                  </span>
                  <Waveform active={playing} bars={18} className="h-6" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
