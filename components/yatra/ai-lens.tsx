'use client'

import { motion, type MotionValue, useTransform } from 'framer-motion'
import Image from 'next/image'

const orbitLabels = [
  { label: 'OCR', angle: -90, color: 'var(--saffron)' },
  { label: 'ASR', angle: -18, color: 'var(--electric)' },
  { label: 'MT', angle: 54, color: 'var(--jade)' },
  { label: 'TTS', angle: 126, color: 'var(--saffron)' },
  { label: 'VISION', angle: 198, color: 'var(--electric)' },
]

const particles = Array.from({ length: 18 }).map((_, i) => ({
  top: `${(i * 53) % 100}%`,
  left: `${(i * 31 + 7) % 100}%`,
  size: 1 + (i % 3),
  dur: `${5 + (i % 6)}s`,
  delay: `${(i % 5) * 0.7}s`,
}))

export function AILens({ mx, my }: { mx: MotionValue<number>; my: MotionValue<number> }) {
  const rotateX = useTransform(my, [-0.5, 0.5], [10, -10])
  const rotateY = useTransform(mx, [-0.5, 0.5], [-12, 12])
  const innerX = useTransform(mx, [-0.5, 0.5], [14, -14])
  const innerY = useTransform(my, [-0.5, 0.5], [14, -14])

  return (
    <div className="relative aspect-square w-full max-w-[560px]" style={{ perspective: 1200 }}>
      {particles.map((p, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="drift absolute rounded-full bg-foreground/60"
          style={
            {
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              '--dur': p.dur,
              '--delay': p.delay,
            } as React.CSSProperties
          }
        />
      ))}

      <motion.div
        className="absolute inset-0"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-[8%] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, oklch(0.76 0.165 58 / 0.35), oklch(0.83 0.13 210 / 0.12) 55%, transparent 70%)' }}
        />

        <svg viewBox="0 0 200 200" className="spin-cw absolute inset-0 size-full" style={{ '--dur': '60s' } as React.CSSProperties} aria-hidden="true">
          <circle cx="100" cy="100" r="98" fill="none" stroke="oklch(1 0 0 / 0.12)" strokeWidth="0.3" strokeDasharray="1 3" />
          {Array.from({ length: 72 }).map((_, i) => (
            <line
              key={i}
              x1="100"
              y1="4"
              x2="100"
              y2={i % 6 === 0 ? 9 : 6}
              stroke={i % 6 === 0 ? 'var(--saffron)' : 'oklch(1 0 0 / 0.3)'}
              strokeWidth="0.35"
              transform={`rotate(${i * 5} 100 100)`}
            />
          ))}
        </svg>

        <svg viewBox="0 0 200 200" className="spin-ccw absolute inset-[9%] size-[82%]" style={{ '--dur': '35s' } as React.CSSProperties} aria-hidden="true">
          <circle cx="100" cy="100" r="98" fill="none" stroke="var(--electric)" strokeOpacity="0.5" strokeWidth="0.5" strokeDasharray="40 12 4 12" />
        </svg>

        <div className="absolute inset-[20%] overflow-hidden rounded-full border border-foreground/20 shadow-[0_0_80px_-10px_var(--saffron)]">
          <motion.div className="absolute -inset-[10%]" style={{ x: innerX, y: innerY }}>
            <Image src="/images/charminar.png" alt="Charminar seen through the YATRA AI lens" fill priority sizes="400px" className="object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_35%,oklch(0.1_0.004_60/0.85)_100%)]" />
          <div className="hud-lines absolute inset-0" />
          <div className="scan-line absolute inset-x-0 h-px bg-electric shadow-[0_0_16px_2px_var(--electric)]" />

          <div className="absolute top-[38%] left-[34%] h-[30%] w-[32%] border border-saffron/90">
            <span className="absolute -top-5 left-0 bg-saffron px-1.5 py-0.5 text-[8px] font-semibold tracking-widest text-ink">
              LANDMARK · 97%
            </span>
          </div>
          <div className="absolute bottom-[18%] left-1/2 -translate-x-1/2 rounded-full border border-electric/50 bg-ink/60 px-3 py-1 text-[9px] tracking-[0.25em] text-electric backdrop-blur">
            చార్మినార్ → CHARMINAR
          </div>
        </div>

        <div className="pointer-events-none absolute inset-[20%] rounded-full ring-1 ring-foreground/5 ring-offset-8 ring-offset-transparent" />

        <div className="spin-cw absolute inset-0" style={{ '--dur': '48s' } as React.CSSProperties}>
          <svg viewBox="0 0 200 200" className="absolute inset-0 size-full" aria-hidden="true">
            {orbitLabels.map((o) => {
              const rad = (o.angle * Math.PI) / 180
              return (
                <line
                  key={o.label}
                  x1={100 + Math.cos(rad) * 30}
                  y1={100 + Math.sin(rad) * 30}
                  x2={100 + Math.cos(rad) * 84}
                  y2={100 + Math.sin(rad) * 84}
                  stroke={o.color}
                  strokeOpacity="0.45"
                  strokeWidth="0.3"
                  strokeDasharray="1.5 1.5"
                />
              )
            })}
          </svg>
          {orbitLabels.map((o) => {
            const rad = (o.angle * Math.PI) / 180
            return (
              <div
                key={o.label}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${50 + Math.cos(rad) * 44}%`, top: `${50 + Math.sin(rad) * 44}%` }}
              >
                <div className="spin-ccw" style={{ '--dur': '48s' } as React.CSSProperties}>
                  <span
                    className="flex items-center gap-1.5 rounded-full border bg-ink/70 px-3 py-1.5 text-[10px] font-semibold tracking-[0.25em] backdrop-blur-md"
                    style={{ borderColor: o.color, color: o.color, boxShadow: `0 0 24px -6px ${o.color}` }}
                  >
                    <span className="size-1.5 rounded-full" style={{ backgroundColor: o.color }} />
                    {o.label}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
