'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Eyebrow, RevealLines, Waveform, speak } from './primitives'

type Stage = 'idle' | 'listening' | 'asr' | 'mt' | 'ai' | 'tts'

const pipeline: { id: Stage; label: string }[] = [
  { id: 'listening', label: 'MIC' },
  { id: 'asr', label: 'ASR' },
  { id: 'mt', label: 'MT' },
  { id: 'ai', label: 'AI' },
  { id: 'tts', label: 'TTS' },
]

const order: Stage[] = ['idle', 'listening', 'asr', 'mt', 'ai', 'tts']
const durations: Partial<Record<Stage, number>> = { listening: 2000, asr: 1600, mt: 1600, ai: 2200 }

const RESPONSE =
  'Walk to Laad Bazaar for lacquer bangles, visit Mecca Masjid next door, and end at Nimrah Café for Irani chai and Osmania biscuits.'

const bars = Array.from({ length: 64 })

export function VoiceDemo() {
  const [stage, setStage] = useState<Stage>('idle')
  const idx = order.indexOf(stage)

  useEffect(() => {
    const d = durations[stage]
    if (!d) return
    const t = setTimeout(() => setStage(order[order.indexOf(stage) + 1]), d)
    return () => clearTimeout(t)
  }, [stage])

  useEffect(() => {
    if (stage === 'tts') speak(RESPONSE)
  }, [stage])

  const listening = stage === 'listening'
  const statusText =
    stage === 'idle' ? 'TAP TO SPEAK' : stage === 'listening' ? 'LISTENING…' : stage === 'tts' ? 'SPEAKING · TAP TO RESET' : 'PROCESSING…'

  return (
    <section className="relative overflow-hidden px-5 py-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <Eyebrow>Voice</Eyebrow>
          <RevealLines
            className="mt-8 font-display text-[clamp(4rem,14vw,12rem)] leading-[0.85] font-extrabold tracking-tight"
            lines={['JUST ASK.']}
          />
        </div>

        <div className="mt-16 grid items-center gap-16 lg:grid-cols-[1fr_auto_1fr]">
          <div className="order-2 flex min-h-[200px] flex-col gap-6 lg:order-1">
            <AnimatePresence>
              {idx >= 2 && (
                <motion.div key="user" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
                  <span className="text-[10px] tracking-[0.3em] text-muted-foreground">YOU · SPEECH DETECTED</span>
                  <p className="mt-2 font-display text-2xl leading-snug font-semibold md:text-3xl">
                    {'"Charminar ke paas kya explore kar sakta hoon?"'}
                  </p>
                  <span className="mt-3 inline-flex rounded-full border border-saffron/40 px-3 py-1 text-[10px] tracking-[0.25em] text-saffron">
                    HINDI · 96%
                  </span>
                </motion.div>
              )}
              {idx >= 3 && (
                <motion.div
                  key="mt"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                  className="border-l border-electric/50 pl-5"
                >
                  <span className="text-[10px] tracking-[0.3em] text-electric">TRANSLATED QUERY</span>
                  <p className="mt-2 text-xl font-light">{'"What can I explore near Charminar?"'}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="order-1 flex flex-col items-center gap-8 lg:order-2">
            <div className="relative flex size-[300px] items-center justify-center sm:size-[360px]">
              {bars.map((_, i) => {
                const h = 14 + ((i * 29) % 13) * 3
                return (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2"
                    style={{ transform: `rotate(${(i / bars.length) * 360}deg) translateY(-140px)` }}
                    aria-hidden="true"
                  >
                    <motion.span
                      className={cn('block w-[2px] origin-bottom -translate-x-1/2 rounded-full', listening || stage === 'tts' ? 'bg-electric' : 'bg-foreground/20')}
                      style={{ height: h }}
                      animate={listening || stage === 'tts' ? { scaleY: [0.3, 1.4, 0.5, 1, 0.3] } : { scaleY: 0.4 }}
                      transition={listening || stage === 'tts' ? { duration: 1 + (i % 4) * 0.2, repeat: Infinity, delay: (i % 8) * 0.06 } : { duration: 0.5 }}
                    />
                  </div>
                )
              })}

              {listening && (
                <>
                  <span className="pulse-ring absolute size-40 rounded-full border border-electric/50" aria-hidden="true" />
                  <span className="pulse-ring absolute size-40 rounded-full border border-electric/50 [animation-delay:1.2s]" aria-hidden="true" />
                </>
              )}

              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStage(stage === 'idle' || stage === 'tts' ? (stage === 'tts' ? 'idle' : 'listening') : stage)}
                aria-label={statusText}
                className={cn(
                  'relative flex size-36 items-center justify-center rounded-full border transition-all duration-700',
                  listening
                    ? 'border-electric bg-electric/15 shadow-[0_0_80px_-10px_var(--electric)]'
                    : 'border-saffron/60 bg-saffron/10 shadow-[0_0_60px_-20px_var(--saffron)]',
                )}
              >
                <svg viewBox="0 0 24 24" className={cn('size-12', listening ? 'text-electric' : 'text-saffron')} fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                  <rect x="9" y="2" width="6" height="12" rx="3" />
                  <path d="M5 11a7 7 0 0 0 14 0M12 18v4M8 22h8" />
                </svg>
              </motion.button>
            </div>

            <span className="text-[11px] tracking-[0.35em] text-muted-foreground" aria-live="polite">
              {statusText}
            </span>

            <ol className="flex items-center gap-2 text-[10px] tracking-[0.2em]">
              {pipeline.map((p, i) => {
                const pIdx = order.indexOf(p.id)
                const state = idx > pIdx ? 'done' : idx === pIdx ? 'active' : 'todo'
                return (
                  <li key={p.id} className="flex items-center gap-2">
                    <span
                      className={cn(
                        'rounded-full border px-2.5 py-1 transition-all duration-500',
                        state === 'active' && 'border-electric bg-electric/15 text-electric',
                        state === 'done' && 'border-saffron/50 text-saffron',
                        state === 'todo' && 'border-foreground/10 text-foreground/30',
                      )}
                    >
                      {p.label}
                    </span>
                    {i < pipeline.length - 1 && <span className={cn('h-px w-3 transition-colors', idx > pIdx ? 'bg-saffron' : 'bg-foreground/10')} />}
                  </li>
                )
              })}
            </ol>
          </div>

          <div className="order-3 min-h-[200px]">
            <AnimatePresence mode="wait">
              {stage === 'ai' && (
                <motion.div key="thinking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-3">
                  <span className="text-[10px] tracking-[0.3em] text-jade">YATRA AI · THINKING</span>
                  <span className="flex gap-1">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="size-1.5 rounded-full bg-jade"
                        animate={{ opacity: [0.2, 1, 0.2], y: [0, -4, 0] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }}
                      />
                    ))}
                  </span>
                </motion.div>
              )}
              {stage === 'tts' && (
                <motion.div key="response" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                  <span className="text-[10px] tracking-[0.3em] text-jade">YATRA AI · RESPONSE</span>
                  <p className="mt-3 text-lg leading-relaxed font-light text-foreground/90">{RESPONSE}</p>
                  <div className="mt-6 flex items-center gap-4">
                    <span className="text-[10px] tracking-[0.3em] text-saffron">TTS · HINDI VOICE</span>
                    <Waveform active bars={24} className="h-6" color="var(--saffron)" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
