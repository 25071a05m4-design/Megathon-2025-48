'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { constellationLanguages } from '@/lib/yatra-data'
import { cn } from '@/lib/utils'
import { Eyebrow, RevealLines } from './primitives'

const rings = [
  { radius: 22, dur: 70, dir: 'cw' as const },
  { radius: 34, dur: 110, dir: 'ccw' as const },
  { radius: 46, dur: 150, dir: 'cw' as const },
]

const stars = Array.from({ length: 60 }).map((_, i) => ({
  x: (i * 47) % 100,
  y: (i * 71 + 13) % 100,
  r: i % 7 === 0 ? 0.35 : 0.15,
}))

export function LanguageConstellation() {
  const [activeName, setActiveName] = useState('Telugu')
  const active = constellationLanguages.find((l) => l.name === activeName) ?? constellationLanguages[1]

  return (
    <section id="languages" className="relative overflow-hidden px-5 py-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <Eyebrow>Language constellation</Eyebrow>
          <RevealLines
            className="mt-8 font-display text-[clamp(2.6rem,7vw,6rem)] leading-[0.9] font-extrabold tracking-tight"
            lines={['EVERY LANGUAGE.', 'ONE ORBIT.']}
            lineClassName={(i) => (i === 1 ? 'text-jade' : '')}
          />
        </div>

        <div className="paused-on-hover relative mx-auto mt-16 aspect-square w-full max-w-[760px]">
          <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden="true">
            {stars.map((s, i) => (
              <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="oklch(1 0 0 / 0.35)" />
            ))}
            {rings.map((r) => (
              <circle key={r.radius} cx="50" cy="50" r={r.radius} fill="none" stroke="oklch(1 0 0 / 0.07)" strokeWidth="0.15" />
            ))}
          </svg>

          {rings.map((ring, ringIndex) => {
            const langs = constellationLanguages.filter((l) => l.ring === ringIndex)
            const spin = ring.dir === 'cw' ? 'spin-cw' : 'spin-ccw'
            const counter = ring.dir === 'cw' ? 'spin-ccw' : 'spin-cw'
            return (
              <div key={ringIndex} className={cn('absolute inset-0', spin)} style={{ '--dur': `${ring.dur}s` } as React.CSSProperties}>
                <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden="true">
                  {langs.map((l, i) => {
                    const a = ((i / langs.length) * 360 + ringIndex * 40) * (Math.PI / 180)
                    const isActive = l.name === activeName
                    return (
                      <line
                        key={l.name}
                        x1="50"
                        y1="50"
                        x2={50 + Math.cos(a) * ring.radius}
                        y2={50 + Math.sin(a) * ring.radius}
                        stroke={isActive ? 'var(--jade)' : 'oklch(1 0 0 / 0.12)'}
                        strokeWidth={isActive ? 0.3 : 0.12}
                        strokeDasharray={isActive ? undefined : '0.8 0.8'}
                      />
                    )
                  })}
                </svg>
                {langs.map((l, i) => {
                  const a = ((i / langs.length) * 360 + ringIndex * 40) * (Math.PI / 180)
                  const isActive = l.name === activeName
                  return (
                    <div
                      key={l.name}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${50 + Math.cos(a) * ring.radius}%`, top: `${50 + Math.sin(a) * ring.radius}%` }}
                    >
                      <div className={counter} style={{ '--dur': `${ring.dur}s` } as React.CSSProperties}>
                        <button
                          type="button"
                          onMouseEnter={() => setActiveName(l.name)}
                          onFocus={() => setActiveName(l.name)}
                          onClick={() => setActiveName(l.name)}
                          className={cn(
                            'flex flex-col items-center gap-1 rounded-full px-2 py-1 transition-all duration-500',
                            isActive ? 'scale-125' : 'opacity-70 hover:opacity-100',
                          )}
                        >
                          <span
                            className={cn(
                              'size-2 rounded-full transition-all duration-500',
                              isActive ? 'bg-jade shadow-[0_0_20px_4px_var(--jade)]' : 'bg-foreground/60',
                            )}
                          />
                          <span className={cn('font-display text-sm font-bold whitespace-nowrap md:text-lg', isActive && 'text-jade')}>
                            {l.native}
                          </span>
                          <span className="hidden text-[8px] tracking-[0.25em] text-muted-foreground sm:block">{l.name.toUpperCase()}</span>
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}

          <div className="absolute top-1/2 left-1/2 flex size-[30%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-jade/30 bg-ink/90 text-center shadow-[0_0_100px_-20px_var(--jade)] backdrop-blur">
            <span className="text-[8px] tracking-[0.35em] text-muted-foreground md:text-[10px]">YATRA AI</span>
            <AnimatePresence mode="wait">
              <motion.div
                key={active.name}
                initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
                transition={{ duration: 0.4 }}
                className="mt-1 flex flex-col items-center md:mt-2"
              >
                <span className="text-[9px] tracking-[0.3em] text-jade md:text-xs">{active.name.toUpperCase()}</span>
                <span className="font-display text-lg leading-tight font-bold md:text-3xl">{active.greeting}</span>
                <span className="text-[10px] font-light text-muted-foreground italic md:text-sm">{`"${active.translit}"`}</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
